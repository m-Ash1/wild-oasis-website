"use client";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { createBookingAction } from "../_lib/actions";
import LoginMessage from "./LoginMessage";
import { useReservation } from "./ReservationContext";
import { SubmitButton } from "./SubmitButton";

function ReservationForm({ cabin, session, settings, bookedDates }) {
  const { user } = session ? session : { user: {} };
  const { maxCapacity, regularPrice, discount } = cabin;
  const { range, resetRange } = useReservation();
  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = (regularPrice - discount) * numNights;

  const newBookingData = {
    startDate,
    endDate,
    numNights,
    // totalPrice: cabinPrice,
    cabinPrice,
    cabinId: cabin.id,
  };

  /**
   * Binds the createBookingAction function to the newBookingData object.
   * This creates a new function, createBooking, which when called, will
   * invoke createBookingAction with newBookingData as its first argument.
   */
  const createBooking = createBookingAction.bind(null, newBookingData);

  return session ? (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full"
            src={user.image}
            alt={user.name}
            width={30}
            height={30}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBooking(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          {startDate && endDate ? (
            <SubmitButton pendingLabel={"Reserving..."}>
              Reserve now
            </SubmitButton>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  ) : (
    <LoginMessage />
  );
}

export default ReservationForm;
