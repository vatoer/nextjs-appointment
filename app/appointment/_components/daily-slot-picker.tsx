"use client";
import { useState } from "react";
import Slot from "./slot";
import { useSlot } from "@/hooks/use-slot";

interface ISlotPickerProps {
  dt: Date;
}

export const DailySlotPicker = ({ dt }: ISlotPickerProps) => {
  const slot = useSlot();
  const handleClick = (date: Date) => {
    slot.setSlot(date);
    //console.log(date);
  };

  //let dt = new Date();
  dt.setHours(9);
  dt.setMinutes(30);
  const slotNum = 14;

  return (
    <div>
      <div className="flex flex-col space-y-2">
        {[...Array(slotNum)].map((_, i) => {
          const start = new Date(dt.getTime() + i * 30 * 60000);
          return (
            <Slot
              key={i}
              slot={{ start, minutes: 30 }}
              onClick={handleClick}
              selected={slot.dt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailySlotPicker;
