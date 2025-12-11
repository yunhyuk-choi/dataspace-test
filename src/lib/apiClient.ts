import axios from "axios";
import axiosRetry from "axios-retry";
import { redirect } from "next/navigation";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "/api";

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
  shouldResetTimeout: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      redirect("/sign-in");
    }

    if (status >= 500) {
      if (typeof window !== "undefined") {
        console.log("error:", error);
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export const getURL = (path: string) => new URL(path, baseURL);
