import { useState } from "react";
import { DaysOffProvider } from "./_components/days-off-provider";
import SlotPicker from "./_components/slot-picker";

export const AppointmentPage = () => {
  const OFF_DAYS = process.env.OFF_DAYS || "0,6";
  const offDays = OFF_DAYS.split(",").map((day) => parseInt(day));

  console.log(offDays);

  return (
    <div className="flex flex-col items-center text-center">
      <h1>Appointment Page</h1>
      <p>This is the appointment page</p>
      <div className="w-full md:w-3/5 flex">
        <DaysOffProvider>
          <SlotPicker />
        </DaysOffProvider>
      </div>
    </div>
  );
};

export default AppointmentPage;
