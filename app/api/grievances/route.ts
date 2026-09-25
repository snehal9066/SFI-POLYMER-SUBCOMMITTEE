import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.semester || !data.description) {
      return NextResponse.json(
        { error: 'Semester and description are required' },
        { status: 400 }
      );
    }

    const grievance = await prisma.grievance.create({
      data: {
        studentName: data.studentName || null,
        semester: data.semester,
        subject: data.subject || null,
        description: data.description,
      },
    });

    return NextResponse.json({ success: true, grievance }, { status: 201 });
  } catch (error) {
    console.error('Error creating grievance:', error);
    return NextResponse.json(
      { error: 'Failed to submit grievance' },
      { status: 500 }
    );
  }
}
