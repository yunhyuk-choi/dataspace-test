"use client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useSetting from "@/i18n/config";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { Key } from "react-aria-components";
import { setLocale } from "../hooks/settingHooks";

function SettingLocale() {
  const router = useRouter();
  const { locales } = useSetting();
  const locale = useLocale();
  const localeItems = locales.map((item: string) => {
    return { id: item, name: item };
  });
  const mutateSetLocate = useMutation({
    mutationFn: setLocale,
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = useCallback(
    (locale: Key | null) => {
      if (!locale) return;
      const target = locale === "system" ? navigator.language.split("-")[0] : locale?.toString();
      mutateSetLocate.mutate(target);
    },
    [mutateSetLocate]
  );

  return (
    <div>
      <p className="text-6xl">Setting Locale</p>
      <Select aria-label="select-locale" onChange={handleClick}>
        <SelectTrigger>{locale}</SelectTrigger>
        <SelectContent items={localeItems}>
          {(item) => (
            <SelectItem id={item.id} textValue={item.id}>
              {item.name}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(SettingLocale);
