import React from "react";
import CN from "classnames";

const Header = ({
  start,
  clock,
  moves,
}: {
  start: boolean;
  clock: number | undefined;
  moves: number | undefined;
}) => {
  return (
    <div className="flex items-center justify-around w-full max-w-2xl m-auto mt-2 h-fit ">
      <h1 className="text-3xl font-extrabold text-yellow-500 sm:text-4xl drop-shadow-2xl poke">
        Poke<span className="memo">Memo</span>
      </h1>
      <div className="flex justify-between w-40 mr-2 ">
        <p
          className={CN(
            "flex flex-col items-center justify-center w-10 h-10 mr-1 text-lg font-semibold text-white bg-green-500 border-4 border-double rounded-full border-slate-50",
            { "bg-yellow-400": moves && moves > 20 },
            { "bg-red-500": moves && moves > 30 }
          )}
        >
          <span>{moves}</span>
        </p>
        <p className="flex items-center justify-center p-2 text-sm font-semibold border rounded-full border-slate-400">
          Tempo:{" "}
          <span className="w-10">
            {clock == 0 || clock == undefined
              ? ` ${Math.floor(0 / 60)
                  .toString()
                  .padStart(2, "0")}:${(0 % 60).toString().padStart(2, "0")}`
              : ` ${Math.floor(clock / 60)
                  .toString()
                  .padStart(2, "0")}:${(clock % 60)
                  .toString()
                  .padStart(2, "0")}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
