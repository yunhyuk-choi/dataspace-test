"use client";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/feature/sign-in/hooks/useSignIn";

export default function SignoutButton() {
  const { handleSignOut } = useSignOut();

  return (
    <Button size="small" onClick={handleSignOut}>
      Log out
    </Button>
  );
}
