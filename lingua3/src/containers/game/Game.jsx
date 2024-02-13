import { useState, useEffect, useRef } from 'react';
import wordsDatabase from '../../dictionaries/spanishGeneral.json';
import './game.css';

const Game = () => {
    const [englishWords, setEnglishWords] = useState([]);
    const [spanishWords, setSpanishWords] = useState([]);

    const [startGame, setStartGame] = useState(false);

    const [firstClick, setFirstClick] = useState(true);
    const [firstClickedWord, setFirstClickedWord] = useState("");

    const englishButtonsRefs = useRef([]);
    const spanishButtonsRefs = useRef([]);

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
        if (firstClick) {
            setFirstClick(false);
            event.target.style.backgroundColor = "lightGreen";
            setFirstClickedWord(event.target.value);
        }

        if (!firstClick) {
            if (englishWords.some(word => word.english === firstClickedWord)) {

                let solution = "";
                spanishWords.forEach(word => {
                    if(word.english === firstClickedWord) {
                        solution = word.spanish;
                    } 
                });

                if(englishWords.some(word => word.english === event.target.value)) {
                    englishButtonsRefs.current.forEach(buttonRef => {
                        buttonRef.style.backgroundColor = "white";
                    });

                    setFirstClickedWord(event.target.value);
                    event.target.style.backgroundColor = "lightGreen";

                } else {   
                    if(event.target.value === solution) {
                        event.target.style.backgroundColor = "lightGreen";
                    } else {
                        event.target.style.backgroundColor = "red";
                        englishButtonsRefs.current.forEach(buttonRef => {
                            if (buttonRef.value === firstClickedWord) {
                                buttonRef.style.backgroundColor = "red";
                            }
                        });
                    }

                    setFirstClickedWord("");
                    setFirstClick(true);
                }
            } else {
                let solution = "";
                englishWords.forEach(word => {
                    if(word.spanish === firstClickedWord) {
                        solution = word.english;
                    }
                });

                if(spanishWords.some(word => word.spanish === event.target.value)) {
                    spanishButtonsRefs.current.forEach(buttonRef => {
                        buttonRef.style.backgroundColor = "white";
                    });

                    setFirstClickedWord(event.target.value);
                    event.target.style.backgroundColor = "lightGreen";

                } else {
                    if(event.target.value === solution) {
                        event.target.style.backgroundColor = "lightGreen";
                    } else {
                        event.target.style.backgroundColor = "red";
                        spanishButtonsRefs.current.forEach(buttonRef => {
                            if (buttonRef.value === firstClickedWord) {
                                buttonRef.style.backgroundColor = "red";
                            }
                        });
                    }

                    setFirstClickedWord("");
                    setFirstClick(true);
                }
            }
        }
    }
  
    return (
        <div className="game-container">
            {startGame || <button className="start-game-button" onClick={shuffleWords}>Start</button>}
            {startGame && <div className="game-container">
                <div className="words-container">
                    {englishWords.map((word, index) => (
                        <button className="word-button" key={index} value={word.english} onClick={clickWord} ref={buttonRef => (englishButtonsRefs.current[index] = buttonRef)}>{word.english}</button>
                    ))}
                </div>
                <div className="words-container">
                    {spanishWords.map((word, index) => (
                        <button className="word-button" key={index} value={word.spanish} onClick={clickWord} ref={buttonRef => (spanishButtonsRefs.current[index] = buttonRef)}>{word.spanish}</button>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Game;