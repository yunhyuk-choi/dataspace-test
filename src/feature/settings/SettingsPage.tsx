"use client";
import { Button } from "@/components/ui/button";
import useSetting from "@/i18n/config";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import SettingLocale from "./components/SettingLocale";
import { setLocale } from "./hooks/settingHooks";

function SettingsPage() {
  const router = useRouter();
  const t = useTranslations("Settings");
  const mutateSetLocate = useMutation({
    mutationFn: setLocale,
    onSuccess: () => {
      router.refresh();
    },
  });
  const { locales } = useSetting();

  const handleClick = useCallback(
    async (locale: string) => {
      const target = locale === "system" ? navigator.language.split("-")[0] : locale;
      const res = await mutateSetLocate.mutateAsync(target);
      console.log(res.isChanged);
      // if (res?.isChanged) router.refresh();
    },
    [mutateSetLocate, router]
  );

  return (
    <div>
      {t("settings")}
      {locales.map((locale) => (
        <Button key={locale} onClick={() => handleClick(locale)}>
          {t(locale)}
        </Button>
      ))}
      <SettingLocale />
    </div>
  );
}

export default memo(SettingsPage);
