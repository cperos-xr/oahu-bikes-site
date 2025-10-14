import { NextResponse } from "next/server";
import { getBikeById } from "@/lib/bikes";

export async function GET(_, { params }) {
  const { id } = params;
  const bike = getBikeById(id);
  if (!bike) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: bike.id,
    status: bike.status,
    hotelSlug: bike.hotelSlug,
    model: bike.model,
    locationName: bike.locationName,
  });
}
