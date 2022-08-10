import { getDatabase, ref, onValue } from "firebase/database";

const refNamesObject = {
  temperature: "Nodemcu/TThermok",
  year: "Nodemcu/Ano",
  month: "Nodemcu/Mes",
  day: "Nodemcu/Dia",
  hour: "Nodemcu/Hora",
  minute: "Nodemcu/Minutos",
};

const getValues = async (refName: string, qty = 80): Promise<number[]> => {
  const db = getDatabase();
  const tempRef = ref(db, refName);
  let values: number[] = [];
  onValue(tempRef, (snapshot) => {
    const data = snapshot.val();
    values = Object.values(data).slice(0, qty) as number[];
  });

  return values;
};

export const getLastTemperatures = async (quantity = 80) => {
  return getValues(refNamesObject["temperature"], quantity);
};

export const getLastYears = async (quantity = 80) => {
  return getValues(refNamesObject["year"], quantity);
};

export const getLastMonths = async (quantity = 80) => {
  return getValues(refNamesObject["month"], quantity);
};

export const getLastDays = async (quantity = 80) => {
  return getValues(refNamesObject["day"], quantity);
};

export const getLastHours = async (quantity = 80) => {
  return getValues(refNamesObject["hour"], quantity);
};

export const getLastMinutes = async (quantity = 80) => {
  return getValues(refNamesObject["minute"], quantity);
};
