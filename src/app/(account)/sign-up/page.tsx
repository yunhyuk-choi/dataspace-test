import Signup from "@/feature/sign-in/Signup";
import { memo } from "react";

function SignupPage() {
  return (
    <main className="flex min-w-7xl flex-col items-center justify-center px-16 py-32 dark:bg-black">
      <Signup />
    </main>
  );
}

export default memo(SignupPage);
