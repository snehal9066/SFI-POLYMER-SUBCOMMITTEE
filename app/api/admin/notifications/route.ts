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

    const { title, content, type } = await req.json();

    if (!title || !content || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        content,
        type,
      },
    });

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}
