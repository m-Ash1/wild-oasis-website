"use client";
import { useOptimistic } from "react";
import { deleteReservationAction } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      // for adding a new booking
      // return [...curBookings, booking];
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function deleteBooking(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={deleteBooking}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
