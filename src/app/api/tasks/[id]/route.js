import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// PUT update a task
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
    const { title, description, status, projectId } = await request.json();

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

    // If projectId is provided, verify it belongs to the user
    if (projectId !== undefined && projectId !== null) {
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          userId: decoded.userId
        }
      });

      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
    }

    // Update task
    const task = await prisma.task.update({
      where: { id },
      data: {
        title: title?.trim() || existingTask.title,
        description: description?.trim() || null,
        status: status || existingTask.status,
        projectId: projectId !== undefined ? projectId : existingTask.projectId
      },
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
    console.error('Update task error:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE a task
export async function DELETE(request, { params }) {
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

    // Check if task exists and belongs to user
    const task = await prisma.task.findFirst({
      where: { 
        id,
        userId: decoded.userId 
      }
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Delete task
    await prisma.task.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}