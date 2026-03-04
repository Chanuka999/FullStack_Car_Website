"use client";
import React, { use } from "react";
import { ListingType } from "@/@types/api.type";
import BookingForm from "@/components/BookingForm";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import { getSingleListingQueryFn } from "@/lib/fetcher";
import { slugToCarName } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";

const BookingPage = ({
  params,
}: {
  params: Promise<{
    slug: string;
    carId: string;
  }>;
}) => {
  const { slug, carId } = use(params);
  const carName = slugToCarName(slug);

  const { data, isPending, isError } = useQuery({
    queryKey: ["listing", carId],
    queryFn: () => getSingleListingQueryFn(carId),
  });

  const listing = data?.listing as ListingType;

  const breadcrumbItems = [
    { label: "Chanux", href: "/" },
    { label: "Cars", href: "/search" },
    { label: carName },
    { label: "Booking" },
  ];

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">Failed to load car details</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <NavBreadCrumb {...{ breadcrumbItems }} />

          {isPending ? (
            <div className="text-center py-8">
              <p>Loading car details...</p>
            </div>
          ) : (
            <BookingForm
              carId={carId}
              listingId={listing?.$id || ""}
              userId={listing?.shopId || ""}
              carTitle={listing?.displayTitle || ""}
              price={listing?.price || 0}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
