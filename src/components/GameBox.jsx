"use client";
import Image from "next/image";
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
  const [moves, setMoves] = useState(0);
  const [clock, setClock] = useState(0);
  const [counter, setCounter] = useState(3);

  let round = 0;

  const checkIsRight = (elem, index) => {
    if (selected == index) {
      setSelected(-1);
      setSelected2(-1);
      return;
    }
    setTimeout(() => {
      if (elem1 == elem) {
        const momCards = playCards;
        momCards[elem] = true;
        setPlayCards(momCards);
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setWin(win + 1);
        setMoves((prev) => prev + 1);
      } else {
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setMoves((prev) => prev + 1);
      }
    }, 600);
  };

  const handleSelect = (index, elem) => {
    if (selected === -1) {
      setSelected(index);
      setElem1(elem);
      round++;
    } else {
      setSelected2(index);
      setElem2(elem);
      round = 2;
    }
    if (round == 2) {
      round = 0;
      checkIsRight(elem, index);
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
      setWin(0);
      setMoves(0);
      setClock(0);
      setElem1(-1);
      setElem2(-1);
      setSelected(-1);
      setSelected2(-1);
    }, 3000);
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
    setMoves(0);
    setClock(0);
    setCounter(3);
  };

  useEffect(() => {
    if (win == 9) {
      setWinner(true);
      setStart(false);
    }
    setTimeout(() => {
      if (start) {
        setClock((prev) => prev + 1);
      }
    }, 200);
  }, [win, clock, start, counter]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
  }, [counter, isLoading]);

  if (winner) {
    return (
      <>
        <p>Parabens voce venceu!</p>
        <p>
          Lances:{moves} em {Math.floor(clock / 10)} segundos.
        </p>
        <button onClick={handleNewGame}>Jogar novamente</button>
      </>
    );
  }

  return (
    <div className="flex flex-col justify-evenly h-screen ">
      <div className=" flex justify-between mt-2">
        <div>Don`t panic</div>
        <div className="mr-2 w-36 flex justify-between ">
          <p className="flex flex-col items-center justify-center border border-slate-400 p-2 rounded-md">
            Moves <span>{moves}</span>
          </p>{" "}
          <p className="flex flex-col items-center justify-center border border-slate-400 p-2 rounded-md">
            Clock <span>{start ? Math.floor(clock / 10) : "0"}s</span>
          </p>
        </div>
      </div>
      <div className=" flex flex-wrap mx-2 items-center justify-evenly">
        {cards.map((elem, index) => (
          <button
            onClick={() => handleSelect(index, elem)}
            className={`${
              selected == index || selected2 == index
                ? `bg-slate-900 border border-slate-900 text-white [transform:rotateY(180deg)] shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.5)]`
                : ``
            }  ${
              playCards[elem] && selected != index && selected2 != index
                ? "[transform:rotateY(180deg)] bg-slate-800 text-white "
                : ""
            } 
            ${
              !playCards[elem] && selected != index && selected2 != index
                ? "    shadow-[-2px_2px_4px_2px_rgba(0,0,0,0.3)]"
                : ""
            } 
            transition-all   duration-500 h-32 w-[14%]  sm:text-5xl sm:w-[15%] rounded-md text-center flex items-center justify-center cursor-pointer text-4xl font-bold border border-slate-600 m-1 overflow-hidden object-scale-down`}
            key={index}
          >
            <p
              className={`${
                !playCards[elem] && selected != index && selected2 != index
                  ? ``
                  : `[transform:rotateY(180deg)]`
              } `}
            >
              {!playCards[elem] && selected != index && selected2 != index ? (
                `X`
              ) : (
                <Image
                  alt="pokemon image"
                  width={100}
                  height={100}
                  className="w-full h-full"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${elem}.png`}
                />
              )}
            </p>
          </button>
        ))}
      </div>
      <div id="buttons" className=" w-full flex justify-center">
        <button
          onClick={handleShuffle}
          className={`${isLoading ? `bg-green-500` : `bg-slate-300`} ${
            start ? "hidden" : ""
          } border w-40   border-slate-500 p-2 rounded-md`}
        >
          {" "}
          {isLoading ? counter : `Start!`}
        </button>
        {start && (
          <button
            className="border w-40 bg-red-400  border-slate-500 p-2 rounded-md"
            onClick={handleNewGame}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBox;
