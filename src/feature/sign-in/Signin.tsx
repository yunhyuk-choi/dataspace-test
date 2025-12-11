"use client";

import { LoginForm } from "@/blocks/commons/login-form";
import { Card } from "@/components/ui/card";
import { FormAsyncValidateOrFn, FormValidateOrFn, useForm } from "@tanstack/react-form";
import { memo } from "react";
import { useSignIn } from "./hooks/useSignIn";
import { SignInFormType, signInSchema } from "./types/signinSchema";

function Signin() {
  const { handleSignin } = useSignIn();
  const form = useForm<
    SignInFormType,
    undefined | FormValidateOrFn<SignInFormType>,
    undefined | FormValidateOrFn<SignInFormType>,
    undefined | FormAsyncValidateOrFn<SignInFormType>,
    undefined | FormValidateOrFn<SignInFormType>,
    undefined | FormAsyncValidateOrFn<SignInFormType>,
    undefined | FormValidateOrFn<SignInFormType>,
    undefined | FormAsyncValidateOrFn<SignInFormType>,
    undefined | FormValidateOrFn<SignInFormType>,
    undefined | FormAsyncValidateOrFn<SignInFormType>,
    undefined | FormAsyncValidateOrFn<SignInFormType>,
    unknown
  >({
    defaultValues: {
      id: "",
      password: "",
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      handleSignin(value);
    },
  });
  return (
    <Card className="w-full border-solid border-neutral-100 bg-neutral-50 p-4">
      <LoginForm form={form} />
    </Card>
  );
}

export default memo(Signin);
