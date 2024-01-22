const fetcher = (url: string) => fetch(url).then((r) => r.json());
import useSWR from "swr";

function useDaysOff() {
  const { data, error } = useSWR("/api/days-off", fetcher);
  return {
    daysOff: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useDaysOff;
