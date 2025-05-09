import { APP_CONFIG } from "@/lib/app-config";
import { createSessionClient } from "@/lib/appwrite";
import { uploadSchema } from "@/validation/upload.validation";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    // Validate file input
    const validationResult = uploadSchema.safeParse({ files });
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.message },
        { status: 400 }
      );
    }

    // Use admin client for server-side operations
    const { storages } = await createSessionClient();

    // Upload each file to Appwrite Storage
    const uploadPromises = files.map(async (file) => {
      const uploadedFile = await storages.createFile(
        APP_CONFIG.APPWRITE.BUCKET_IMAGES_ID,
        ID.unique(),
        file
      );

      const fileUrl = `${APP_CONFIG.APPWRITE.ENDPOINT}/storage/buckets/${APP_CONFIG.APPWRITE.BUCKET_IMAGES_ID}/files/${uploadedFile.$id}/view?project=${APP_CONFIG.APPWRITE.PROJECT_ID}`;

      return {
        id: uploadedFile.$id,
        url: fileUrl,
      };
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json({ files: uploadedFiles }, { status: 200 });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
