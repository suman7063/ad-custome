import React, { useState } from "react";
import { ChartType } from "chart.js";
import MetricChart from "./MetricChart";

import CustomeDropdown from "./CustomeDropdown";
import {
    useSelectedMetrics,
  } from "../contextApi/SelectedMetricsContext";
import DropArea from "./DropArea";
const RightSideContent = () => {
    const { selectedMetrics ,addMetric} = useSelectedMetrics();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const handleDrop = (item: { name: string }) => {
    addMetric(item.name);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Ad Campaign Report Builder</h1> */}
        <DropArea onDrop={handleDrop}/>
      </div> 
    </>
  );
};
export default RightSideContent;
