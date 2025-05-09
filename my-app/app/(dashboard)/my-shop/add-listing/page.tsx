"use client";
import FileUploader from "@/components/FileUploader";
import FormGenerator from "@/components/FormGeneratoer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollBar } from "@/components/ui/scroll-area";
import { addListingFields } from "@/constants/listing-fields";
import { listinSchema } from "@/validation/listing.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { X } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
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
  const imageUrls = useWatch({
    control: form.control,
    name: "imageUrls",
  });

  const brand = useWatch({
    control: form.control,
    name: "brand",
  });

  const handleImageUrls = (imageUrls: string[]) => {
    form.setValue("imageUrls", [...form.getValues().imageUrls, ...imageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = [...form.getValues().imageUrls];
    updatedImageUrls.splice(index, 1);
    form.setValue("imageUrls", updatedImageUrls);
  };

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
                    <div>
                      <h2 className="text-sm font-medium text-[#28363e]">
                        Add Photo
                      </h2>
                      <div className="text-sm text-[#6c8ea0]">
                        <div>Add at least 3 photos for this listing</div>
                        First picture - is the title picture.
                      </div>
                    </div>

                    <div className="flex items-center justify-start mt-2">
                      <FileUploader onFileUrlsReceived={handleImageUrls}>
                        <ScrollArea className="w-96 whitespace-nowrap ml-3">
                          <div className="w-full flex max-w space-x-4 items-center h-20">
                            {imageUrls?.map(
                              (imageUrl: string, index: number) => (
                                <div
                                  key={`id-${index}`}
                                  className="relative overflow-hidden w-20 h-20
                              rounded-[8px] bg-[#e5f6e8]
                                "
                                >
                                  <img
                                    src={imageUrl}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="w-full h-full rounded-[8px] object-cover"
                                  />
                                  <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 p-1
                                  bg-black rounded-full
                                  "
                                  >
                                    <X className="w-4 h-4 !text-white" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </FileUploader>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
                      {addListingFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name as FormFieldName}
                          disabled={field.disabled}
                          render={({ field: formField }) => {
                            const filteredModels =
                              field.name === "model" && brand
                                ? field?.options?.filter(
                                    (model) => model.key === brand
                                  )
                                : [];
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
                                    field={{
                                      ...field,
                                      options:
                                        field.name === "model"
                                          ? filteredModels
                                          : field.options,
                                    }}
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

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-6 py-6 mb-4 w-full max-w-xs flex place-items-center justify-self-center"
                      disabled={false}
                    >
                      Post listing
                    </Button>
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
