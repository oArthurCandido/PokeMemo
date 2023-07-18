"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CN from "classnames";
import BackCard from "./Shapes/BackCard";
import "./microstyle.css";
import CardButton from "@/components/ui/CardButton";

const GameBox = () => {
  const [cards, setCards] = useState();
  const [playCards, setPlayCards] = useState({});
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
  const [getIt, setGetIt] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  let round = 0;

  const createDeck = () => {
    let newDeck = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 500)
    );
    let newSet = {};
    newDeck.map((elem) => (newSet[elem] = true));
    newDeck = [...newDeck, ...newDeck];
    setCards(newDeck);
    setPlayCards(newSet);
    return newDeck;
  };

  useEffect(() => {
    setCards(createDeck());
  }, []);

  const checkIsRight = (elem, index) => {
    if (selected == index) {
      setSelected(-1);
      setSelected2(-1);
      return;
    }
    if (elem1 == elem) {
      setGetIt(true);
      setTimeout(() => {
        const momCards = playCards;
        momCards[elem] = true;
        setPlayCards(momCards);
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setWin(win + 1);
        setMoves((prev) => prev + 1);
        setGetIt(false);
      }, 600);
    } else {
      setTimeout(() => {
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setMoves((prev) => prev + 1);
      }, 800);
    }
  };

  const handleSelect = (index, elem) => {
    if (!start) {
      alert("Clique em Start! para começar.");
      return;
    }
    if (playCards[elem]) {
      return;
    }
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
      setPlayCards({});
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
    setElem1(-1);
    setElem2(-1);
    setSelected(-1);
    setSelected2(-1);
    setWin(0);
    setStart(false);
    setMoves(0);
    setClock(0);
    setCounter(3);
    setCards(createDeck());
  };

  useEffect(() => {
    setTimeout(() => {
      if (start && !celebrate) {
        setClock((prev) => prev + 1);
      }
    }, 1000);
  }, [start, clock, celebrate]);

  useEffect(() => {
    if (win === 10) {
      setCelebrate(true);
      setTimeout(() => {
        setWinner(true);
        setStart(false);
        setCelebrate(false);
      }, 5000);
    }
  }, [win]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
  }, [counter, isLoading]);

  if (winner === true) {
    return (
      <div className="h-screen">
        <div className="flex justify-around w-full max-w-2xl m-auto mt-2 h-fit ">
          <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow-2xl poke">
            Poke<span className="memo">Memo</span>
          </h1>
          <div className="flex justify-between mr-2 w-36 ">
            <p className="flex items-center justify-center p-2 text-sm font-semibold border rounded-md border-slate-400">
              {moves}
            </p>
            <p className="flex items-center justify-center p-2 text-sm font-semibold border rounded-md border-slate-400">
              Tempo:{" "}
              <span className="w-10">
                {start
                  ? ` ${Math.floor(clock / 60)
                      .toString()
                      .padStart(2, "0")}:${(clock % 60)
                      .toString()
                      .padStart(2, "0")}`
                  : "00:00"}
              </span>
            </p>
          </div>
        </div>

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
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex justify-around w-full max-w-2xl m-auto mt-2 h-fit ">
        <h1 className="text-4xl font-extrabold text-yellow-500 drop-shadow-2xl poke">
          Poke<span className="memo">Memo</span>
        </h1>
        <div className="flex justify-between mr-2 w-36 ">
          <p className="flex flex-col items-center justify-center p-2 text-sm font-semibold border rounded-md border-slate-400">
            <span>{moves}</span>
          </p>
          <p className="flex items-center justify-center p-2 text-sm font-semibold border rounded-md border-slate-400">
            Tempo:{" "}
            <span className="w-10">
              {start
                ? ` ${Math.floor(clock / 60)
                    .toString()
                    .padStart(2, "0")}:${(clock % 60)
                    .toString()
                    .padStart(2, "0")}`
                : "00:00"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center h-full mx-auto sm:max-w-3xl 2xl:max-w-5xl justify-evenly">
        {cards?.map((elem, index) => (
          <CardButton
            elem={elem}
            index={index}
            celebrate={celebrate}
            getIt={getIt}
            selected={selected}
            selected2={selected2}
            handleSelect={handleSelect}
            playCards={playCards}
            key={index}
          />
        ))}
      </div>
      <div id="buttons" className="flex justify-center w-full ">
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
            className="w-40 p-2 bg-red-400 border rounded-md border-slate-500"
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
