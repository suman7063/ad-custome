import React from "react";
import DraggableMetric from "./DraggableMetric";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import {metrics} from "../utils/constantValue"
const LeftSideContent = () => {
  const { removeMetric ,selectedMetrics} = useSelectedMetrics();
  const deleteAddedMatric = (item: string) => {
    removeMetric(item);
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
      {selectedMetrics.map((item:string,index)=>{
        return(<div
          onClick={() => deleteAddedMatric(item)}
          key={index}
          className="text-xs  h-10 bg-gradient-to-br from-[#5e42a6] via-[#b74e91] to-[#b74e91] text-white rounded flex items-center justify-center px-2 mt-4"
        >
          Delete {item} Matric
        </div>)
      })}
      </div>
    </>
  );
};
export default LeftSideContent;
