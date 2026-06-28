"use client"
import Header from "@/components/nav/Header";
import { DetailItemProvider } from "@/context/DetailItelmProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white flex flex-col items-center overflow-hidden">
        <Header/>
        <DetailItemProvider>
        {children}
        </DetailItemProvider>
      </main>
   );
};

export default layout;