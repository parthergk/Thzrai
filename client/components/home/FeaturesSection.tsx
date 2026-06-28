import { FeatureCard } from "./FeatureCard";
import { features } from "../../lib/constant/features.js";
import Image from "next/image";

export function FeaturesSection() {
  return (
    <div className="pt-32 border-none bg-gradient-to-b bg-neutral-100 dark:from-neutral-800 dark:to-neutral-950">
      <div className=" pt-12 px-4 sm:px-6 border-t border-neutral-300 dark:border-neutral-700 ">
        <div className=" flex justify-center items-center gap-2 w-fit px-2.5 py-0.5 mb-3 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 dark:shadow-neutral-950 border shadow-md rounded-full ">
          <div className=" h-1.5 w-1.5 bg-neutral-900 dark:bg-white rounded-full"></div>
          <span className=" text-xs sm:text-sm font-medium text-neutral-900 dark:text-white">
            Features
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-medium mb-8 text-neutral-900 dark:text-white">
          Powerful Features for Creators
        </h2>
        <div className=" grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-[auto_1fr] gap-4 border-t dark:border-neutral-700 pt-2 ">
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 md:grid-rows-3 gap-3 px-2 sm:px-4 py-4 max-w-md border-r dark:border-neutral-700">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <div className=" flex flex-col justify-center items-center sm:px-4 pt-2 gap-6 sm:gap-8">
            <div className=" self-end text-xs sm:text-sm  border shadow-md rounded-sm px-4 py-1.5 dark:border-neutral-700 text-neutral-900 bg-neutral-50 dark:bg-neutral-800 dark:text-white dark:shadow-neutral-950 ">
              Analysis of Thumbnail with Ai
            </div>
            <div className=" h-[400px] w-[320px] sm:w-[500px] shadow-lg dark:shadow-neutral-950 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-md">
              <div className=" px-3 sm:px-5 w-full h-full flex justify-center items-center">
                <div className=" relative">
                  <div className=" absolute border-t border-neutral-500 w-5 left-[184px] top-3.5 sm:left-[286px] sm:top-5"></div>
                  <div className=" absolute border-r border-neutral-500  h-10 w-px left-[204px] -top-[25px] sm:left-[305px] sm:-top-[19px] "></div>
                  <div className=" absolute bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white text-xs sm:text-sm shadow-lg dark:shadow-neutral-950 px-2 py-0.5 rounded-sm left-[140px] -top-11 sm:left-[229px] sm:-top-11">
                    Font Color: #222222
                  </div>
                  <Image
                    alt="thumbnail"
                    height={720}
                    width={1280}
                    src="/image/thumbnail.jpg"
                    className=" object-cover"
                  />
                  <div className=" absolute bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white text-xs sm:text-sm shadow-lg dark:shadow-neutral-950 px-2 py-0.5 rounded-sm -left-8 bottom-[84px] sm:-left-14 sm:bottom-28">
                    Font Size: 22px
                  </div>
                  <div className=" absolute border-t border-neutral-500 w-3 sm:w-5 bottom-[40px] left-1 sm:bottom-[68px] sm:left-1"></div>
                  <div className=" absolute border-r border-neutral-500  h-11 w-px bottom-[40px] left-1 sm:bottom-[68px] sm:left-1 "></div>
                  {/* bg description */}
                  <div className=" absolute border-t border-neutral-500 w-4 sm:w-7 bottom-[70px] left-[140px] sm:bottom-[100px] sm:left-52"></div>
                  <div className=" absolute border-r border-neutral-500  h-24 w-px -bottom-[25px] left-[140px] sm:bottom-1 sm:left-52 "></div>
                  <div className=" absolute bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white text-xs sm:text-sm shadow-lg dark:shadow-neutral-950 px-2 py-0.5 rounded-sm left-[60px] -bottom-[40px] sm:left-32 sm:-bottom-5">
                    BG: Abstract surreal patterns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
