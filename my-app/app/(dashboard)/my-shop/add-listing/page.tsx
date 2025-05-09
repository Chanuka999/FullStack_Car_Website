"use client";
import FormGenerator from "@/components/FormGeneratoer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { addListingFields } from "@/constants/listing-fields";
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
  type FormFieldName = keyof FormDataType;

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
          <CardContent className="bg-white rounded-[8xl] p-6 px-6 pb-8">
            <div className="w-full mx-auto">
              <div className="flex items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
                    <div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                      {addListingFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name as FormFieldName}
                          disabled={field.disabled}
                          render={({ field: formField }) => {
                            const valueMultiSelect =
                              field.fieldType === "multiselect"
                                ? Array.isArray(formField.value)
                                  ? formField.value
                                  : []
                                : [];
                            return (
                              <FormItem
                                className={`${
                                  field.col ? `col-span-${field.col}` : ""
                                }`}
                              >
                                <FormControl>
                                  <FormGenerator
                                    field={field}
                                    register={form.register}
                                    errors={form.formState.errors}
                                    formvalue={formField.value}
                                    valueMultiSelect={valueMultiSelect}
                                    onChange={formField.onChange}
                                  ></FormGenerator>
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddListing;
