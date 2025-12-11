// {
//   "username": "yhchoi",
//   "email": "yh.choi@interxlab.com",
//   "password": "interx1004",
//   "confirmPassword": "interx1004",
//   "phoneNumber": "01066639355",
//   "companyInfo": {
//     "companyName": "interx",
//     "registrationNumber": "000000",
//     "presentName": "inte",
//     "openingDate": "2025-12-04"
//   }
// }

import z from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }),
  registrationNumber: z.string().min(1, { message: "Registration number is required." }),
  presentName: z.string().min(1, { message: "Representative name is required." }),
  openingDate: z.string().min(1, { message: "Opening date is required." }),
});

export const signUpSchema = z
  .object({
    username: z.string().min(4, { message: "Username must be at least 4 characters long." }),

    email: z.email({ message: "Invalid email format." }),

    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),

    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters long." }),

    phoneNumber: z
      .string()
      .min(10, { message: "Invalid phone number." })
      .max(15, { message: "Invalid phone number." }),

    companyInfo: companyInfoSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signUpSchema>;
