import { memo } from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import LocaleProvider from "./LocaleProvider";
import QueryProvider from "./QueryProvider";

function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </SidebarProvider>
    </QueryProvider>
  );
}

export default memo(ProviderWrapper);
