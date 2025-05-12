import { APP_CONFIG } from "@/lib/app-config";
import { createAnonymousClient } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { listingid: string } }
) => {
  try {
    const { listingid } = params;
    const { databases } = await createAnonymousClient();

    const listing = await databases.getDocument(
      APP_CONFIG.APPWRITE.DATABASE_ID,
      APP_CONFIG.APPWRITE.CAR_LISTING_ID,
      listingid
    );
    return NextResponse.json(
      {
        message: "Listing fetched successfully",
        listing,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

// import { APP_CONFIG } from "@/lib/app-config";
// import { createAnonymousClient } from "@/lib/appwrite";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (
//   _req: NextRequest,
//   { params }: { params: { listingId: string } }
// ) => {
//   try {
//     const { listingId } = params;

//     // Check if the listingId exists
//     if (!listingId) {
//       return NextResponse.json(
//         { error: "Listing ID is required" },
//         { status: 400 }
//       );
//     }

//     const { databases } = await createAnonymousClient();

//     // Try to fetch the listing
//     const listing = await databases.getDocument(
//       APP_CONFIG.APPWRITE.DATABASE_ID,
//       APP_CONFIG.APPWRITE.CAR_LISTING_ID,
//       listingId
//     );

//     if (!listing) {
//       return NextResponse.json({ error: "Listing not found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       {
//         message: "Listing fetched successfully",
//         listing,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error fetching listing:", error.message || error);
//     return NextResponse.json(
//       {
//         error: error?.message || "Internal Server Error",
//       },
//       { status: 500 }
//     );
//   }
// };
