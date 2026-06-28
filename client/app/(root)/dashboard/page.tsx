"use client";
import { useEffect, useState } from "react";
import { Download, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ThumbnailFetcher = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const updatedThumbnailGet = sessionStorage.getItem("img");
      const localThumbnail = updatedThumbnailGet
        ? JSON.parse(updatedThumbnailGet)
        : [];
      setThumbnails(localThumbnail);
    } catch (error) {
      console.error("Failed to parse sessionStorage data", error);
      setThumbnails([]);
    }
  }, []);

  const fetchThumbnail = (): void => {
    const trimmedUrl = videoUrl.trim();
    if (trimmedUrl.length === 0) {
      alert("Enter Youtube Video Url");
      return;
    }

    // Extract video ID from multiple valid YouTube URL formats
    const videoIdMatch = trimmedUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (!videoId) {
      setVideoUrl("");
      alert("Invalid YouTube URL");
      return;
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    if (thumbnails.includes(thumbnailUrl)) {
      setVideoUrl("");
      alert("Thumbnail Already Exists");
      return;
    }
    setThumbnails((prev) => [...prev, thumbnailUrl]);
    setVideoUrl("");
  };

  useEffect(() => {
    sessionStorage.setItem("img", JSON.stringify(thumbnails));
  }, [thumbnails]);

  const downloadThumbnail = async (thumbnailUrl: string) => {
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "downloaded-thumbnail.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const analyzeThumbnail = (thumbnailUrl: string): void => {
    const queryParams = new URLSearchParams({ thumbnailUrl }).toString();
    const url = `/analyze?${queryParams}`;
    router.push(url);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 h-screen w-full">
      <div className="w-full px-3 py-6 mt-16 flex flex-col items-center gap-5 sm:gap-10">
        <h3 className="text-neutral-800 dark:text-white text-center text-[26px] sm:text-4xl md:text-6xl font-semibold">
          YouTube Thumbnail Analyzer
        </h3>
        <div className=" w-full flex flex-col sm:flex-row items-center justify-center space-x-4 space-y-6 sm:space-y-0">
          <input
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className=" text-neutral-900 dark:text-white bg-neutral-50/20 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-600 text-sm sm:text-base w-full max-w-72 sm:max-w-xl focus:outline-none py-1 sm:py-1.5 px-2 rounded-sm"
          />
          <button
            onClick={fetchThumbnail}
            className=" bg-neutral-800 dark:bg-white dark:text-neutral-800 px-2 py-1 sm:py-2 text-sm rounded-sm hover:scale-105"
          >
            Fetch Thumbnail
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl px-4">
        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-h-[400px] overflow-y-auto scrollbar-thin pb-24">
          {thumbnails.map((thumbnailUrl, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2"
            >
              <Image
                src={thumbnailUrl}
                alt={`Thumbnail ${index}`}
                width={272}
                height={204}
                className="w-full h-auto rounded-lg"
              />

              <div className="flex justify-between w-full gap-2">
                <button
                  onClick={() => downloadThumbnail(thumbnailUrl)}
                  className="flex items-center justify-center gap-2 w-full rounded-sm shadow-lg dark:bg-neutral-800 text-neutral-800 dark:text-white px-3 py-1 sm:py-1.5 text-sm font-medium dark:hover:bg-neutral-800/60 hover:bg-neutral-100 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>

                <button
                  onClick={() => analyzeThumbnail(thumbnailUrl)}
                  className="flex items-center justify-center gap-2 w-full rounded-sm shadow-lg bg-neutral-800 dark:bg-white dark:text-neutral-800 text-white px-3 py-1 sm:py-2 text-sm font-medium hover:bg-neutral-900 dark:hover:bg-neutral-100 transition"
                >
                  <Zap className="w-4 h-4" />
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailFetcher;
