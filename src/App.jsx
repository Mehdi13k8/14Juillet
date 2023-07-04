import { useEffect, useState } from 'react'
import CardGame from './Card/CardGame/CardGame.jsx';
import QuizzGame from './CarinaQUizz/Quizz.jsx';

import './App.scss'

// import from assets folder cars.json file and store it in a variable named cars

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [inGame, setinGame] = useState(false);

  const handleStartGameClick = () => {
    setinGame(true);
  };
  const handleStopGameClick = () => {
    setinGame(false);
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleMinimizeClick = () => {
    setSelectedGame(null);
    handleStopGameClick();
  };

  useEffect(() => {

    const games = [
      {
        id: 1,
        name: 'Card Game',
        image: 'https://images.crazygames.com/basket-random/20230126094209/basket-random-cover?auto=format%2Ccompress&q=45&cs=strip&ch=DPR&w=1200&h=630&fit=crop',
        module: <CardGame 
        handleMinimizeClick={handleMinimizeClick}
         />
      },
      {
        id: 2,
        name: 'Quizz Game',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6DzzuxRz_jpMNHU1fHR5CHiU_pPrRRN3Nw&usqp=CAU',
        module: <QuizzGame
        handleMinimizeClick={handleMinimizeClick}
          />
      },
      {
        id: 3,
        name: 'Game 3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV27ukSyPdhmFfDbND0pCOgBBfuPND7eJLRcZbbt6uJFF2zRGW5cJApuffUzUoTMyNch4&usqp=CAU',
        module: null
      },
    ];
    setGames(games);
  }, []);


    if (inGame) {
      return (
      <div className="game-container">
        {/* 
         */}
         <img style={{ top: 0, right: 0, position: 'absolute', height: '10vh', opacity: 0.5 }} src={selectedGame.image} alt={selectedGame.name} />
          {selectedGame && selectedGame.module}
          
      </div>
      );
    } else {
      return (
        <div className="main-page">
          {games.map((game) => (
            <div
              key={game.id}
              className="game-square-parents"
              onClick={() => handleGameClick(game)}
            >
              <img src={game.image} alt={game.name} />
              <div className="game-name">{game.name}</div>
            </div>
          ))}
          {selectedGame && (
            <div className="game-fullscreen">
              <div className="game-container">
                <img src={selectedGame.image} alt={selectedGame.name} />
                <div className="game-name">{selectedGame.name}</div>
                <div className='buttonContainer'>
                  <button className="minimize-button" onClick={handleMinimizeClick}>
                    Home
                  </button>
                  <button className="start-button" onClick={handleStartGameClick}>
                    Start
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
}

export default App
