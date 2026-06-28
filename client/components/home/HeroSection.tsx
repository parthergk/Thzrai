"use client";

import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollRef = useRef(null)
  const {scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "center"]
  })
const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div ref={scrollRef} className="w-full flex flex-col pt-20 relative overflow-hidden">
      <div
        className="flex justify-center"
        style={{ opacity: 1, transform: "none" }}
      >
        <button className=" no-underline group cursor-pointer relative inline-block w-fit mx-auto">
          <div className="relative flex space-x-2 items-center z-10 rounded-full shadow-md p-px text-[10px] sm:text-xs font-semibold leading-6 text-neutral-700 dark:text-neutral-300 bg-neutral-50  dark:bg-neutral-800 py-0.5 sm:py-1.5 px-4 ring-1 ring-white/10">
            <span>Design standout thumbnails effortlessly!</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px sm:h-[1.5px] sm:-bottom-[1px] w-[calc(100%-2.25rem)] bg-gradient-to-r from-green-400/0 via-green-400/90 to-green-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
      </div>

      <h1 className="mt-6 sm:mt-8 text-[26px] sm:text-4xl md:text-6xl font-semibold mx-auto text-center z-10 tracking-tight">
        <span className="text-neutral-800 dark:text-white">
          Analyze YouTube Thumbnails <br />
        </span>
        <span className=" text-neutral-600 dark:text-white/80">
          and Design Like a Pro!
        </span>
      </h1>

      <p className=" leading-relaxed text-center mt-4 sm:mt-6 text-xs sm:text-base max-w-[18rem] sm:max-w-[32rem] md:max-w-2xl mx-auto z-10 text-neutral-600 dark:text-neutral-300">
        Our tool analyzes font{" "}
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-md rounded-sm bg-white/5 border border-white/10 dark:bg-neutral-800 dark:border-neutral-700/60 dark:shadow-neutral-950 cursor-pointer transition-all duration-300 hover:shadow-green-400">
          styles
        </span>{" "}
        ,{" "}
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-md rounded-sm bg-white/5 border border-white/10 dark:bg-neutral-800 dark:border-neutral-700/60 dark:shadow-neutral-950 cursor-pointer transition-all duration-300 hover:shadow-orange-400">
          colors
        </span>{" "}
        , and{" "}
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 shadow-md rounded-sm bg-white/5 border border-white/10 dark:bg-neutral-800 dark:border-neutral-700/60 dark:shadow-neutral-950 cursor-pointer transition-all duration-300 hover:shadow-blue-400">
          layouts
        </span>{" "}
        of existing YouTube thumbnails, giving you the insights and inspiration
        to create stunning thumbnails.
      </p>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <Link href="/dashboard" className="group">
          <button
            className="transition-all flex items-center gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm backdrop-blur-sm bg-white/5 border border-white/10 shadow-md rounded-md dark:bg-neutral-800 dark:border-neutral-700/50 dark:shadow-neutral-950 text-neutral-900 dark:text-white  hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:scale-105 duration-150"
          >
            How it work
            <Youtube className=" w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </Link>
        <Link href="/dashboard" className="group">
          <button className=" py-1.5 px-2 sm:px-3 text-xs sm:text-sm shadow-md bg-neutral-800 dark:bg-white dark:text-black text-white border border-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 dark:shadow-neutral-950 flex items-center gap-2 hover:scale-105 transition-all duration-150">
            Get start free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* Demo Preview */}
      <div className="mt-16 mx-auto max-w-10xl px-4">
        <motion.div style={{ perspective: 1200, rotateX, scale }} className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <Image
            src="/img.png"
            alt="YouTube Thumbnail Analyzer Demo"
            width={1200}
            height={630}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
