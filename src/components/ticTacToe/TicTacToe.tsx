import React, { useEffect, useState } from "react";
import "./styles.css";

function Square(props: { value: any; onClick: () => void }) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXturn] = useState(true);
  const [status, setStatus] = useState("");

  function getWinner(squares: any): any {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];
      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }

  function handleClick(currentSquare: any): any {
    let copySquares = [...squares];
    if (getWinner(copySquares) || copySquares[currentSquare]) return;
    copySquares[currentSquare] = isXTurn ? "X" : "O";
    setIsXturn(!isXTurn);
    setSquares(copySquares);
    console.log(squares);
  }
  function restartHandle() {
    setSquares(Array(9).fill(""));
    setIsXturn(true);
    setStatus("");
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every((el) => el !== "")) {
      setStatus("This is a draw! Please restart");
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}. Please restart`);
    } else {
      setStatus(`Next player is: ${isXTurn ? "X" : "O"} `);
    }
  }, [squares, isXTurn]);

  return (
    <div className="tic-tac-toe-container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <h1>{status}</h1>
      <button onClick={restartHandle}>Restart</button>
    </div>
  );
}
