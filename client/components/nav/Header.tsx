"use client";
import { User } from "lucide-react";
import { useState } from "react";
import UserDetial from "./UserDetial";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

const Header: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();

  const isUser = status === "authenticated";
  // const isUser = true;

  function handleUser() {
    if (status === "authenticated") {
      setShowDetail((prev) => !prev);
    }

    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }

  return (
    <header className="w-full bg-white dark:bg-neutral-900 fixed z-20">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2 text-black dark:text-white"
            >
              <span className="text-lg md:text-xl font-semibold ">
                Thzr Ai
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className=" px-3 py-0.5 sm:py-[3px] rounded-sm shadow-md bg-white text-neutral-800 dark:bg-neutral-800 dark:text-white dark:shadow-neutral-950 border border-neutral-200 dark:border-neutral-700/60 hover:shadow-lg hover:bg-neutral-50/60 transition-all duration-200 hover:scale-105"
              aria-label="Toggle User Menu"
              aria-expanded={isUser}
              onClick={handleUser}
            >
              {isUser ? <User className="h-5 w-5 my-0.5 sm:my-0 sm:h-6 sm:w-6" /> : <span className=" text-xs sm:text-sm">Log in</span>}
            </button>
            <UserDetial isUser={showDetail} data={data?.user} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
