import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import prisma from '@/utils/prisma';

// PUT update user profile
export async function PUT(request) {
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

    const { name } = await request.json();

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name: name.trim() },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}