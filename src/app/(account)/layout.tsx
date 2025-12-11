import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import "../globals.css";

function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative -top-15 flex w-full flex-col items-center justify-center">
      <Link href="/" className="fixed top-0 flex items-center gap-2 py-6 font-medium">
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Dataspace
      </Link>
      {children}
    </div>
  );
}

export default memo(AccountLayout);
