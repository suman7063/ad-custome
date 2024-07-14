import React, { useRef, useEffect, useState } from "react";
import { ChartType } from "chart.js";
import { Chart, registerables, ChartData } from "chart.js";
import { byChartTypeData } from "../utils/constantValue";
import ColorDropdown from "./ColorDropdown";
import CustomeDropdown from "./CustomeDropdown";
import { optionForGraph } from "../utils/constantValue";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import { metrics } from "../utils/constantValue";
Chart.register(...registerables);

const MetricChart = ({
  selectedMetrics,
  selectDate,
  apply,
}: {
  selectedMetrics: string;
  selectDate: { from: string; to: string };
  apply: boolean;
}) => {
  const { removeMetric } = useSelectedMetrics();
  const [byChartType, setByChartType] = useState<
    "Total" | "Device Breakdown"
  >("Total");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [color, setColor] = useState([]);
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const deleteAddedMatric = (item: string) => {
    removeMetric(item);
  };

  const fetchImpressionsData = async () => {
    const response = await fetch(`/data/CTR.json`); // Fetch from the public directory
    const data: any = await response.json();
    let filteredData = data;

    if (selectDate.from && selectDate.to) {
      const fromDate = new Date(selectDate.from);
      const toDate = new Date(selectDate.to);
    
      filteredData = data.filter((item: any) => {
        const itemDate = new Date(item.date);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }
    const labels = filteredData?.map((item: any) => item.date);
    let totalImpressionsData,
      desktopData,
      mobileData,
      tabletData = [];
    if (selectedMetrics === metrics[0]) {
      totalImpressionsData = filteredData?.map(
        (item: any) => item?.total.impressions
      );
      desktopData = filteredData?.map(
        (item: any) => item.deviceBreakdown.desktop?.impressions
      );
      mobileData = filteredData?.map(
        (item: any) => item.deviceBreakdown.mobile?.impressions
      );
      tabletData = filteredData?.map(
        (item: any) => item.deviceBreakdown.tablet?.impressions
      );
    }
    if (selectedMetrics === metrics[1]) {
      totalImpressionsData = filteredData?.map(
        (item: any) => item?.total?.CTR
      );
      desktopData = filteredData?.map(
        (item: any) => item.deviceBreakdown.desktop?.CTR
      );
      mobileData = filteredData?.map(
        (item: any) => item.deviceBreakdown.mobile?.CTR
      );
      tabletData = filteredData?.map(
        (item: any) => item.deviceBreakdown.tablet?.CTR
      );
    }
    if (selectedMetrics === metrics[2]) {
      totalImpressionsData = filteredData?.map(
        (item: any) => item?.total?.CPA
      );
      desktopData = filteredData?.map(
        (item: any) => item.deviceBreakdown.desktop?.CPA
      );
      mobileData = filteredData?.map(
        (item: any) => item.deviceBreakdown.mobile?.CPA
      );
      tabletData = filteredData?.map(
        (item: any) => item.deviceBreakdown.tablet?.CPA
      );
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        let chartData = {} as any;
        if (byChartType === "Total") {
          chartData = {
            labels: labels,
            datasets: [
              {
                label: "Total",
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
    else {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    }
  }, [byChartType, selectedMetrics, chartType, color, apply]);
  return (
    <div className="mt-8">
      <h2 className="text-xl text-lime-500 text-left mb-4">{selectedMetrics}</h2>
      <div className="flex">
        <div className="flex  min-w-[220px] items-center justify-between">
          <label htmlFor="chartType" className="mr-1 whitespace-nowrap text-xs text-gray-500 ">
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
          <label
            htmlFor="color"
            className="ml-2 mr-1  whitespace-nowrap text-xs text-gray-500 "
          >
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
          <label
            htmlFor="color"
            className="ml-2 mr-1  whitespace-nowrap text-xs text-gray-500 "
          >
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
