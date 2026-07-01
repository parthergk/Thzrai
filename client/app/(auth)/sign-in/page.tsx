"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthProvider";
import { API_URL } from "@/lib/api";
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
  const { signIn } = useAuth();

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
      const callbackUrl = searchParams?.get("callbackUrl") ?? "/dashboard";

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid credentials");
        return;
      }

      setFeedback("Signed in successfully");
      reset();

      signIn({
        _id: data.user_id?.toString(),
        email: data.email,
        name: data.name,
        username: data.username
      });

      router.replace(callbackUrl);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window.handleGoogleCredentialResponse = async (response: any) => {
      setError(null);
      setFeedback("");
      try {
        const res = await fetch(`${API_URL}/auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
          credentials: "include"
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Google authentication failed");
          return;
        }

        setFeedback("Signed in successfully with Google");
        signIn({
          _id: data.user_id?.toString(),
          email: data.email,
          name: data.name,
          username: data.username
        });

        const callbackUrl = searchParams?.get("callbackUrl") ?? "/dashboard";
        router.replace(callbackUrl);
      } catch {
        setError("Unable to connect to Google authentication server.");
      }
    };

    const initializeGoogleSignIn = () => {
      if (typeof window !== "undefined" && window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          // @ts-ignore
          callback: window.handleGoogleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_prompt: false,
        });

        const parent = document.getElementById("google-signin-btn");
        if (parent) {
        window.google.accounts.id.renderButton(parent, {
            type: "standard",
            shape: "rectangular",
            theme: "outline",
            text: "signin_with",
            size: "large",
            logo_alignment: "left",
            width: 400,
          });
        }
      }
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [signIn, router, searchParams]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white dark:bg-neutral-900">
      <div className="mt-4 w-full max-w-xs md:max-w-sm p-6 h-fit">
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
            className="w-full h-10 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium px-2 rounded-sm disabled:opacity-60 hover:opacity-90 active:scale-[0.99] transition-all"
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

        {/* Google Sign In HTML Layout */}
        <div className="relative w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-200 font-medium h-10 rounded-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer mt-2">
          {/* Google Icon */}
          <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In with Google</span>
          
          {/* Invisible Google Button Overlay */}
          <div className="absolute inset-0 opacity-0 overflow-hidden flex justify-center items-center cursor-pointer z-10">
            <div id="google-signin-btn" />
          </div>
        </div>

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
