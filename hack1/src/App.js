import "./App.css";
import config from "./data/config.json";
import Wordle from "./components/Wordle";
import { useEffect, useState } from "react";

const App = () => {
  const solutions = config.solutions;
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const randomSolution =
      solutions[Math.floor(Math.random() * solutions.length)];
    setSolution(randomSolution.word);
    console.log("Solution: ", randomSolution.word);
  }, [setSolution]);

  return (
    <div className="App">
      <div className="App-container">
        <div className="App-wrapper">
          <div className="App-header">
            <header>Wordle</header>
          </div>
          <Wordle solution={solution} />
        </div>
      </div>
    </div>
  );
};

export default App;
