import { SignupForm } from "@/blocks/commons/signup-form";
import { FormAsyncValidateOrFn, FormValidateOrFn, useForm } from "@tanstack/react-form";
import { memo } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { SignupFormData, signUpSchema } from "../types/signupSchema";
import StepperWrapper from "./StepperWrapper";

function SignupSteps() {
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
    <StepperWrapper>
      <div>약관 동의</div>
      <SignupForm form={form} />
      <div>가입 심사</div>
    </StepperWrapper>
  );
}

export default memo(SignupSteps);
