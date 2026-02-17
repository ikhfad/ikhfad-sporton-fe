"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { login } from "@/app/services/auth.service";
import Image from "next/image";
import Button from "@/app/(landing)/components/ui/button";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sessionExpired = searchParams.get("sessionExpired");

  useEffect(() => {
    if (sessionExpired === "true") {
      toast.error("Your session has expired. Please log in again.");
    }

    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin");
    }
  }, [router, sessionExpired]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await login({ email, password });
      if (data.token) {
        router.replace(callbackUrl);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong, please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="w-[90%] md:max-w-136 bg-white rounded-xl border-t-4 border-primary py-5 px-10 md:py-12 md:px-18">
        <Image
          src="/images/logo-admin.svg"
          alt="Logo Admin"
          width={384}
          height={51}
          className="mb-4 mx-auto"
          loading="eager"
        />
        <p className="opacity-50 text-sm text-center mb-9">
          Enter your credentials to access the dashboard
        </p>

        {errorMessage && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-6">
            <FiAlertCircle size={20} />
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group-admin mb-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Please type your email"
              value={email}
              className={`rounded-lg! ${errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("both") ? "border! border-red-500!" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group-admin mb-6 md:mb-12">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••••••••••••"
              value={password}
              className={`rounded-lg! ${errorMessage.toLowerCase().includes("password") || errorMessage.toLowerCase().includes("both") ? "border! border-red-500!" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full rounded-lg! mb-0 md:mb-8"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing In ..." : "Sign In"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default function LoginPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center p-4">
          <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-12 px-6 sm:px-12 md:px-18">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-500 text-sm font-medium animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
