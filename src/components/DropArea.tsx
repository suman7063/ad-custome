import { useDrop, DropTargetMonitor } from "react-dnd";
import { useRef, useEffect, RefObject } from "react";

interface DropAreaProps {
  onDrop: (item: { name: string }) => void;
}

const DropArea = ({ onDrop }: DropAreaProps) => {
  const ref = useRef<HTMLDivElement>(null);

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
      className={`w-full h-64 p-4 border-dashed border-2 ${
        isOver ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {isOver ? "Release to drop" : "Drag a metric here"}
    </div>
  );
};

export default DropArea;
