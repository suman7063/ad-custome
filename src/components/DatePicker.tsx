import React from "react";

const DatePicker = ({selectDate,setSelectDate}:{selectDate:any;setSelectDate:any}) => {
  return (
    <div id="date-range-picker" date-rangepicker className="flex items-center">
      <label className="mx-4 text-gray-500" htmlFor="start">
        Start
      </label>
      <input
        name="start"
        type="date"
        className="border border-[#31244F] w-1/2 h-[40px] p-2 rounded text-black"
        placeholder="Select date start"
        onChange={(e)=>{setSelectDate({...selectDate,from:e.target.value})}}
      />
      <label className="mx-4 text-gray-500" htmlFor="end">
        To
      </label>

      <input
        name="end"
        type="date"
        className="border border-[#31244F] w-1/2 h-[40px] p-2 rounded text-black"
        placeholder="Select date end"
        onChange={(e)=>{setSelectDate({...selectDate,to:e.target.value})}}
      />
    </div>
  );
};

export default DatePicker;
