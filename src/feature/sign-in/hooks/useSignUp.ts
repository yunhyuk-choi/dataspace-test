"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signUpRequest } from "../services/signinRequest";
import { SignupFormData } from "../types/signupSchema";

export function useSignUp() {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: signUpRequest,
    mutationKey: ["signup"],
    onSuccess: (res) => {
      console.log("success", res);
      router.replace("/sign-in");
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  const handleSignUp = (req: SignupFormData) => {
    console.log("hanel", req);
    signupMutation.mutate(req);
  };

  return { handleSignUp, signupMutation };
}
