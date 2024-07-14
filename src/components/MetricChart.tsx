import React, { useRef, useEffect, useState } from "react";
import { ChartType } from "chart.js";
import { Chart, registerables, ChartData } from "chart.js";
import { byChartTypeData } from "../utils/constantValue";
import ColorDropdown from "./ColorDropdown";
import CustomeDropdown from "./CustomeDropdown";
import { optionForGraph } from "../utils/constantValue";
Chart.register(...registerables);

interface ImpressionsData {
  date: string;
  totalImpressions: number;
  subParameters: {
    deviceTypes: {
      Desktop: number;
      Mobile: number;
      Tablet: number;
    };
  };
}
const MetricChart = ({selectedMetrics }: {selectedMetrics:string}) => {
  const [byChartType, setByChartType] = useState<
    "Total Impressions" | "Device Breakdown"
  >("Total Impressions");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [color, setColor] = useState([]);
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fetchImpressionsData = async () => {
    const response = await fetch(`/data/${selectedMetrics}.json`); // Fetch from the public directory
    const data: any = await response.json();
    const labels = data?.data?.map((item: any) => item.date);
    const totalImpressionsData = data?.data?.map(
      (item: any) => item?.[selectedMetrics]
    );
    const desktopData = data?.data?.map(
      (item: any) => item.subParameters.deviceTypes.Desktop
    );
    const mobileData = data?.data?.map(
      (item: any) => item.subParameters.deviceTypes.Mobile
    );
    const tabletData = data?.data?.map(
      (item: any) => item.subParameters.deviceTypes.Tablet
    );
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        let chartData = {} as any;
        if (byChartType === "Total Impressions") {
          chartData = {
            labels: labels,
            datasets: [
              {
                label: "Total Impressions",
                data: totalImpressionsData,
                borderColor: color[1],
                backgroundColor: color[0],
                fill: true,
              },
            ],
          };
        } else if (byChartType === "Device Breakdown") {
          chartData = {
            labels: labels,
            datasets: [
              {
                label: "Desktop",
                data: desktopData,
                backgroundColor: color[1],
                borderColor: color[6],
                stack: "Stack 0",
              },
              {
                label: "Mobile",
                data: mobileData,
                backgroundColor: color[2],
                borderColor: color[7],
                stack: "Stack 1",
              },
              {
                label: "Tablet",
                data: tabletData,
                backgroundColor: color[3],
                borderColor: color[8],
                stack: "Stack 2",
              },
            ],
          };
        }
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create new chart instance
        chartRef.current = new Chart(ctx, {
          type: chartType,
          data: chartData,
        });
      }
    }
  };
  useEffect(() => {
    if (selectedMetrics) fetchImpressionsData();
    else{ if (chartRef.current) {
      chartRef.current.destroy();
    }}
    // if (selectedMetrics === "CTR") fetchCTRData();
    // else{ if (chartRef.current) {
    //   chartRef.current.destroy();
    // }}
    // if (selectedMetrics === "CPA") fetchCPAData();
    // else{ if (chartRef.current) {
    //   chartRef.current.destroy();
    // }}
    // if (selectedMetrics === "Conversions") fetchConversionsData();
    // else{ if (chartRef.current) {
    //   chartRef.current.destroy();
    // }}
  }, [byChartType, selectedMetrics, chartType, color]);

  return (
    <div className="mt-8">
      <div className="flex">
      <div className="flex w-[300px] items-center justify-between">
          <label htmlFor="chartType" className="mr-1 whitespace-nowrap text-xs">
            Chart Type:
          </label>
          <CustomeDropdown
            option={optionForGraph}
            onOptionChange={(value: any) => {
              setChartType(value);
            }}
            selectedCategory={chartType}
          />
        </div>
        <div className="flex w-[300px] items-center">
          <label htmlFor="chartType" className="ml-2 mr-1  whitespace-nowrap text-xs">
            By Chart Type:
          </label>
          <CustomeDropdown
            option={byChartTypeData}
            onOptionChange={(value: any) => {
              setByChartType(value);
            }}
            selectedCategory={byChartType}
          />
        </div>
        <div className="flex w-[400px] items-center">
          <label htmlFor="chartType" className="ml-2 mr-1  whitespace-nowrap text-xs">
            Select Color:
          </label>
          <ColorDropdown setColor={setColor} />
        </div>
      </div>


      <canvas ref={canvasRef} />
    </div>
  );
};

export default MetricChart;
