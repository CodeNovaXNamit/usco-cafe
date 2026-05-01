import { NextResponse } from "next/server";
import { getMenuItems } from "@/lib/site-content";

export async function GET() {
  const items = await getMenuItems();
  return NextResponse.json(items);
}
