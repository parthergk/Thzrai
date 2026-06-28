import { Twitter, Github, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 pt-20 pb-5 px-4">
      <div className="max-w-6xl px-0 md:px-10 flex flex-col md:flex-row justify-between gap-12">
        {/* About Section */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-200">
            About Thumbnail Analyzer
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed max-w-lg">
            Our AI-powered tool helps content creators optimize their YouTube
            thumbnails by analyzing successful videos and providing actionable
            insights about fonts, colors, and layouts.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com/parther_gk"
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/parthergk"
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/parther_gk"
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-200">
            Contact Us
          </h3>
          <div className="space-y-3">
            <a
              href="mailto:support@thumbnailanalyzer.com"
              className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>thumbnailanalyzer@gmail.com</span>
            </a>
            <p className="text-neutral-600 dark:text-neutral-400">
              Available Monday to Friday
              <br />
              9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-0 md:px-10 mt-8 pt-5 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm">
            © {new Date().getFullYear()} Thumbnail Analyzer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
