"use client";
import { useSlot } from "@/hooks/use-slot";
import { useState } from "react";
import Slot from "./slot";

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

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 gap-2">
        {[...Array(slotNum)].map((_, i) => {
          // TODO : setting start time, duration, capacity, filled from database
          const start = new Date(dt.getTime() + i * 30 * 60000);
          // const capacity = getRandomInt(5);
          // const filled = getRandomInt(capacity);
          return (
            <Slot
              key={i}
              slot={{ start, minutes: 30 }}
              onClick={handleClick}
              selected={slot.dt}
              // capacity={capacity}
              // filled={filled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailySlotPicker;
