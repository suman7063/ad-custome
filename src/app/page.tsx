"use client";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import LeftSideContent from "../components/LeftSideContent";
import RightSideContent from "@/components/RightSideContent";

const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex bg-[#31244F]">
        <div className="w-1/4 p-4  text-white h-screen">
          <LeftSideContent />
        </div>
        <div className="w-3/4 p-4 bg-[#5E42A5]">
          <RightSideContent />
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
