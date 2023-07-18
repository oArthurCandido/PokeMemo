import React from "react";

type ControlButtonsProps = {
  handleShuffle: () => void;
  handleNewGame: () => void;
  isLoading: boolean;
  start: boolean;
  counter: number;
};

const ControlButtons = ({
  handleShuffle,
  handleNewGame,
  isLoading,
  start,
  counter,
}: ControlButtonsProps) => {
  return (
    <div id="buttons" className="flex justify-center w-full mb-2 ">
      <button
        onClick={handleShuffle}
        className={`${
          isLoading
            ? `bg-green-500 border-green-800 cursor-wait`
            : `bg-blue-600 border-blue-900 `
        } ${
          start ? "hidden" : ""
        } text-white font-bold  border-2 shadow-lg w-40  hover:border-white shadow-slate-600 hover:shadow  p-2 rounded-full `}
      >
        {" "}
        {isLoading ? counter : `Start!`}
      </button>
      {start && (
        <button
          className="flex items-center justify-center w-16 p-2 font-bold text-white bg-red-700 border-2 rounded-full shadow-lg border-red-950 hover:border-white shadow-slate-600 hover:shadow"
          onClick={handleNewGame}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
