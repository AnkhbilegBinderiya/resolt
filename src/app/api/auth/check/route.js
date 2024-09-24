import { NextResponse } from "next/server";
import { parse } from 'cookie';

export async function POST(request) {
  try {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.token;

    console.log(token)

    if (!token) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 });
    }

    const response = await fetch('http://localhost:6969/api/auth/check', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch profile' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Implement other HTTP methods as needed
export async function GET(request) {}
export async function HEAD(request) {}
export async function PUT(request) {}
export async function DELETE(request) {}
export async function PATCH(request) {}
export async function OPTIONS(request) {}
