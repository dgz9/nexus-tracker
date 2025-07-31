import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// GET all tasks for a user
export async function GET(request) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    // Build where clause
    const where = { userId: decoded.userId };
    if (projectId) {
      where.projectId = projectId;
    }

    // Get tasks
    const tasks = await prisma.task.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            color: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST create a new task
export async function POST(request) {
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

    const { title, description, status, projectId } = await request.json();

    // Validation
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Task title is required' },
        { status: 400 }
      );
    }

    // If projectId is provided, verify it belongs to the user
    if (projectId) {
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

    // Create task
    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        status: status || 'PENDING',
        userId: decoded.userId,
        projectId: projectId || null
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

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Create task error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}