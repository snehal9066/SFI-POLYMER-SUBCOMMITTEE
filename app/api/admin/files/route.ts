import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(uploadDir, uniqueFilename);
    const fileUrl = `/uploads/${uniqueFilename}`;

    // Save to disk
    await writeFile(filepath, buffer);

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
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
