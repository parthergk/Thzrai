import { LinkIcon, Search, Zap } from "lucide-react";
import { StepCard } from "../StepCard";
const steps = [
  {
    icon: LinkIcon,
    title: "Enter YouTube URL",
    description: "Paste any YouTube video URL to get started with the analysis",
    image: "/image/step1.png",
  },
  {
    icon: Search,
    title: "Fetch Thumbnail",
    description:
      "Our tool automatically retrieves the high-quality thumbnail image",
    image: "/image/step2.png",
  },
  {
    icon: Zap,
    title: "Get Insights",
    description: "View detailed analysis of fonts, colors, layout, and more",
    image: "/image/step3.png",
  },
];

export function HowItWorksSection() {
  return (
    <div className="py-40 px-4 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className=" flex justify-center items-center gap-2 m-auto w-fit px-2.5 py-0.5 mb-3 bg-neutral-50 dark:bg-neutral-800 dark:shadow-neutral-950 border shadow-md rounded-full ">
        <div className=" h-1.5 w-1.5 bg-neutral-900 dark:bg-white rounded-full"></div>
        <span className=" text-xs sm:text-sm font-medium text-neutral-900 dark:text-white">
          How It Works
        </span>
      </div>
      <h2 className=" text-center text-2xl md:text-4xl font-medium mb-2 text-neutral-900 dark:text-white">
        AI-Powered Analysis
      </h2>
      <p className="mb-8 text-sm md:text-base text-center text-neutral-600 dark:text-neutral-300">
        Analyze any YouTube thumbnail and get instant insights in just 3 steps
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {steps.map((step, index) => (
          <div key={index} className={index === 2 ? "md:col-span-2" : ""}>
            <StepCard
              icon={step.icon}
              step={index + 1}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
