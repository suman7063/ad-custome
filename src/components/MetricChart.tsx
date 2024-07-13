import React, {useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";

Chart.register(...registerables);

const MetricChart = ({type}:any) => {
  const { selectedMetrics } = useSelectedMetrics();
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#5e42a6");
        gradient.addColorStop(1, "#b74e91");

        const chartData = {
          labels: selectedMetrics,
          datasets: [
            {
              label: "Ad Metrics",
              data: selectedMetrics.map(() => Math.floor(Math.random() * 100)),
              backgroundColor: gradient,
              borderColor: "[#908f90]",
              borderWidth: 1,
            },
          ],
        };
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create new chart instance
        chartRef.current = new Chart(ctx, {
          type: type,
          data: chartData,
        });
      }
    }
  }, [type, selectedMetrics]);

  return (
      <div className="mt-4">
        <canvas ref={canvasRef} />
      </div>
  );
};

export default MetricChart;
