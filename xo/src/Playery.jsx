import React from "react";

function Playery(props) {
  const { status, handleClick, board, xIsNext } = props;
  const renderSquare = (index) => {
    return (
      <button
        disabled={xIsNext ? true : false}
        className="square"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };
  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

export default Playery;
