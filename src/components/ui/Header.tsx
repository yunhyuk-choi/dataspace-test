import UserArea from "@/blocks/commons/UserArea";
import { Suspense } from "react";
import "../../stories/header.css";
import { SidebarTrigger } from "./sidebar";
import { Skeleton } from "./skeleton";

export interface UserData {
  username: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  status: string;
}

export interface HeaderProps {
  userData: UserData | null;
}

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="border-[rgba(0, 0, 0, 0.1)] flex h-16 shrink-0 items-center justify-between border-b border-solid px-[15px] py-5">
        <div>
          <SidebarTrigger className="-ml-1" />
        </div>
        <Suspense fallback={<UserAreaSkeleton />}>
          <UserArea />
        </Suspense>
      </div>
    </header>
  );
};

function UserAreaSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className="h-9 w-16 rounded-md" /> 
      <Skeleton className="h-9 w-18 rounded-md" /> 
    </div>
  );
}
