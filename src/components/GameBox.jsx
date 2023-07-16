"use client";
import React, { useState, useEffect } from "react";

const GameBox = () => {
  const [cards, setCards] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [playCards, setPlayCards] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });
  const [selected, setSelected] = useState(-1);
  const [selected2, setSelected2] = useState(-1);
  const [elem1, setElem1] = useState(-1);
  const [elem2, setElem2] = useState(-1);
  const [win, setWin] = useState(0);
  const [winner, setWinner] = useState(false);
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let round = 0;

  const checkIsRight = (elem) => {
    setTimeout(() => {
      if (elem1 == elem) {
        console.log(`passei aqui acerto`);
        const momCards = playCards;
        momCards[elem] = true;
        setPlayCards(momCards);
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setWin(win + 1);
      } else {
        console.log(`passei aqui erro`, elem1, elem);
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
      }
    }, 700);
  };

  const handleSelect = (index, elem) => {
    console.log(`in'icio`);
    if (selected === -1) {
      console.log(`set1`);
      setSelected(index);
      setElem1(elem);
      round++;
    } else {
      console.log(`set2`);
      setSelected2(index);
      setElem2(elem);
      round = 2;
    }
    if (round == 2) {
      round = 0;
      checkIsRight(elem);
    }
  };

  const handleShuffle = () => {
    setIsLoading(true);
    const provList = [...cards];
    for (let i = provList.length - 1; i; i--) {
      const iRandom = Math.floor(Math.random() * i);
      [provList[i], provList[iRandom]] = [provList[iRandom], provList[i]];
    }
    setCards(provList);
    setTimeout(() => {
      setPlayCards({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      });
      setIsLoading(false);
      setStart(true);
    }, 2500);
  };

  const handleNewGame = () => {
    setWinner(false);
    setCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setPlayCards({
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
    });
    setElem1(-1);
    setElem2(-1);
    setSelected(-1);
    setSelected2(-1);
    setWin(0);
    setStart(false);
  };

  useEffect(() => {
    if (win == 9) {
      setWinner(true);
    }
  }, [win]);

  if (winner) {
    return (
      <>
        <p>Parabens voce venceu!</p>
        <button onClick={handleNewGame}>Jogar novamente</button>
      </>
    );
  }

  return (
    <div className="flex flex-wrap mx-2">
      {cards.map((elem, index) => (
        <div
          onClick={() => handleSelect(index, elem)}
          className={`${
            selected == index || selected2 == index ? `bg-black text-white` : ``
          } h-32 w-[15%] rounded-md text-center flex items-center justify-center cursor-pointer text-5xl font-bold border border-slate-600 m-1`}
          key={index}
        >
          <p
            className={`${
              !playCards[elem] && selected != index && selected2 != index
                ? `hidden`
                : ``
            } `}
          >
            {elem}
          </p>
        </div>
      ))}

      <div className="w-full flex justify-center">
        <button
          onClick={handleShuffle}
          className={`${isLoading ? `bg-green-500` : `bg-slate-300`} ${
            start ? `hidden` : ``
          } border w-40   border-slate-500 p-2 rounded-md`}
        >
          {" "}
          {isLoading ? `Carregando...` : `Clique para iniciar`}
        </button>
      </div>
    </div>
  );
};

export default GameBox;
