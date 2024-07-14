import React, { useState, useRef, useEffect } from "react";

const CustomeDropdown = ({
  option,
  selectedCategory,
  onOptionChange, // Updated prop name
}: {
  option: any;
  selectedCategory: string;
  onOptionChange: (stationId: string) => void; // Updated prop type
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleItemClick = (_id: string, name: string) => {
    setOpenMenu(false);
    onOptionChange(name); // Call onOptionChange with the selected stationId
  };

  return (
    <div
      className="w-full relative cursor-pointer rounded"
      ref={dropdownRef}
    >
      <div
        className="h-[40px] border rounded border-gray-500 flex px-2 items-center justify-between w-full text-sm text-black bg-white"
        onClick={() => setOpenMenu(!openMenu)}
      >
        {selectedCategory}
        <img src="/assets/dropdown.svg" alt="dropDown" className="w-8" />
      </div>
      {openMenu && (
        <div className="bg-white rounded shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute w-full p-2 mt-2">
          <ul>
            {option.map((item: any) => {
              return (
                <li
                  key={item?.id}
                  className="rounded text-sm p-2 hover:bg-gradient-to-br from-[#5e42a6] via-[#b74e91] to-[#b74e91] dark:hover:text-white cursor-pointer text-black text-left"
                  onClick={() => handleItemClick(item.id, item.category)}
                >
                  {item?.category}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomeDropdown;
