"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  createBooking,
  deleteBooking,
  updateBooking,
  updateGuest,
} from "./data-service";

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
  // artificial delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  const numGuests = formData.get("numGuests");
  const bookingId = formData.get("bookingId");
  const observations = formData.get("observations").slice(0, 500);
  const updatedBooking = {
    numGuests: Number(numGuests),
    observations,
  };
  await updateBooking(bookingId, updatedBooking);
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBookingAction(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  await createBooking(newBooking);
  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect("/cabins/thankyou");
}
