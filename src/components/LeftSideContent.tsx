import React, { useState } from "react";
import DropArea from "./DropArea";
import DraggableMetric from "./DraggableMetric";

const metrics = ["Impressions", "CTR", "CPA", "Conversions", "Cost"];
const LeftSideContent = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const handleDrop = (item: { name: string }) => {
    setSelectedMetrics((prevMetrics) => [...prevMetrics, item.name]);
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
