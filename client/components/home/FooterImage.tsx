import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroTextOnly() {
  return (
    <section className=" px-6 py-20 sm:py-24 bg-white dark:bg-neutral-900">
      <div
        className="
          mx-auto 
          rounded-md
           border-neutral-200 dark:border-neutral-800
          bg-gradient-to-br
          from-white via-neutral-50 to-white
          dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
          shadow-xl
          px-6 sm:px-10 lg:px-14
          py-14 sm:py-20
          text-center
        "
      >
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight text-neutral-900 dark:text-white">
          Analyze Thumbnails
          <span className="block text-neutral-500 dark:text-neutral-400">
            with AI in Seconds
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 mx-auto max-w-xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Stop guessing. Use AI-powered insights to understand what makes
          thumbnails click — instantly.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <button
              className="
                flex items-center gap-2
                rounded-md
                px-4 py-2
                text-sm font-medium
                bg-neutral-900 text-white
                dark:bg-white dark:text-black
                shadow-md
                hover:scale-105 transition
              "
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
