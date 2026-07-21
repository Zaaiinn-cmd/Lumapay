import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "QuickNode webhook received",
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "QuickNode webhook endpoint is live",
  });
}