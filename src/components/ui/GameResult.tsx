import React from "react";
import Header from "./Header";
import Image from "next/image";

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
    <div
      className={`h-[100vh] overflow-hidden bg-[url('https://i.gifer.com/6ob.gif')] `}
    >
      <Header clock={clock} start={start} moves={moves} />

      <div className="flex flex-col items-center justify-center w-full h-full text-xl transition-opacity duration-700">
        <p>Parabéns, você conseguiu!</p>
        {clock != undefined && (
          <div>
            <p className="text-center">
              {clock > 60
                ? `Levou ${Math.floor(clock / 60)}m:${Math.floor(
                    clock % 60
                  )}s e${" "}
              ${moves} movimentos.`
                : `Levou ${clock}s e ${moves} movimentos.`}
            </p>
            <p className="text-center">Consegue fazer melhor?</p>
          </div>
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
