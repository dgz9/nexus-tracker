import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// PUT update task status
export async function PUT(request, { params }) {
  try {
    // Get token from header
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { status } = await request.json();

    // Validate status
    if (!status || !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { 
        id,
        userId: decoded.userId 
      }
    });

    if (!existingTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update task status
    const task = await prisma.task.update({
      where: { id },
      data: { status },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('Update task status error:', error);
    return NextResponse.json(
      { error: 'Failed to update task status' },
      { status: 500 }
    );
  }
}