import { useEffect } from "react";
import { MainTitle } from "./Components/MainTitle";
import { getTime, db } from "./firebase";

const App = (): JSX.Element => {
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const timeResult = await getTime(db);
        console.log(timeResult);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTime();
  }, []);

  return (
    <main>
      <MainTitle />
    </main>
  );
};

export default App;
