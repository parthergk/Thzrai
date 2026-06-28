import { AlignJustify, Book, Brush, Image, Palette } from "lucide-react";
import React, { useState } from "react";
import { useDetailItem } from "@/context/DetailItelmProvider";
interface SidebarItem {
  name: string;
  icon: React.ReactNode;
}

const LeftSideBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Font");
  const itemContext = useDetailItem();
  const items: SidebarItem[] = [
    { name: "Font", icon: <Book className="w-5 h-5" /> },
    { name: "Color", icon: <Brush className="w-5 h-5" /> },
    { name: "Image", icon: <Image className="w-5 h-5" /> },
    { name: "Background", icon: <Palette className="w-5 h-5" /> },
    { name: "Detail", icon: <AlignJustify className="w-5 h-5" /> },
  ];

  const handleClick = (itemName: string): void => {
    setActiveItem(itemName);
    itemContext.setDetailItem(itemName);
  };

  return (
    <div className="w-full h-screen max-w-16 md:max-w-xs px-2 p-4 lg:p-6 border-r">
      <div className="flex flex-col gap-3 lg:gap-6">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.name)}
            className={`flex flex-col md:flex-row items-center gap-1 lg:gap-3 p-2 rounded-sm text-left text-black dark:text-white font-medium 
            ${activeItem === item.name ? "shadow-lg bg-neutral-50 dark:shadow-neutral-950/70 dark:bg-neutral-800" : "hover:bg-neutral-50 hover:shadow-md dark:hover:bg-neutral-800/90"}`}>
            {item.icon}
            <span className="text-sm hidden sm:block">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
