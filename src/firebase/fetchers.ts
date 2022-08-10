import { getDatabase, ref, onValue } from "firebase/database";

const refNamesObject = {
  temperature: "Nodemcu/TThermok",
  year: "Nodemcu/Ano",
  month: "Nodemcu/Mes",
  day: "Nodemcu/Dia",
  hour: "Nodemcu/Hora",
  minute: "Nodemcu/Minutos",
};

const getValues = async (
  callback: (values: number[]) => void,
  refName: string,
  qty = 80
): Promise<number[]> => {
  const db = getDatabase();
  const tempRef = ref(db, refName);
  let values: number[] = [];
  onValue(tempRef, (snapshot) => {
    const data = snapshot.val();
    values = Object.values(data).slice(0, qty) as number[];
    callback(values);
  });

  return values;
};

export const getLastTemperatures = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["temperature"], quantity);
};

export const getLastYears = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["year"], quantity);
};

export const getLastMonths = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["month"], quantity);
};

export const getLastDays = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["day"], quantity);
};

export const getLastHours = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["hour"], quantity);
};

export const getLastMinutes = async (
  callback: (values: number[]) => void,
  quantity = 80
) => {
  return getValues(callback, refNamesObject["minute"], quantity);
};
