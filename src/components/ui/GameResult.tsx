import React from "react";
import Header from "./Header";

const GameResult = ({
  start,
  clock,
  moves,
  handleNewGame,
}: {
  start: boolean;
  clock?: number;
  moves?: number;
  handleNewGame: () => void;
}) => {
  return (
    <div className="h-screen">
      <Header clock={clock} start={start} moves={moves} />

      <div className="flex flex-col items-center justify-center w-full h-full text-xl transition-opacity duration-700">
        <p>Parabéns, você conseguiu!</p>
        <p>
          Foram {clock} segundos e {moves} movimentos.
        </p>
        <button
          className="p-2 mt-2 bg-green-300 border border-green-800 rounded-md text-slate-900"
          onClick={handleNewGame}
        >
          Jogar novamente
        </button>
      </div>
    </div>
  );
};

export default GameResult;
