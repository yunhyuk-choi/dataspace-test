import { apiClient } from "@/lib/apiClient";
import { SignupFormData } from "../types/signupSchema";

interface SigninProps {
  id: string;
  password: string;
}

export async function signInRequest(req: SigninProps) {
  const { data } = await apiClient.post(`auth/login`, req);

  if (data.success) console.log("user data", data);

  return data.success;
}

export async function signOutRequest() {
  const { data } = await apiClient.post(`auth/sign-out`);

  if (data.success) console.log("user logout", data);

  return data.success;
}

export async function signUpRequest(req: SignupFormData) {
  const { data } = await apiClient.post(`auth/sign-up`, req);

  if (!data.success) return data.error;

  console.log("Sign up data", data);
  return data.data;
}

export async function verifyEmail(req: { email: string; key: string }) {
  const { data } = await apiClient.post(`users/verify-email`, req);

  return data.success;
}
