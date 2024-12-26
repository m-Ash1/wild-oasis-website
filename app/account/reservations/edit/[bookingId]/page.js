import UpdateBookingForm from "@/app/_components/UpdateBookingForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";


export const generateMetadata =  ({ params }) => {
  return {
    title: `Edit Reservation #${params.bookingId}`,
  };
};

export default async function Page({ params }) {
  
  const booking = await getBooking(params.bookingId);
  const cabin = await getCabin(booking.cabinId);

  const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{booking.id}
      </h2>

      <UpdateBookingForm booking={booking} maxCapacity={maxCapacity} />
    </div>
  );
}
