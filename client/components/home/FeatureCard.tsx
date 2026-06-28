interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="cursor-pointer group px-4 py-8 rounded-sm text-neutral-900  bg-white dark:bg-neutral-800/50 dark:shadow-neutral-950 shadow-sm border border-neutral-300/70 dark:border-neutral-700/60 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-white hover:shadow-md hover:scale-105">
      <div className=" mt-4 border-l border-neutral-300 dark:border-neutral-600 px-4">
        <div className=" flex gap-3 items-center">
          <span>{icon}</span>
          <h3 className="text-xl font-medium text-black dark:text-white transition-colors duration-300 ease-in-out">
            {title}
          </h3>
        </div>

        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}
