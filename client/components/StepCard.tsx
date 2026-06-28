import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface StepCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  image: string;
}

export function StepCard({
  icon: Icon,
  step,
  title,
  description,
  image,
}: StepCardProps) {
  return (
    <div className="relative cursor-default">
      <div className="relative p-6 bg-white dark:bg-neutral-900 rounded-md border border-neutral-200/70 dark:border-neutral-800/70 shadow-sm">
        <div className="flex  items-center space-x-4">
          <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          <h3 className="text-xl font-medium text-black dark:text-white transition-colors duration-300 ease-in-out">
            {title}
          </h3>
        </div>

        <p className="mt-2 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
          {description}
        </p>

        <div className="relative mt-4 h-44 md:h-48 w-full rounded-lg overflow-hidden">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}