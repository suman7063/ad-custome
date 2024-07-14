"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import LeftSideContent from "../components/LeftSideContent";
import RightSideContent from "../components/RightSideContent";
import { SelectedMetricsProvider } from "../contextApi/SelectedMetricsContext";

const Home = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SelectedMetricsProvider>
        <div className="flex bg-[#31244F]">
          <div className="w-[250px] p-4  text-white h-screen fixed">
            <LeftSideContent />
          </div>

          <div className="w-full p-2 bg-[#f6f5f8] ml-[250px] h-screen overflow-scroll">
            <RightSideContent />
          </div>
        </div>
      </SelectedMetricsProvider>
    </DndProvider>
  );
};

export default Home;
