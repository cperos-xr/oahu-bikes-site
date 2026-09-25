"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelBooking } from "@/lib/booking/stripe-bookings";
import {
  endAdminSession,
  isAdmin,
  originFromHeaders,
  passwordMatches,
  startAdminSession,
} from "@/lib/booking/server-utils";

export async function loginAction(formData) {
  if (!passwordMatches(String(formData.get("password") || ""))) redirect("/admin?error=login");
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin");
}

export async function cancelAction(formData) {
  if (!(await isAdmin())) redirect("/admin");
  let booking = null;
  try {
    booking = await cancelBooking(String(formData.get("sessionId") || ""), { origin: await originFromHeaders() });
  } catch (err) {
    console.error("[admin cancel]", err);
  }
  revalidatePath("/admin");
  redirect(booking ? `/admin?done=${encodeURIComponent(booking.ref)}` : "/admin?error=cancel");
}
