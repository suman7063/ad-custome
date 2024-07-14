"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import LeftSideContent from "../components/LeftSideContent";
import RightSideContent from "../components/RightSideContent";
import {
  SelectedMetricsProvider,
  useSelectedMetrics,
} from "../contextApi/SelectedMetricsContext";

const Home = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <SelectedMetricsProvider>
        <div className="flex bg-[#31244F]">
          <div className="w-1/4 p-4  text-white h-screen">
            <LeftSideContent />
          </div>
          
              <div className="w-3/4 p-4 bg-[#f6f5f8]" >
                <RightSideContent/>
              </div>
          
        </div>
      </SelectedMetricsProvider>
    </DndProvider>
  );
};

export default Home;
