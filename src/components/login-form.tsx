import type { FormEvent } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-2xl border-border/80">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-linear-to-br from-primary/15 to-primary/35 text-base font-semibold text-primary shadow-inner shadow-primary/30">
            BC
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Sign in to budgetctl</CardTitle>
            <CardDescription className="text-sm">
              Manage your finances with ease. Continue with Google
            </CardDescription>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/60 px-3 py-1 text-xs text-accent-foreground ring-1 ring-border">
            <span className="size-2 rounded-full bg-primary" />
            Secure sign-in via Google OAuth
          </div>
        </CardHeader>
        <CardContent className="space-y-7">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FieldGroup className="gap-6">
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
                <FieldDescription className="text-center text-xs">
                  Login using your Google account.
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
