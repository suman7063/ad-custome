import React, { useState } from "react";
import { ChartType } from "chart.js";
import MetricChart from "./MetricChart";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import CustomeDropdown from "./CustomeDropdown";
const RightSideContent = () => {
  const { selectedMetrics } = useSelectedMetrics();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const chartData = {
    labels: selectedMetrics,
    datasets: [
      {
        label: "Ad Metrics",
        data: selectedMetrics.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions =
    chartType === "bar"
      ? {
          indexAxis: "y",
        }
      : {};
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
        <MetricChart type={chartType} data={chartData} options={chartOptions} />
      </div>
    </>
  );
};
export default RightSideContent;
