import { useDrop } from "react-dnd";
import { useRef, useEffect } from "react";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import MetricChart from "./MetricChart";

interface DropAreaProps {
  onDrop: (item: { name: string }) => void;
  selectDate:{from:string;to:string}
  apply:boolean
}

const DropArea = ({ onDrop,selectDate,apply }: DropAreaProps) => {
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

 
  // Attach the drop target ref to the div ref
  useEffect(() => {
    if (ref.current) {
      drop(ref);
    }
  }, [drop]);

  return (
    <div
      ref={ref}
      className={`w-full p-4 border-dashed border-2   text-center ${
        isOver ? "border-lime-500" : "border-[#b74e91]"
      }`}
    >
      <div>
      {isOver ? <div className="text-xs text-lime-500">Release to drop</div> : <div className="text-[#b74e91]">Drag a metric here</div>}
      </div>
      
       {selectedMetrics.map((item)=>{return( <div className="mt-4" key={item}>
        <MetricChart selectedMetrics={item} selectDate={selectDate} apply={apply} />
      </div>)})}
    </div>
  );
};

export default DropArea;
