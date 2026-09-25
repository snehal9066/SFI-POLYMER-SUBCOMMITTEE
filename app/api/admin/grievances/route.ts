import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const grievances = await prisma.grievance.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ grievances });
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return NextResponse.json({ error: 'Failed to fetch grievances' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    if (!data.id || !data.status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const grievance = await prisma.grievance.update({
      where: { id: data.id },
      data: { status: data.status }
    });

    return NextResponse.json({ success: true, grievance });
  } catch (error) {
    console.error('Error updating grievance:', error);
    return NextResponse.json({ error: 'Failed to update grievance' }, { status: 500 });
  }
}
