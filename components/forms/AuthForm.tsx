"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data) => Promise<{ success: boolean }>;
  formType: "SIGN_IN " | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate
  };

  const buttonText = formType === "SIGN_IN " ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don't have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>

    // <Card className="w-full sm:max-w-md">
    //   <CardHeader>
    //     <CardTitle>Profile Settings</CardTitle>
    //     <CardDescription>
    //       Update your profile information below.
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <form id="form-rhf-input" onSubmit={form.handleSubmit(handleSubmit)}>
    //       <FieldGroup>
    //         <Controller
    //           name="username"
    //           control={form.control}
    //           render={({ field, fieldState }) => (
    //             <Field data-invalid={fieldState.invalid}>
    //               <FieldLabel htmlFor="form-rhf-input-username">
    //                 Username
    //               </FieldLabel>
    //               <Input
    //                 {...field}
    //                 id="form-rhf-input-username"
    //                 aria-invalid={fieldState.invalid}
    //                 placeholder="shadcn"
    //                 autoComplete="username"
    //               />
    //               <FieldDescription>
    //                 This is your public display name. Must be between 3 and 10
    //                 characters. Must only contain letters, numbers, and
    //                 underscores.
    //               </FieldDescription>
    //               {fieldState.invalid && (
    //                 <FieldError errors={[fieldState.error]} />
    //               )}
    //             </Field>
    //           )}
    //         />
    //       </FieldGroup>
    //     </form>
    //   </CardContent>
    //   <CardFooter>
    //     <Field orientation="horizontal">
    //       <Button type="button" variant="outline" onClick={() => form.reset()}>
    //         Reset
    //       </Button>
    //       <Button type="submit" form="form-rhf-input">
    //         Save
    //       </Button>
    //     </Field>
    //   </CardFooter>
    // </Card>
  );
};

export default AuthForm;
