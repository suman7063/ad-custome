import React, { useState } from "react";
import { useSelectedMetrics } from "../contextApi/SelectedMetricsContext";
import DropArea from "./DropArea";
import DatePicker from "./DatePicker";
const RightSideContent = () => {
  const { addMetric, selectedMetrics } = useSelectedMetrics();
  const [selectDate, setSelectDate] = useState({
    from: "",
    to: "",
  });
  const[apply,setApply]=useState(false)
  const handleDrop = (item: { name: string }) => {
    addMetric(item.name);
  };
  return (
    <>
      {selectedMetrics.length > 0 && (
        <div className="flex justify-end w-full mb-4">
          <DatePicker selectDate={selectDate} setSelectDate={setSelectDate} />
          <div className="bg-gradient-to-br from-[#5e42a6] via-[#b74e91] to-[#b74e91] w-20 flex justify-center items-center rounded ml-4 cursor-pointer" onClick={()=>{setApply(!apply)}}>Apply</div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <DropArea onDrop={handleDrop} selectDate={selectDate} apply={apply} />
      </div>
    </>
  );
};
export default RightSideContent;
