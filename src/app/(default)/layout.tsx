import { AppSidebar } from "@/blocks/commons/app-sidebar";
import { AppHeader } from "@/components/commons/AppHeader";
import PageHeader from "@/components/commons/pageHeader";
import { SidebarInset } from "@/components/ui/sidebar";
import "../globals.css";

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <PageHeader />
        <div className="bg-secondary-50 flex min-h-[calc(100dvh-6.75rem)] flex-col items-center justify-center font-sans dark:bg-neutral-800 dark:text-neutral-50">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
