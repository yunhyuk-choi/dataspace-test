"use server"
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function LocaleProvider({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={"Asia/Seoul"}>
      {children}
    </NextIntlClientProvider>
  );
}
