"use client";

import { BookingType } from "@/@types/api.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getBookingsQueryFn, getMyShopQueryFn } from "@/lib/fetcher";
import { formatCurrency } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const MyShopBookingsPage = () => {
  const { data: shopData, isPending: isShopPending } = useQuery({
    queryKey: ["my-shop"],
    queryFn: getMyShopQueryFn,
  });

  const { data: bookingsData, isPending: isBookingsPending } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingsQueryFn,
  });

  const myShopId = shopData?.shop?.$id;
  const myUserId = shopData?.user?.userid;
  const myListingIds = new Set(
    ((shopData?.listings || []) as any[])
      .map((listing) => listing?.$id)
      .filter(Boolean),
  );
  const allBookings = (bookingsData?.bookings || []) as BookingType[];

  const myListingBookings = allBookings.filter((booking) => {
    const bookingListingId = booking?.listingId || booking?.carId;
    const listingShopId =
      (booking?.listing as any)?.shopId || (booking?.listing as any)?.shop;
    const listingOwnerId = (booking?.listing as any)?.userid;

    const isByListingId =
      !!bookingListingId && myListingIds.has(bookingListingId);
    const isByShopId = !!myShopId && booking?.userId === myShopId;
    const isByListingShop = !!myShopId && listingShopId === myShopId;
    const isByUserId = !!myUserId && booking?.userId === myUserId;
    const isByListingOwner = !!myUserId && listingOwnerId === myUserId;

    return (
      isByListingId ||
      isByShopId ||
      isByListingShop ||
      isByUserId ||
      isByListingOwner
    );
  });

  const displayBookings =
    myListingBookings.length > 0 ? myListingBookings : allBookings;

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Booking Requests</h1>
          <Link href="/my-shop" className="text-sm text-primary underline">
            Back to My Shop
          </Link>
        </div>

        {isShopPending || isBookingsPending ? (
          <div className="space-y-3">
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
            <Skeleton className="h-[120px] w-full" />
          </div>
        ) : displayBookings.length === 0 ? (
          <Card className="shadow-custom rounded-[8px]">
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">
                No booking requests yet for your cars.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {displayBookings.map((booking) => (
              <Card
                key={booking.$id}
                className="shadow-custom rounded-[8px] border-none"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold">
                      {booking?.listing?.displayTitle ||
                        `Booked Car (${booking.carId})`}
                    </h3>
                    <Badge className="capitalize">{booking.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-gray-500">Customer:</span>{" "}
                      {booking.userName}
                    </p>
                    <p>
                      <span className="text-gray-500">Email:</span>{" "}
                      {booking.userEmail}
                    </p>
                    <p>
                      <span className="text-gray-500">Phone:</span>{" "}
                      {booking.userPhone}
                    </p>
                    <p>
                      <span className="text-gray-500">Date & Time:</span>{" "}
                      {booking.bookingDate} at {booking.bookingTime}
                    </p>
                    <p>
                      <span className="text-gray-500">Price:</span>{" "}
                      {booking?.listing?.price
                        ? formatCurrency(booking.listing.price)
                        : "N/A"}
                    </p>
                  </div>

                  {booking.message ? (
                    <p className="text-sm">
                      <span className="text-gray-500">Message:</span>{" "}
                      {booking.message}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyShopBookingsPage;
