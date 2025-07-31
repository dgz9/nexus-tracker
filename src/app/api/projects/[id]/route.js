import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// PUT update a project
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
    const { name, description, color } = await request.json();

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: { 
        id,
        userId: decoded.userId 
      }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: name?.trim() || existingProject.name,
        description: description?.trim() || null,
        color: color || existingProject.color
      },
      include: {
        _count: {
          select: { tasks: true }
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE a project
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

    // Check if project exists and belongs to user
    const project = await prisma.project.findFirst({
      where: { 
        id,
        userId: decoded.userId 
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project (this will also delete associated tasks due to cascade)
    await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}