import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug, content } = await req.json();

    if (!slug || content === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const savedContent = await prisma.pageContent.upsert({
      where: { page: slug },
      update: { body: content },
      create: { page: slug, title: slug, body: content },
    });

    return NextResponse.json({ success: true, savedContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
