import { useState } from "react";
import SlotPicker from "./_components/slot-picker";

export const AppointmentPage = () => {
  return (
    <div className="flex flex-col items-center text-center">
      
      <h1>Appointment Page</h1>
      <p>This is the appointment page</p>
      <div className="w-full md:w-1/3">
        <SlotPicker />
      </div>
    </div>
  );
};

export default AppointmentPage;
