import { object, string } from "zod";

export const signupSchema = object({
  name: string().min(1, {
    message: "Name is required",
  }),
  email: string()
    .email({
      message: "please enter a valid email address",
    })
    .min(1, {
      message: "Email is required",
    }),
  shopName: string().min(2, {
    message: "shop name is required",
  }),
  password: string().min(8, {
    message: "password shoud be at least 8 character",
  }),
});

export const loginSchema = object({
  email: string()
    .email({
      message: "please enter a valid email address",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: string().min(1, {
    message: "password is required",
  }),
});
