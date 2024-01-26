"use client";

import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";

interface ITimeSlot {
  start: Date;
  minutes: number;
}

interface ISlotProps {
  slot: ITimeSlot;
  capacity?: number;
  filled?: number;
  onClick: (date: Date) => void;
  selected?: Date | null;
  available?: boolean;
}

export const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const Slot = ({
  slot,
  onClick,
  selected,
  available = true,
  capacity = 1,
  filled = 0,
}: ISlotProps) => {
  const { start, minutes } = slot;
  const [isSelected, setIsSelected] = useState(false);

  // useEffect(() => {
  //   if (selected) {
  //     setIsSelected(
  //       selected.getHours() === start.getHours() &&
  //         selected.getMinutes() === start.getMinutes() &&
  //         selected.getDate() === start.getDate()
  //     );
  //   }
  //   //console.log(selected);
  // }, [selected]);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick(start);
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center h-12 w-full border border-gray-300 rounded-md cursor-pointer",
        isSelected && "bg-blue-500 text-white",
        capacity <= filled && "bg-muted text-white"
      )}
      onClick={handleClick}
    >
      <span>
        {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
        {addMinutes(start, minutes).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default Slot;
