"use client";

import { cn } from "@/lib/utils";
import { use, useEffect, useState } from "react";

interface ITimeSlot {
  start: Date;
  minutes: number;
}

interface ISlotProps {
  slot: ITimeSlot;
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
}: ISlotProps) => {
  const { start, minutes } = slot;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      setIsSelected(
        selected.getHours() === start.getHours() &&
          selected.getMinutes() === start.getMinutes() &&
          selected.getDate() === start.getDate()
      );
    }
    console.log(selected);
  }, [selected]);

  const handleClick = () => {
    onClick(start);
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center h-12 w-24 border border-gray-300 rounded-md cursor-pointer",
        isSelected && "bg-blue-500 text-white"
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
