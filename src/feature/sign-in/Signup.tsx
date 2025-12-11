"use client";

import { SignupForm } from "@/blocks/commons/signup-form";
import { Card } from "@/components/ui/card";
import { FormAsyncValidateOrFn, FormValidateOrFn, useForm } from "@tanstack/react-form";
import { memo } from "react";
import { useSignUp } from "./hooks/useSignUp";
import { SignupFormData, signUpSchema } from "./types/signupSchema";

function Signup() {
  const { handleSignUp } = useSignUp();
  const form = useForm<
    SignupFormData,
    undefined | FormValidateOrFn<SignupFormData>,
    undefined | FormValidateOrFn<SignupFormData>,
    undefined | FormAsyncValidateOrFn<SignupFormData>,
    undefined | FormValidateOrFn<SignupFormData>,
    undefined | FormAsyncValidateOrFn<SignupFormData>,
    undefined | FormValidateOrFn<SignupFormData>,
    undefined | FormAsyncValidateOrFn<SignupFormData>,
    undefined | FormValidateOrFn<SignupFormData>,
    undefined | FormAsyncValidateOrFn<SignupFormData>,
    undefined | FormAsyncValidateOrFn<SignupFormData>,
    unknown
  >({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      companyInfo: {
        companyName: "interx",
        registrationNumber: "000001",
        presentName: "inte",
        openingDate: "2025-12-04",
      },
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      handleSignUp(value);
    },
  });

  return (
    <div className="flex w-full justify-center">
      <Card className="w-3xl border-solid border-neutral-100 bg-neutral-50 p-4">
        <SignupForm form={form} />
      </Card>
    </div>
  );
}

export default memo(Signup);
