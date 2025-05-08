"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listinSchema } from "@/validation/listing.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const AddListing = () => {
  const listingClientSchema = listinSchema.extend({
    contactPhone: z
      .string({
        required_error: "content number is required",
      })
      .refine(isValidPhoneNumber, "invalid phone number"),
  });
  type FormDataType = z.infer<typeof listingClientSchema>;

  const form = useForm<FormDataType>({
    resolver: zodResolver(listingClientSchema),
    mode: "onBlur",
    defaultValues: {
      brand: "",
      model: "",
      yearOfManufacture: "",
      exteriorColor: "",
      condition: "",
      secondCondition: [],
      mileage: "",
      transmition: "",
      fuelType: "",
      vin: "",
      bodyType: "",
      drivertrain: "",
      seatingCapacity: "",
      description: "",
      peice: 0,
      imageUrls: [],
    },
  });
  function onSubmit(values: FormDataType) {
    console.log(values);
  }
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-4xl mx-auto pt-5">
        <Card className="!bg-transparent shadow-none border-none">
          <CardHeader className="flex items-center justify-center bg-white rounded-[8px] p-4 mb-4">
            <CardTitle className="font-semibold text-xl">Add listing</CardTitle>
          </CardHeader>
          <CardContent className="bg-white rounded-[8xl] p-6 px-6 pb-8"></CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddListing;
