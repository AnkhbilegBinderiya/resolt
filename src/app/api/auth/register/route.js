import { NextResponse } from "next/server";
import Cookies from 'js-cookie';

export async function POST(request) {
    try {
      const { email, password, username} = await request.json();
  
      // Validate email and password
      if (!email || !password || !username) {
        return NextResponse.json({ error: 'Something is worng' }, { status: 400 });
      }

      const payload = {
        email,
        password,
        username,
      };

      // Authenticate user
      const response = await fetch("http://localhost:6969/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }
      
      return NextResponse.json(data,  { status: 200 });
    } catch (error) {
      console.error('Error during authentication:', error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }

// Implement other HTTP methods as needed
export async function GET(request) {}
export async function HEAD(request) {}
export async function PUT(request) {}
export async function DELETE(request) {}
export async function PATCH(request) {}
export async function OPTIONS(request) {}
