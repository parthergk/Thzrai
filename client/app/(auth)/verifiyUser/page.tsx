"use client";

import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  code: z
    .string()
    .nonempty("Verification code is required")
    .min(4, "Verification code must be at least 4 digits"),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyEmail: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams?.get("username");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    setFeedback("");

    if (!username) {
      setError("Invalid verification link.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: values.code,
          username,
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        setError(result.message || "Verification failed. Please try again.");
        return;
      }

      setFeedback("Verification successful 🎉");
      reset();

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: result.email,
        autoLogin: "true",
      });

      if (signInResult?.error) {
        setError("Auto-login failed. Please login manually.");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="mt-16 flex justify-center w-full min-h-screen bg-white dark:bg-neutral-900 border-t">
      <div className="mt-4 w-full max-w-xs md:max-w-sm p-6">
        <h2 className="text-neutral-900 dark:text-white text-2xl font-semibold mb-4 text-center">
          Email Verification
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col space-y-1 text-neutral-900 dark:text-white">
            <label htmlFor="code">Verification Code</label>

            <input
              id="code"
              type="text"
              {...register("code")}
              aria-invalid={!!errors.code}
              className={`border rounded-sm px-2 py-1 bg-transparent outline-none
                ${errors.code ? "border-red-500" : "border-neutral-400"}
                text-neutral-700 dark:text-neutral-300`}
            />

            {errors.code && (
              <p role="alert" className="text-red-500 text-xs">
                {errors.code.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium py-1.5 px-2 rounded-sm disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {feedback && <p className="text-green-500 text-sm mt-4">{feedback}</p>}
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default Page;
