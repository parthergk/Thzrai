import { CheckCircle } from "lucide-react";

const benefits = [
  "Instant thumbnail analysis",
  "Professional design insights",
  "Competitor research made easy",
  "Time-saving recommendations",
];

export function BenefitsSection() {
  return (
    <div className="px-4 pt-40 pb-24">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
        Why Choose Our Tool?
      </h2>
      <div className="max-w-2xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="cursor-pointer flex justify-between items-center space-x-3 mb-4">
            <span className="text-lg text-neutral-700 dark:text-neutral-300">
                {index}.{benefit}
              </span>
              <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        ))}
      </div>
    </div>
  );
}