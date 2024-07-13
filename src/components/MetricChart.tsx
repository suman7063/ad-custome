import { useEffect, useRef } from "react";
import {
  Chart,
  ChartType,
  ChartData,
  ChartOptions,
  registerables,
} from "chart.js";

interface MetricChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
}

Chart.register(...registerables);

const MetricChart = ({ type, data, options }: any) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current?.destroy();
      chartInstance.current = new Chart(chartRef.current, {
        type,
        data,
        options,
      });
    }
  }, [type, data, options]);

  return <canvas ref={chartRef} />;
};
export default MetricChart;
