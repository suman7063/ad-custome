import { useDrop, DropTargetMonitor } from "react-dnd";

import { useRef, useEffect, RefObject,useState } from "react";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import MetricChart from "./MetricChart";

interface DropAreaProps {
  onDrop: (item: { name: string }) => void;
}

const DropArea = ({ onDrop }: DropAreaProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { selectedMetrics,removeMetric } = useSelectedMetrics();
  const [{ isOver }, drop] = useDrop({
    accept: "METRIC",
    drop: (item: any) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const deleteAddedMatric = (item:string) => {
    removeMetric(item);
  };
  // Attach the drop target ref to the div ref
  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  return (
    <div
      ref={ref}
      className={`w-full p-4 border-dashed border-2 border-[#b74e91] text-[#b74e91] text-center ${
        isOver ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div>
      {isOver ? "Release to drop" : "Drag a metric here"}
      </div>
    
       {selectedMetrics.map((item)=>{return( <div className="mt-4">
        <MetricChart selectedMetrics={item}/>
      </div>)})}
    </div>
  );
};

export default DropArea;
