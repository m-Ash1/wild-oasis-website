"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, updateBooking, updateGuest } from "./data-service";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  const regex = /^$|^[0-9]{6,12}$/;
  if (!session) throw new Error("User not authenticated");

  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const nationalID = formData.get("nationalID");

  if (!regex.test(nationalID)) throw new Error("Invalid national ID");
  const updatedData = nationalID
    ? { nationality, countryFlag, nationalID }
    : { nationality, countryFlag };
  await updateGuest(session.user.guestId, updatedData);

  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedBooking = {
    numGuests: Number(numGuests),
    observations,
  };
  await updateBooking(bookingId, updatedBooking);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
