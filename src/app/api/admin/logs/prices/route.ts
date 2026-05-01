import { NextResponse } from "next/server";
import { getPriceChangeLog } from "@/lib/site-content";
import { getServerSession } from "@/lib/supabase/server";

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await getPriceChangeLog();
  return NextResponse.json(items);
}
