"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DataAPIInterface } from "@/feature/data-asset-upload/main-panel/types/formInterfaces";
import { SignInFormType } from "@/feature/sign-in/types/signinSchema";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface LoginProps extends React.ComponentProps<"form"> {
  form: DataAPIInterface<SignInFormType>;
}

export function LoginForm({ form, className, ...props }: LoginProps) {
  const t = useTranslations("account");

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{t("sign-in")}</h1>
          <p className="text-muted-foreground text-sm text-balance">{t("sign-in-title-caption")}</p>
        </div>
        <form.Field name="id">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t("sign-in-id-label")}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                type="text"
                placeholder="m@example.com"
                required
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>{t("password")}</FieldLabel>
                <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  {t("sign-in-caption-forgot")}
                </Link>
              </div>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                type="password"
                required
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>

        <Field>
          <Button type="submit">{t("sign-in-submit")}</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            {t("sign-in-caption-notyet")}{" "}
            <Link replace href="/sign-up" className="underline underline-offset-4">
              {t("sign-up")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
