import React, { useState } from "react";
import DropArea from "./DropArea";
import DraggableMetric from "./DraggableMetric";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
const metrics = ["Impressions", "CTR", "CPA", "Conversions", "Cost"];
const LeftSideContent = () => {
  const { addMetric } = useSelectedMetrics();
  const handleDrop = (item: { name: string }) => {
    addMetric(item.name);
  };
  return (
    <>
      <aside>
        <h2 className="text-xl font-bold mb-2">Metrics</h2>
        {metrics.map((metric) => (
          <DraggableMetric key={metric} name={metric} />
        ))}
      </aside>
      <div className="mt-16">
        <DropArea onDrop={handleDrop} />
      </div>
    </>
  );
};
export default LeftSideContent;
