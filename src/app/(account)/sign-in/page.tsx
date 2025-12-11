import Signin from "@/feature/sign-in/Signin";
import { memo } from "react";

function SigninPage() {
  return (
    <main className="flex max-w-5xl min-w-3xl flex-col items-center justify-center px-16 py-32 dark:bg-black">
      <Signin />
    </main>
  );
}

export default memo(SigninPage);
