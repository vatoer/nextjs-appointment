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
  // TODO : setting start time, duration, capacity, filled from database
  dt.setHours(9); // set start time
  dt.setMinutes(30); // set start time
  const slotNum = 14; // set slot number
  const slotDuration = 30; // set slot duration in minutes

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 gap-2">
        {[...Array(slotNum)].map((_, i) => {
          const start = new Date(dt.getTime() + i * slotDuration * 60000);
          // const capacity = getRandomInt(5);
          // const filled = getRandomInt(capacity);
          return (
            <Slot
              key={i}
              slot={{ start, minutes: slotDuration }}
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
