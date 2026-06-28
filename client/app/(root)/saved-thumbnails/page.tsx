"use client";

import { useEffect, useState } from "react";
import { Download, Zap } from "lucide-react";
import Image from "next/image";

const SavedThumbnails = () => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const response = await fetch("/api/thumbnail");
        const data = await response.json();

        if (data.message) {
          setMessage(data.message);
        }

        if (Array.isArray(data.thumbnails)) {
          setThumbnails(
            data.thumbnails.map((item: { img: string }) => item.img)
          );
        } else {
          setMessage("No thumbnails found.");
        }
      } catch (err) {
        console.error("Error fetching thumbnails:", err);
        setError("Failed to load thumbnails. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchThumbnails();
  }, []);

  const downloadThumbnail = async (thumbnailUrl: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "thumbnail.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading image:", err);
      setError("Failed to download image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white pt-20 px-4">
      <div className="text-center mb-10">
        <h3 className="text-neutral-800 dark:text-white text-center text-[26px] sm:text-4xl md:text-6xl font-semibold">
          Saved Thumbnails
        </h3>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pb-24 scrollbar-thin">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[240px] w-[430px] bg-neutral-800 rounded-sm shadow-lg"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : thumbnails.length === 0 ? (
        <p className="text-center text-neutral-500">
          {message || "No saved thumbnails found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pb-24 scrollbar-thin">
          {thumbnails.map((thumbnailUrl, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Image
                src={thumbnailUrl}
                alt={`Thumbnail ${index}`}
                width={272}
                height={204}
                className="w-full h-auto rounded-sm shadow-lg shadow-neutral-600 dark:shadow-neutral-950"
              />

              <div className="flex justify-between mt-3 w-full gap-3">
                {/* Download Button */}
                <button
                  onClick={() => downloadThumbnail(thumbnailUrl)}
                  className="flex items-center justify-center gap-2 shadow-lg w-full dark:bg-neutral-800 bg-white dark:text-white text-neutral-800 text-sm font-medium py-2 rounded-sm hover:opacity-90 hover:scale-105 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>

                {/* Analyze Button */}
                <a
                  href={`/analyze?thumbnailUrl=${encodeURIComponent(
                    thumbnailUrl
                  )}`}
                  className="flex items-center justify-center gap-2 shadow-lg w-full bg-neutral-800 dark:bg-white text-white dark:text-neutral-800 text-sm font-medium py-2 rounded-sm hover:opacity-90 hover:scale-105 transition"
                >
                  <Zap className="w-4 h-4" />
                  Analyze
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedThumbnails;
