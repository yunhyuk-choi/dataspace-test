import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const defaultLocale = "en";
  const supportedLocales = ["ko", "en"];
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  const currentLocale = locale && supportedLocales.includes(locale) ? locale : defaultLocale;
  return {
    locale: currentLocale,
    defaultLocale: defaultLocale,
    timeZone: "Asia/Seoul",
    supportedLocales: supportedLocales,
    messages: (await import(`../../messages/${currentLocale}.json`)).default,
  };
});