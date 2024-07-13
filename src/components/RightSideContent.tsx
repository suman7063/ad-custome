import React, { useState } from "react";
import { ChartType } from "chart.js";
import MetricChart from "./MetricChart";

import CustomeDropdown from "./CustomeDropdown";
const RightSideContent = () => {

  const [chartType, setChartType] = useState<ChartType>("bar");
  
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ad Campaign Report Builder</h1>
        <div className="flex w-[400px]">
          <label htmlFor="chartType" className="mr-2 w-[140px]">
            Chart Type:
          </label>
          <CustomeDropdown
            option={[
              { id: "1", category: "bar" },
              { id: "2", category: "line" },
              { id: "2", category: "pie" },
            ]}
            onOptionChange={(value: any) => {
              setChartType(value);
            }}
            selectedCategory={chartType}
          />
        </div>
      </div>
      <div className="mt-4">
        {/* <div className="flex justify-between items-center mb-4">
    <div>
      {selectedMetrics.map((metric, index) => (
        <div
          key={index}
          className="p-2 mb-2 bg-gray-100 border rounded"
        >
          {metric}
        </div>
      ))}
    </div>
  </div> */}
        <MetricChart type={chartType}  />
      </div>
    </>
  );
};
export default RightSideContent;
