import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { put, del } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const semester = formData.get("semester") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;

    if (!file || !category) {
      return NextResponse.json({ error: "File and category are required" }, { status: 400 });
    }

    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, { access: 'public' });
    const fileUrl = blob.url;

    // Make sure the admin user exists in DB, or use a dummy ID if we don't have one
    // For this prototype, we'll just find the first user or create a dummy one
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "admin@sfi.com",
          passwordHash: "dummy",
          role: "ADMIN"
        }
      });
    }

    // Save metadata to database
    const savedFile = await prisma.file.create({
      data: {
        filename: file.name,
        url: fileUrl,
        mimeType: file.type || "application/octet-stream",
        category: category,
        semester: semester || null,
        subject: subject || null,
        description: description || null,
        uploadedById: user.id
      }
    });

    return NextResponse.json({ success: true, file: savedFile });
  } catch (error: any) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Upload failed: ${errorMessage}` }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const files = await prisma.file.findMany({
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing file ID" }, { status: 400 });
    }

    const file = await prisma.file.findUnique({ where: { id } });
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.url) {
      await del(file.url);
    }

    await prisma.file.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
