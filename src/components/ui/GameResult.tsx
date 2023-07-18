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
        {clock != undefined && (
          <p className="text-center">
            Levou {Math.floor(clock / 60)}m:{Math.floor(clock % 60)}s segundos e{" "}
            {moves} movimentos. <p>Consegue fazer melhor?</p>
          </p>
        )}
        <button
          className="p-2 mt-2 font-medium text-white bg-green-400 border border-green-800 rounded-full shadow-lg hover:border-white shadow-slate-600 hover:shadow"
          onClick={handleNewGame}
        >
          Jogar novamente
        </button>
      </div>
    </div>
  );
};

export default GameResult;
