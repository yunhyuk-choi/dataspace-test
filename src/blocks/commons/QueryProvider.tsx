"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo, ReactNode, useState } from "react";

function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default memo(QueryProvider);
