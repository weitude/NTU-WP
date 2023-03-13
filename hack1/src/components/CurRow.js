import "./css/Row.css";

const CurRow = ({ curGuess, rowIdx }) => {
  let letters = curGuess.split("");
  const state = ["", "filled", "filled", "filled", "filled", "filled"];
  const len = letters.length;

  return (
    <div className="Row-wrapper current">
      <div
        id={rowIdx + "-0"}
        key={rowIdx + "-0"}
        className={"Row-wordbox " + state[len]}
      >
        {letters[0]}
      </div>
      <div
        id={rowIdx + "-1"}
        key={rowIdx + "-1"}
        className={"Row-wordbox " + state[len - 1]}
      >
        {letters[1]}
      </div>
      <div
        id={rowIdx + "-2"}
        key={rowIdx + "-2"}
        className={"Row-wordbox " + state[len - 2]}
      >
        {letters[2]}
      </div>
      <div
        id={rowIdx + "-3"}
        key={rowIdx + "-3"}
        className={"Row-wordbox " + state[len - 3]}
      >
        {letters[3]}
      </div>
      <div
        id={rowIdx + "-4"}
        key={rowIdx + "-4"}
        className={"Row-wordbox " + state[len - 4]}
      >
        {letters[4]}
      </div>
    </div>
  );
};

export default CurRow;
