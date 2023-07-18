import React from "react";
import CardButton from "./CardButton";

type CardsProps = {
  handleSelect: (index: number, elem: any) => void;
  cardsDictionary: { [key: number]: boolean };
  selected: number;
  selected2: number;
  getIt: boolean;
  celebrate: boolean;
  isLoading: boolean;
  cards: Array<number>;
};

const CardsBox = ({
  handleSelect,
  cardsDictionary,
  selected,
  selected2,
  getIt,
  celebrate,
  isLoading,
  cards,
}: CardsProps) => {
  return (
    <div className="flex flex-wrap items-center h-full mx-auto sm:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl justify-evenly">
      {cards?.map((elem: number, index: number) => (
        <CardButton
          elem={elem}
          index={index}
          celebrate={celebrate}
          getIt={getIt}
          selected={selected}
          selected2={selected2}
          handleSelect={handleSelect}
          cardsDictionary={cardsDictionary}
          key={index}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default CardsBox;
