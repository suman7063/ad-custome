import React, { useState } from "react";
import { ChartType } from "chart.js";
import MetricChart from "./MetricChart";
const RightSideContent = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
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
        <div>
          <label htmlFor="chartType" className="mr-2">
            Chart Type:
          </label>
          <select
            id="chartType"
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            className="w-[200px] h-[40px] rounded "
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
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
