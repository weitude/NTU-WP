import "./css/Board.css";
import Row from "./Row";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
  return (
    <div className="Board-container">
      {guesses.map((guess, rowIdx) => (
        <div
          className={"Row-container"}
          id={"row_" + rowIdx}
          key={"row_" + rowIdx}
        >
          {rowIdx === turn ? (
            <CurRow curGuess={curGuess} rowIdx={rowIdx} />
          ) : (
            <Row guess={guess} rowIdx={rowIdx} />
          )}
        </div>
      ))}
    </div>
  );
};
export default Board;
