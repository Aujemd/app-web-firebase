import { useEffect, useState } from "react";
import { MainTitle } from "./Components/MainTitle";
import {
  getLastTemperatures,
  getLastYears,
  getLastMonths,
  getLastDays,
  getLastMinutes,
  getLastHours,
} from "./firebase";

const formatData = (
  temperatures: number[],
  years: number[],
  month: number[],
  days: number[],
  hours: number[],
  minutes: number[]
) => {
  const datesArray = years.map((_, i) => {
    return new Date(years[i], month[i], days[i], hours[i], minutes[i], 0, 0);
  });

  return datesArray.map((date, i) => [date, temperatures[i]]);
};

const App = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [months, setMonths] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [hours, setHours] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);

  useEffect(() => {
    console.log("loading = ", loading);
  }, [loading]);

  useEffect(() => {
    const initializeDataFetcher = async () => {
      try {
        setLoading(true);
        await getLastTemperatures(setTemperatures);
        await getLastYears(setYears);
        await getLastMonths(setMonths);
        await getLastDays(setDays);
        await getLastHours(setHours);
        await getLastMinutes(setMinutes);
      } catch (e) {
        console.error(e);
      }
    };

    initializeDataFetcher();
  }, []);

  useEffect(() => {
    if (
      temperatures.length &&
      years.length &&
      months.length &&
      days.length &&
      hours.length &&
      minutes.length
    ) {
      const formattedData = formatData(
        temperatures,
        years,
        months,
        days,
        hours,
        minutes
      );
      console.log("[date, temperature] = ", formattedData);
      setLoading(false);
    }
  }, [temperatures, years, months, days, hours, minutes]);

  return (
    <main>
      <MainTitle />
    </main>
  );
};

export default App;
