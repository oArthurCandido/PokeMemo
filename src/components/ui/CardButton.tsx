import React from "react";
import CN from "classnames";
import Image from "next/image";

type CardProps = {
  handleSelect: (index: number, elem: any) => void;
  playCards: { [key: string]: string };
  selected: number;
  selected2: number;
  getIt: boolean;
  celebrate: boolean;
  index: number;
  elem: any;
};

const CardButton = ({
  handleSelect,
  playCards,
  selected,
  selected2,
  getIt,
  celebrate,
  index,
  elem,
}: CardProps) => {
  return (
    <button
      onClick={() => handleSelect(index, elem)}
      key={index}
      className={CN(
        "transition-all duration-500 h-[16%] w-[20%]  sm:text-5xl md:w-[23%] 2xl:h-32 rounded-md text-center flex items-center justify-center cursor-pointer text-4xl font-bold border border-slate-600  overflow-hidden m-1",
        {
          "dark:bg-slate-100 bg-slate-800 border border-slate-900 text-white [transform:rotateY(180deg)] shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.5)] dark:shadow-[-2px_2px_4px_2px_rgba(250,250,250,0.3)]":
            selected == index || selected2 == index,
        },
        {
          "[transform:rotateY(180deg)] bg-slate-50 dark:bg-slate-800 text-white":
            playCards[elem] && selected != index && selected2 != index,
        },
        {
          "  shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.3)]":
            !playCards[elem] && selected != index && selected2 != index,
        },
        {
          "dark:bg-green-700 bg-green-400 animate-pulse":
            (getIt && selected == index) || (getIt && selected2 == index),
        },
        {
          "animate-pulse": celebrate,
        }
      )}
    >
      {!playCards[elem] && selected != index && selected2 != index ? (
        <div
          className={CN(
            "flex items-center justify-center w-full h-full border border-slate-300 dark:border-slate-500 bg-slate-200 dark:bg-slate-900",
            { "bg-green-500": getIt }
          )}
        >
          <Image
            src={"/star.png"}
            alt="pokemon star back card"
            width={800}
            height={800}
            className="object-scale-down w-16 max-h-full "
          />
        </div>
      ) : (
        // <p className="p-2 text-black">X</p>
        <Image
          alt="pokemon image"
          width={800}
          height={800}
          blurDataURL={""}
          className="object-scale-down max-w-full max-h-full rounded-md border-slate-500 dark:border-slate-400"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${elem}.png`}
          // src={`https://rickandmortyapi.com/api/character/avatar/${elem}.jpeg`}
        />
      )}
    </button>
  );
};

export default CardButton;
