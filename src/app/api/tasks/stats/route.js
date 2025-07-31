import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// GET task statistics
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

    // Get task counts by status
    const [
      total,
      pending,
      inProgress,
      completed,
      projectCount
    ] = await Promise.all([
      prisma.task.count({ where }),
      prisma.task.count({ where: { ...where, status: 'PENDING' } }),
      prisma.task.count({ where: { ...where, status: 'IN_PROGRESS' } }),
      prisma.task.count({ where: { ...where, status: 'COMPLETED' } }),
      prisma.project.count({ where: { userId: decoded.userId } })
    ]);

    return NextResponse.json({
      total,
      byStatus: {
        pending,
        in_progress: inProgress,
        completed
      },
      projectCount
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task statistics' },
      { status: 500 }
    );
  }
}