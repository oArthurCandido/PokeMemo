"use client";
import React, { useState, useEffect } from "react";
import CN from "classnames";
import "./microstyle.css";
import Header from "./ui/Header";
import ControlButtons from "./ui/ControlButtons";
import CardsBox from "./ui/CardsBox";
import GameResult from "./ui/GameResult";

const GameBox = () => {
  const [cards, setCards] = useState(Array<number>);
  const [cardsDictionary, setCardsDictionary] = useState<{
    [key: number]: boolean;
  }>({});
  const [selected, setSelected] = useState(-1);
  const [selected2, setSelected2] = useState(-1);
  const [elem1, setElem1] = useState(-1);
  const [elem2, setElem2] = useState(-1);
  const [points, setPoints] = useState(0);
  const [getIt, setGetIt] = useState(false);
  const [champion, setChampion] = useState(false);
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moves, setMoves] = useState(0);
  const [clock, setClock] = useState(0);
  const [counter, setCounter] = useState(3);
  const [celebrate, setCelebrate] = useState(false);

  const createDeck = () => {
    let newDeck = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 101) + 1
    );
    newDeck = Array.from(new Set(newDeck));
    while (newDeck.length < 10) {
      newDeck.sort((a, b) => a - b);
      newDeck.push(Number(newDeck[newDeck.length - 1] + 1));
    }
    let newSet: { [key: number]: boolean } = {};
    newDeck.map((elem) => (newSet[elem] = true));
    newDeck = [...newDeck, ...newDeck];
    setCardsDictionary(newSet);
    return newDeck;
  };

  useEffect(() => {
    setCards(createDeck());
  }, []);

  const checkIsRight = (elem: number, index: number) => {
    if (selected == index) {
      setSelected(-1);
      setSelected2(-1);
      return;
    }
    if (elem1 == elem) {
      setGetIt(true);
      setTimeout(() => {
        const momCards = cardsDictionary;
        momCards[elem] = true;
        setCardsDictionary(momCards);
        setSelected(-1);
        setSelected2(-1);
        setElem1(-1);
        setElem2(-1);
        setPoints(points + 1);
        setMoves((prev) => prev + 1);
        setGetIt(false);
      }, 300);
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

  const handleSelect = (index: number, elem: number) => {
    let round = 0;
    if (!start) {
      alert("Clique em Start! para começar.");
      return;
    }
    if (selected == index || selected2 != -1) {
      return;
    }
    if (cardsDictionary[elem]) {
      return;
    }
    if (selected === -1) {
      setSelected(index);
      setElem1(elem);
    } else {
      setSelected2(index);
      setElem2(elem);
      round = 2;
    }
    if (round == 2) {
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
      setCardsDictionary({});
      setIsLoading(false);
      setStart(true);
      setPoints(0);
      setMoves(0);
      setClock(0);
      setElem1(-1);
      setElem2(-1);
      setSelected(-1);
      setSelected2(-1);
    }, 3000);
  };

  const handleNewGame = () => {
    setChampion(false);
    setStart(false);
    setElem1(-1);
    setElem2(-1);
    setSelected(-1);
    setSelected2(-1);
    setPoints(0);
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
    if (points === 10) {
      setCelebrate(true);
      setTimeout(() => {
        setChampion(true);
        setStart(false);
        setCelebrate(false);
      }, 5000);
    }
  }, [points]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }
  }, [counter, isLoading]);

  if (champion === true) {
    return (
      <GameResult
        handleNewGame={handleNewGame}
        start={start}
        clock={clock}
        moves={moves}
      />
    );
  }

  return (
    <div
      className={CN(
        "box-border flex flex-col items-center justify-between h-screen ",
        { "cursor-wait": isLoading }
      )}
    >
      <Header clock={clock} start={start} moves={moves} />
      <CardsBox
        celebrate={celebrate}
        getIt={getIt}
        handleSelect={handleSelect}
        isLoading={isLoading}
        cardsDictionary={cardsDictionary}
        selected={selected}
        selected2={selected2}
        cards={cards}
      />
      <ControlButtons
        counter={counter}
        handleNewGame={handleNewGame}
        handleShuffle={handleShuffle}
        isLoading={isLoading}
        start={start}
      />
    </div>
  );
};

export default GameBox;
