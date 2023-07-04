import React, { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import './CardGame.scss';
import cars from '../../assets/cars.json'
import ConfettiGenerator from "canvas-confetti";

const CardGame = ({ handleMinimizeClick }) => {
  const [cards, setCards] = useState([]);
  // last clicked card
  const [lastClickedCard, setLastClickedCard] = useState(null);
  // noMatchStyling
  const [noMatchStyling, setNoMatchStyling] = useState("");

  useEffect(() => {
    // double cars array to have 2 of each car and different id
    const carsz = [
      ...cars,
      ...cars.map((car) => ({ ...car, id: car.id + cars.length })),
    ];
    // shuffle cars array
    carsz.sort(() => Math.random() - 0.5);
    // add isFlipped property to each car
    carsz.forEach((car) => (car.isFlipped = false));
    setCards(carsz);
  }, []);

  function handleCardClick(id) {
    // get number of flipped cards and not finished cards
    const liveFlippedCards = cards.filter((card) => card.isFlipped && !card.isFinished);


    // if card don't have isFinished true
    if (!cards.find((card) => card.id === id).isFinished) {
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === id) {
            if (lastClickedCard === null) {
              setLastClickedCard(card);
            }
            return { ...card, isFlipped: !card.isFlipped };
          }
          return card;
        })
      );
      
      if (liveFlippedCards && liveFlippedCards.length === 1)
      cards.forEach((card) => {
        if (card.id === id) {
          console.log("Inside ->", id, card, lastClickedCard);
          // if last clicked card is null, set last clicked card to the card that was clicked
          checkIfMatch(card);
        }
      });
    }
  }

  function checkIfMatch(card) {
    // console.log(lastClickedCard, card);
    // if last clicked card is equal to the card that was clicked
    if (lastClickedCard && lastClickedCard.name === card.name && lastClickedCard.color === card.color && lastClickedCard.brand === card.brand && lastClickedCard.group === card.group && lastClickedCard.id !== card.id) {
      // console.log('match ->', card, lastClickedCard);
      // add isFinished property to all cards that are flipped
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.isFlipped) {
            return { ...card, isFinished: true, notClickable : true };
          }
          return card;
        })
      );
      setNoMatchStyling(`match`);
      setLastClickedCard(null);
    } else if (lastClickedCard.id !== card.id) {
      setNoMatchStyling(`no-match`);
      // console.log('no match');
      // time out to flip back the cards
      setCards((prevCards) =>
      prevCards.map((Pcard) => {
        if (lastClickedCard && Pcard.id === lastClickedCard.id && !Pcard.isFinished) {
          return { ...Pcard,  isNotMatch: true, isFlipped : true, notClickable : true };
        } else if (Pcard.id === card.id && !card.isFinished) {
          return { ...Pcard,  isNotMatch: true, isFlipped : true, notClickable : true };
        }
        return { ...Pcard,  notClickable : true }
        // return Pcard;
      })
    );

  setTimeout(() => {
        // find the card in cards array and set isFlipped to false and same for last clicked card and set last clicked card to null
        setCards((prevCards) =>
        prevCards.map((card) => {
          if (lastClickedCard && card.id === lastClickedCard.id && !card.isFinished) {
            return { ...card,  isNotMatch: false, isFlipped: false };
          }
          return card;
        })
      );
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === card.id && !card.isFinished) {
            return { ...card,  isNotMatch: false, isFlipped: false };
          }
          return card;
        })
      );
  
        setNoMatchStyling(``);
        setLastClickedCard(null);
        setCards((prevCards) =>
        prevCards.map((card) => {
          if (card && !card.isFinished)
            return { ...card,  notClickable : false };
          return card;
        })
      );
      }
      , 1000);
    }
  }
  // Calculate the number of columns
  const numColumns = Math.ceil(Math.sqrt(cards.length));

  // if all cards are finished show the message "You won" with library canvas-confetti
  if (cards.length > 0 && cards.every((card) => card.isFinished)) {
    // eslint-disable-next-line no-undef
    const confettiSettings = { target: 'my-canvas' };
    // eslint-disable-next-line no-undef
    const confetti = new ConfettiGenerator(confettiSettings);
    // confetti.render();
    return (
      <>
      <button
        className="minimize-button"
        onClick={handleMinimizeClick}
      >
        Exit
      </button>
      <div className="game" style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}>
        {cards.map((card, idx) => (
          <div key={card.id + "container"}>
            <div className={`game-square ${card.isNotMatch ? "no-match" : ""} ${card.isFinished ? "finished-card" : "" } ${card.notClickable ? 'unclickable' : ''}`}>
              <Cards
                key={card.id}
                id={card.id}
                style={{border: '2px solid red !important', backgroundColor: 'red'}}
                keyChildren={card.id}
                value={card.value}
                image={card.image}
                isFlipped={card.isFlipped}
                isFinished={false}
                isNotMatch={false}
                // isNotMatch={card.isNotMatch}
                // notClickable={card.notClickable}
                handleCardClick={handleCardClick}
              />
            </div>
          </div>
        ))}
      </div>
      <canvas id="my-canvas" style={{ position: 'absolute', top: '0', left: '0', zIndex: '1', opacity: '0.5' }}></canvas>
      <div className="game-over">
        <h1>You won</h1>
      </div>
      </>
    );
  }

  return (
    <>
      <button
        className="minimize-button"
        onClick={handleMinimizeClick}
      >
        Exit
      </button>
      <div className="game" style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}>
        {cards.map((card, idx) => (
          <div key={card.id + "container"}>
            <div className={`game-square ${card.isNotMatch ? "no-match" : ""} ${card.isFinished ? "finished-card" : "" } ${card.notClickable ? 'unclickable' : ''}`}>
              <Cards
                key={card.id}
                id={card.id}
                style={{border: '2px solid red !important', backgroundColor: 'red'}}
                keyChildren={card.id}
                value={card.value}
                image={card.image}
                isFlipped={card.isFlipped}
                isFinished={false}
                isNotMatch={false}
                // notClickable={false}
                onClick={() => handleCardClick(card.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardGame;
