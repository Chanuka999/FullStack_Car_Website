import { APP_CONFIG } from "@/lib/app-config";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      carId,
      listingId,
      userId,
      userName,
      userEmail,
      userPhone,
      bookingDate,
      bookingTime,
      message,
    } = body;

    if (
      !carId ||
      !listingId ||
      !userId ||
      !userName ||
      !userEmail ||
      !userPhone ||
      !bookingDate ||
      !bookingTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { databases } = await createAdminClient();

    const booking = await databases.createDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.BOOKING_ID,
      ID.unique(),
      {
        carId,
        listingId,
        userId,
        userName,
        userEmail,
        userPhone,
        bookingDate,
        bookingTime,
        message: message || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    );

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { databases } = await createAdminClient();

    const bookings = await databases.listDocuments(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.BOOKING_ID,
    );

    const listingIds = [
      ...new Set(
        bookings.documents
          .map((booking) => booking.listingId || booking.carId)
          .filter(Boolean) as string[],
      ),
    ];

    const listingsMap: Record<string, any> = {};

    if (listingIds.length > 0) {
      const listingsResponse = await databases.listDocuments(
        APP_CONFIG.APPWRITE.DATABASE_ID,
        APP_CONFIG.APPWRITE.CAR_LISTING_ID,
        [Query.equal("$id", listingIds)],
      );

      listingsResponse.documents.forEach((listing) => {
        listingsMap[listing.$id] = listing;
      });
    }

    const enrichedBookings = bookings.documents.map((booking) => ({
      ...booking,
      listing:
        listingsMap[booking.listingId] || listingsMap[booking.carId] || null,
    }));

    return NextResponse.json({ bookings: enrichedBookings }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
