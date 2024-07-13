import { useDrag } from "react-dnd";
import { useRef, useEffect } from "react";

// Define the item type for drag-and-drop
interface DraggableMetricProps {
  name: string;
}

// Define the type of item being dragged
interface DragItem {
  type: string;
  name: string;
}

const DraggableMetric = ({ name }: DraggableMetricProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Use useDrag to make the component draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "METRIC",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Connect the drag handler to the ref
  useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [drag]);

  return (
    <div
      ref={ref}
      className={`p-2 mb-2 border border-[#908f90] rounded ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: "move" }}
    >
      {name}
    </div>
  );
};

export default DraggableMetric;
