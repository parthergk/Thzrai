import { Eye, Palette, Layout } from "lucide-react";
export const features = [
  {
    icon: <Eye className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />,
    title: "Font Analysis",
    description:
      "Identify fonts, sizes, and styles used in successful thumbnails",
  },
  {
    icon: (
      <Palette className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />
    ),
    title: "Color Detection",
    description: "Extract color palettes and understand color psychology",
  },
  {
    icon: <Layout className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />,
    title: "Layout Insights",
    description: "Learn about composition and element placement",
  },
];