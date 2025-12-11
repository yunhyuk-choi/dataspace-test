import { Button } from "@/components/ui/button";
import { getUser } from "@/feature/sign-in/hooks/getUser"; // 경로 확인
import Link from "next/link";
import SignoutButton from "./SignoutButton";


export default async function UserArea() {
  // 여기서만 데이터를 기다립니다!
  const user = await getUser();

  console.log("USERAREA", user);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">
          Welcome, <b>{user.username}</b>!
        </span>
        <SignoutButton />
      </div>
    );
  }

  // 로그인 안 했을 때
  return (
    <div className="flex gap-2">
      <Link href="/sign-in">
        <Button size="small" variant="outline" style="outlined">
          Log in
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button size="small">Sign up</Button>
      </Link>
    </div>
  );
}
