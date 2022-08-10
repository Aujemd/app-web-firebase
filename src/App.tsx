import { useEffect } from "react";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const temperatures = await getLastTemperatures();
        const years = await getLastYears();
        const months = await getLastMonths();
        const days = await getLastDays();
        const hours = await getLastHours();
        const minutes = await getLastMinutes();

        const formattedData = formatData(
          temperatures,
          years,
          months,
          days,
          hours,
          minutes
        );

        console.log("[date, temperature] = ", formattedData);

        return formattedData;
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <MainTitle />
    </main>
  );
};

export default App;
