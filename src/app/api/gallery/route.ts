import { NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/site-content";

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json(items);
}
