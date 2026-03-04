"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const bookingFormSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  userEmail: z.string().email("Invalid email address"),
  userPhone: z.string().min(10, "Phone must be at least 10 characters"),
  bookingDate: z.string().min(1, "Booking date is required"),
  bookingTime: z.string().min(1, "Booking time is required"),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  carId: string;
  listingId: string;
  userId: string;
  carTitle: string;
  price: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  carId,
  listingId,
  userId,
  carTitle,
  price,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userPhone: "",
      bookingDate: "",
      bookingTime: "",
      message: "",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      setIsLoading(true);

      const bookingData = {
        carId,
        listingId,
        userId,
        ...data,
      };

      const response = await axios.post("/api/booking", bookingData);

      if (response.status === 201) {
        toast({
          title: "Success!",
          description: "Your booking request has been submitted.",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.error || "Failed to create booking",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        {/* Car Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Car</p>
                <p className="font-semibold">{carTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="font-semibold text-lg font-bold">
                  Rs. {price?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="userEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="userPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Booking Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time */}
                <FormField
                  control={form.control}
                  name="bookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us anything else you'd like us to know..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
