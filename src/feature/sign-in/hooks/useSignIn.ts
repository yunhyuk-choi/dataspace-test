"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signInRequest, signOutRequest } from "../services/signinRequest";

export function useSignIn() {
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: signInRequest,
    mutationKey: ["signIn"],
    onSuccess: (res) => {
      console.log("sign in result", res);
      router.refresh();
      router.push("/");
    },
    onError: (e) => {
      console.log("error with ", e);
    },
  });

  const handleSignin = (req: { id: string; password: string }) => {
    signInMutation.mutate(req);
  };

  return {
    signInMutation,
    handleSignin,
  };
}

export function useSignOut() {
  const router = useRouter();
  const signOutMutation = useMutation({
    mutationFn: signOutRequest,
    mutationKey: ["signOut"],
    onSuccess: (res) => {
      console.log("signout result", res);
      router.refresh();
    },
    onError: (e) => {
      console.log("error with ", e);
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
  };
  return { handleSignOut, signOutMutation };
}
