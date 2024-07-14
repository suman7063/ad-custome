import React, { useState, useRef, useEffect } from "react";
import {combinedColor} from "../utils/constantValue"
const ColorDropdown = ({setColor }: { setColor:any }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleItemClick = (color:string[]) => {
    setOpenMenu(false);
    setColor(color)
  };

  return (
    <div className="w-full relative cursor-pointer rounded" ref={dropdownRef}>
      <div
        className="h-[40px] border rounded border-gray-500 flex px-2 items-center justify-between w-full text-sm text-black bg-white"
        onClick={() => setOpenMenu(!openMenu)}
      >
        Select Color
        <img src="/assets/dropdown.svg" alt="dropDown" className="w-8" />
      </div>
      {openMenu && (
        <div className="bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute p-2 mt-2">
          <ul>
            {combinedColor.map((color,index)=>{
                return(  <><li className="flex items-center] items-center" key={index} onClick={()=>handleItemClick(color)}>
                {/* <label className=" text-black whitespace-nowrap text-xs mr-2">Color {index+1}</label> */}
                <div className="rounded text-sm flex items-center">
                {color.map((item,itemIndex)=>{
                    return(<div key={itemIndex} className="w-6 h-6" style={{backgroundColor:item}}/>)
                })}
                </div>
              </li>
              <hr className="my-2"/>
              </>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorDropdown;
