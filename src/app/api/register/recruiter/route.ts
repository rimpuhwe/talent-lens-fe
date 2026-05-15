import { NextResponse } from "next/server";
import { recruiterRegisterSchema } from "@/lib/validations/auth.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = recruiterRegisterSchema.parse(body);

    const payload = {
      companyName: validatedData.companyName,
      emailAddress: validatedData.emailAddress,
      contactNumber: validatedData.contactNumber,
      password: validatedData.password,
      location: validatedData.location,
      companySummary: validatedData.companySummary,
    };

    const response = await fetch(
      "https://talent-lens-be-production.up.railway.app/api/auth/register/recruiter",
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
          message: data.Message || data.message || "Recruiter registration failed",
          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    if (error.errors?.length) {
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
