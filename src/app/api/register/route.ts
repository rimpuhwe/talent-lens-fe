import { NextResponse } from "next/server";
import { candidateRegisterSchema } from "@/lib/validations/auth.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData =
      candidateRegisterSchema.parse(body);

    const payload = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: validatedData.password,
      birthDate: new Date(
        validatedData.birthDate
      ).toISOString(),
      gender: validatedData.gender,
    };

    const response = await fetch(
      "https://talent-lens-be-production.up.railway.app/api/auth/register/candidate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data.Message || data.message || "Registration failed",
          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.errors) {
      return NextResponse.json(
        {
          message: error.errors[0].message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}