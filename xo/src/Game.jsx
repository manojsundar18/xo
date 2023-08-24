import React, { useState, useEffect } from 'react';
import './App.css';

const X = 'X';
const O = 'O';

const Game = () => {
  const matrix = Array.from({ length: 8 }, () => Array.from({ length: 8 }, (_, colIndex) => colIndex));
  const [board, setBoard] = useState(Array(64).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    const storedBoard = JSON.parse(localStorage.getItem('ticTacToeBoard'));
    if (storedBoard) {
      setBoard(storedBoard);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeBoard', JSON.stringify(board));
  }, [board]);

  const handleClick = (rowIndex, colIndex) => {
    const index = rowIndex * 8 + colIndex;

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
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 8, 16, 24, 32, 40, 48, 56],
      [7, 15, 23, 31, 39, 47, 55, 63],
      [0, 9, 18, 27, 36, 45, 54, 63],
      [7, 14, 21, 28, 35, 42, 49, 56],
      [56, 57, 58, 59, 60, 61, 62, 63],
      [1, 9, 17, 25, 33, 41, 49, 57],
      [2, 10, 18, 26, 34, 42, 50, 58],
      [3, 11, 19, 27, 35, 43, 51, 59],
      [4, 12, 20, 28, 36, 44, 52, 60],
      [5, 13, 21, 29, 37, 45, 53, 61],
      [6, 14, 22, 30, 38, 46, 54, 62],
      [7, 15, 23, 31, 39, 47, 55, 63],
      [8, 9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30, 31],
      [32, 33, 34, 35, 36, 37, 38, 39],
      [40, 41, 42, 43, 44, 45, 46, 47],
      [48, 49, 50, 51, 52, 53, 54, 55],
      [56, 57, 58, 59, 60, 61, 62, 63],

    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e, f, g, h] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e] &&
        squares[a] === squares[f] &&
        squares[a] === squares[g] &&
        squares[a] === squares[h]
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
    <div className='game'>
      <div className='game-board'>
        <div className='status'>{status}</div>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((_, colIndex) => (
              <div key={colIndex} style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleClick(rowIndex, colIndex)}>
                  {board[rowIndex * 8 + colIndex]}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
