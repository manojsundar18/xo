import React, { useState, useEffect } from "react";
import "./App.css";
import Playerx from "./Playerx";
import Playery from "./Playery";
// import API from './API';
const X = "X";
const O = "O";
const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  // console.log(board);
  useEffect(() => {
    const storedBoard = JSON.parse(localStorage.getItem("ticTacToeBoard"));
    if (storedBoard) {
      setBoard(storedBoard);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("ticTacToeBoard", JSON.stringify(board));
  }, [board]);
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? X : O;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? X : O}`;
  return (
    <div style={{ display: "flex" }}>
      {" "}
      <div className="status">{status}</div>
      <Playerx
        handleClick={(index) => handleClick(index)}
        status={status}
        xIsNext={xIsNext}
        board={board}
      />
      <Playery
        handleClick={(index) => handleClick(index)}
        status={status}
        xIsNext={xIsNext}
        board={board}
      />
    </div>
  );
};
export default Tictactoe;
