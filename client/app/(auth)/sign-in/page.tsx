"use client";

import React, { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const fields = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
] as const;

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setFeedback("");

    try {
      const callbackUrl = searchParams?.get("callbackUrl") ?? "/";

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.ok) {
        setFeedback("Signed in successfully");
        reset();
        router.replace(result.url || callbackUrl);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-16 flex justify-center w-full min-h-screen bg-white dark:bg-neutral-900 border-t">
      <div className="mt-4 w-full max-w-xs md:max-w-sm p-6">
        <h2 className="text-neutral-900 dark:text-white text-2xl font-semibold mb-4">
          Sign In to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col space-y-1 text-neutral-900 dark:text-white"
            >
              <label htmlFor={field.name}>{field.label}</label>

              <input
                id={field.name}
                type={field.type}
                {...register(field.name)}
                aria-invalid={!!errors[field.name]}
                className={`border rounded-sm px-2 py-1 bg-transparent outline-none
                  ${
                    errors[field.name]
                      ? "border-red-500"
                      : "border-neutral-400"
                  }
                  text-neutral-700 dark:text-neutral-300`}
              />

              {errors[field.name] && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium py-1.5 px-2 rounded-sm disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full text-center my-4 flex items-center gap-2">
          <span className="flex-1 h-px bg-neutral-400" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Or
          </span>
          <span className="flex-1 h-px bg-neutral-400" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium py-2 rounded-sm"
        >
          Sign In with Google
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}

        <div className="text-sm mt-4 text-center text-neutral-700 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <span
            className="font-medium underline cursor-pointer"
            onClick={() => router.replace("/sign-up")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  );
};

export default Page;
