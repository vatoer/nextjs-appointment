"use client";
import { createContext, use, useContext } from "react";
import useSWR from "swr";

const DaysOffContext = createContext<number[]>([]);

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function DaysOffProvider({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useSWR("/api/days-off", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DaysOffContext.Provider value={data.offDays}>
      {children}
    </DaysOffContext.Provider>
  );
}

export function useDaysOff() {
  const context = useContext(DaysOffContext);
  if (context === undefined) {
    throw new Error("useDaysOff must be used within a DaysOffProvider");
  }
  return context;
}
