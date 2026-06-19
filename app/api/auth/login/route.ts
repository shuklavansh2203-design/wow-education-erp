import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { comparePassword } from '@/lib/auth';
import { ApiResponse, JWTPayload } from '@/lib/types';
import jwt from 'jsonwebtoken';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone?: string;
  };
}

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Email and password are required',
          statusCode: 400,
        },
        { status: 400 }
      );
    }

    // Get user from database
    const result = await pool.query(
      'SELECT id, email, password_hash, first_name, last_name, role, phone, is_active FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email or password',
          statusCode: 401,
        },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'User account is inactive. Please contact administrator.',
          statusCode: 403,
        },
        { status: 403 }
      );
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid email or password',
          statusCode: 401,
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const jwtPayload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || 'default-secret', {
      expiresIn: '24h',
    });

    // Log successful login
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, entity_type, entity_id, timestamp) VALUES ($1, $2, $3, $4, NOW())',
      [user.id, 'LOGIN', 'user', user.id]
    );

    return NextResponse.json<ApiResponse<LoginResponse>>(
      {
        success: true,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            phone: user.phone,
          },
        },
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
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