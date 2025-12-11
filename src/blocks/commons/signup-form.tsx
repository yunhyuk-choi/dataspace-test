"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DataAPIInterface } from "@/feature/data-asset-upload/main-panel/types/formInterfaces";
import { SignupFormData } from "@/feature/sign-in/types/signupSchema";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SignUpProps extends React.ComponentProps<"form"> {
  form: DataAPIInterface<SignupFormData>;
}

export function SignupForm({ form, className, ...props }: SignUpProps) {
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
          <h1 className="text-2xl font-bold">{t("sign-up")}</h1>
          <p className="text-muted-foreground text-sm text-balance">{t("sign-up-title-caption")}</p>
        </div>
        <form.Field name="username">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t("sign-up-user-name-label")}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                type="text"
                placeholder="JohnDoe"
                required
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                type="email"
                placeholder="JohnDoe@google.com"
                required
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="phoneNumber">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t("phone-number")}</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                type="tel"
                placeholder="01012345678"
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
              <FieldLabel htmlFor={field.name}>{t("password")}</FieldLabel>
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
              <FieldDescription>{t("sign-up-password-caption")}</FieldDescription>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="confirmPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{t("sign-up-password-confirm")}</FieldLabel>
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
              <FieldDescription>{t("sign-up-password-confirm-caption")}</FieldDescription>
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>

        <Field>
          <Button type="submit">{t("sign-up-submit")}</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            {t("sign-up-caption-alreay")}{" "}
            <Link replace href="/sign-in">
              {t("sign-in")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
