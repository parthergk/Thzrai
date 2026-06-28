import Image from "next/image";

export default function FounderQuoteSection() {
  return (
    <section className="relative w-full pb-10 px-6 bg-white dark:bg-neutral-900">
      <div className=" w-full mx-auto text-center ">
        <p className=" font-normal text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          AI makes me faster, but raw AI kills creativity. That`s why{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Thzr AI
          </span>{" "}
          doesn’t design for you — it analyzes. You stay creative. AI just gives
          clarity.
        </p>

        <div className="mt-7 flex justify-center items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/gaurav.png"
              alt="Parther"
              fill
              className="object-cover"
            />
          </div>
          <div className=" flex flex-col items-start">
            <p className="ont-semibold text-gray-900 dark:text-white">
              Parther
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Creator of Thzr AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
