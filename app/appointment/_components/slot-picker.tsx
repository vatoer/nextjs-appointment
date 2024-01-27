"use client";
import DatePicker from "@/components/date-picker";
import { useDatePicker } from "@/hooks/use-date-picker";
import { useSlot } from "@/hooks/use-slot";
import { useDaysOff } from "./days-off-provider";
import WeeklySlotPicker from "./weekly-slot-picker";

const SlotPicker = () => {
  //const dtState = useDatePicker();
  //const slot = useSlot();
  const datePicked = useDatePicker((state) => state.dt); // using hooks
  const slotPicked = useSlot((state) => state.dt); // using hooks
  const offDays = useDaysOff(); // using context
  return (
    <div className="w-full">
      <span className="text-2xl font-bold">
        {slotPicked
          ? slotPicked.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          : "Pick a date"}
      </span>
      <DatePicker />
      <WeeklySlotPicker startDate={datePicked} weekendDays={offDays} />
    </div>
  );
};

export default SlotPicker;
