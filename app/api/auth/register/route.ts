import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { ApiResponse, User } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role, phone } = body;

    // Validation
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Missing required fields: email, password, firstName, lastName, role',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['admin', 'teacher', 'staff', 'student', 'parent'];
    if (!validRoles.includes(role)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid role. Must be one of: admin, teacher, staff, student, parent',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email format',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'User with this email already exists',
          statusCode: 409,
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();
    const now = new Date();

    // Create user
    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, role, phone, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, email, first_name, last_name, role, phone, is_active, created_at, updated_at`,
      [userId, email.toLowerCase(), hashedPassword, firstName, lastName, role, phone || null, true, now, now]
    );

    const user = result.rows[0];

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        message: 'User registered successfully',
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          role: user.role,
          isActive: user.is_active,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        },
        statusCode: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'Internal server error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}