// "use client";
// import React from "react";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signupSchema } from "@/validation/auth.validation";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../form";
// import { Input } from "../input";
// import { Button } from "../button";
// import useRegisterDialog from "@/hooks/use-register.dialog";
// import useLoginDialog from "@/hooks/use-login.dialog";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { registerMutationfn } from "@/lib/fetcher";
// import { toast } from "@/hooks/use-toast";
// import { Loader } from "lucide-react";

// const RegisterDialog = () => {
//   const { open, onClose } = useRegisterDialog();
//   const { onOpen } = useLoginDialog();

//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationFn: registerMutationfn,
//   });
//   const form = useForm<z.infer<typeof signupSchema>>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       shopName: "",
//       password: "",
//     },
//   });
//   const onSubmit = (values: z.infer<typeof signupSchema>) => {
//     mutate(values, {
//       onSuccess: () => {
//         queryClient.refetchQueries({
//           queryKey: ["currentUser"],
//         });
//         toast({
//           title: "Registration successful",
//           description: "",
//           variant: "success",
//         });
//         form.reset();
//         onClose();
//       },
//       onError: () => {
//         toast({
//           title: "Error occured",
//           description: "Registration failed,please try again",
//           variant: "destructive",
//         });
//       },
//     });
//   };

//   const handleLoginOpen = () => {
//     onClose();
//     onOpen();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] p-8">
//         <DialogHeader>
//           <DialogTitle>create an account</DialogTitle>
//           <DialogDescription>
//             Enter your details below to register for an accont.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="chanuka randitha"
//                       className="!h-10"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="chanuka@gmail.com"
//                       type="email"
//                       className="!h-10"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="shopName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Shop name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="chanux" className="!h-10" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="********"
//                       type="passowrd"
//                       className="!h-10"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               size="lg"
//               disabled={isPending}
//               className="w-full"
//               type="submit"
//             >
//               {isPending && <Loader className="w-4 h-4 animate-spin" />}
//               Register
//             </Button>
//           </form>
//         </Form>
//         <div className="mt-2 flex items-center justify-center">
//           <p className="text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <button className="!text-primary" onClick={handleLoginOpen}>
//               Sign in
//             </button>
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RegisterDialog;

"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation/auth.validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { Button } from "../button";
import useRegisterDialog from "@/hooks/use-register.dialog";
import useLoginDialog from "@/hooks/use-login.dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerMutationfn } from "@/lib/fetcher";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

const RegisterDialog = () => {
  const { open, onClose } = useRegisterDialog();
  const { onOpen } = useLoginDialog();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationfn,
  });

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      shopName: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["currentUser"],
        });
        toast({
          title: "Registration successful",
          description: "Welcome to our platform!",
          variant: "success",
        });
        form.reset();
        onClose();
      },
      onError: () => {
        toast({
          title: "Error occurred",
          description: "Registration failed, please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleLoginOpen = () => {
    onClose();
    onOpen();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <DialogDescription>
            Enter your details below to register.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chanuka Randitha"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="chanuka@gmail.com"
                      type="email"
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chanux" className="!h-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password" // ✅ Fixed typo
                      className="!h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              disabled={isPending}
              className="w-full"
              type="submit"
            >
              {isPending && <Loader className="w-4 h-4 animate-spin mr-2" />}
              Register
            </Button>
          </form>
        </Form>

        <div className="mt-2 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              className="text-primary font-medium"
              onClick={handleLoginOpen}
            >
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
