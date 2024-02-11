import { useState, useEffect } from 'react';
import wordsDatabase from '../../dictionaries/spanishGeneral.json';
import './game.css';

const Game = () => {
    const [englishWords, setEnglishWords] = useState([]);
    const [spanishWords, setSpanishWords] = useState([]);

    const [startGame, setStartGame] = useState(false);

    useEffect(() => {
      const fetchWords= () => {
        const shuffledData = wordsDatabase.sort(() => 0.5 - Math.random());
        const selectedElements = shuffledData.slice(0, 7);
        setEnglishWords(selectedElements);
        setSpanishWords(selectedElements);
      };
  
      fetchWords();
    }, []);

    const shuffleWords = () => {
        const shuffledWords = [...englishWords].sort(() => Math.random() - 0.5);
        setEnglishWords(shuffledWords);
        setStartGame(true);
    };

    function clickWord(event) {
        event.target.style.backgroundColor = "lightGreen";
    }
  
    return (
        <div className="game-container">
            {startGame || <button className="start-game-button" onClick={shuffleWords}>Start</button>}
            {startGame && <div className="game-container">
                <div className="words-container">
                    {englishWords.map((word, index) => (
                        <button className="word-button" key={index} onClick={clickWord}>{word.english}</button>
                    ))}
                </div>
                <div className="words-container">
                    {spanishWords.map((word, index) => (
                        <button className="word-button" key={index} onClick={clickWord}>{word.spanish}</button>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Game;