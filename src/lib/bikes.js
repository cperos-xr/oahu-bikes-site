// Simple in-memory mock of bikes inventory.
// In production, replace with a DB or API call.

const BIKES = [
  { id: "1", status: "available", hotelSlug: "surfjack", model: "RadExpand 5", locationName: "Surfjack Lobby Rack" },
  { id: "2", status: "rented", hotelSlug: "surfjack", model: "RadExpand 5", locationName: "Surfjack Lobby Rack" },
  { id: "3", status: "available", hotelSlug: "whitesands", model: "RadExpand 5", locationName: "White Sands Front Desk" },
  { id: "4", status: "rented", hotelSlug: "whitesands", model: "RadExpand 5", locationName: "White Sands Front Desk" },
  { id: "5", status: "available", hotelSlug: "monarch", model: "RadExpand 5", locationName: "Monarch Valet Area" },
  { id: "6", status: "rented", hotelSlug: "monarch", model: "RadExpand 5", locationName: "Monarch Valet Area" },
];

export function getBikeById(id) {
  return BIKES.find((b) => b.id === String(id));
}

export function isBikeAvailable(id) {
  const b = getBikeById(id);
  return !!b && b.status === "available";
}

export function listBikes() {
  return BIKES.slice();
}
