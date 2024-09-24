import { NextResponse } from "next/server";
import Cookies from 'js-cookie';

export async function POST(request) {
    try {
      const { email, password } = await request.json();
  
      // Validate email and password
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      console.log("email: " + email)
      console.log("password: " + password)

      const payload = {
        email,
        password,
      };

      // Authenticate user
      const response = await fetch("http://localhost:6969/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
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
