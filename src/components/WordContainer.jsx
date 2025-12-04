import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";

const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];

const WordContainer = (props) => {
    const [countCorrectLetters, setCountCorrectLetters] = useState(0);
    const [countGuesses, setCountGuesses] = useState(0);
    const [foundedLetters, setFoundedLetters] = useState([]);

    const { word, wordInfo, searchValue, setSearchValue, setIsOpenModal } =
        props;

    const wordDescription =
        wordInfo[0]?.meanings[0]?.definitions[0]?.definition;

    const blanksArray = new Array(word.length).fill(" ");

    const [blanksDOM, setBlanksDOM] = useState([" "]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (blanksArray.length > 0) {
            setBlanksDOM(blanksArray);
        }
    }, [word]);

    useEffect(() => {
        if (blanksDOM.every((blank) => blank !== " ")) {
            setCountGuesses(countGuesses + 1);
            if (blanksDOM.join("") === word) {
                setIsOpenModal(true);
                setCountCorrectLetters(word.length);
            } else {
                const wordArray = [...word];
                const newBlanks = blanksDOM.map((blank, i) => {
                    if (blank !== wordArray[i]) {
                        return " ";
                    } else {
                        return blank;
                    }
                });
                setCountCorrectLetters(
                    newBlanks.filter((blank) => blank !== " ").length
                );
                setBlanksDOM(newBlanks);
                setFoundedLetters(newBlanks.filter((blank) => blank !== " "));
                setIndex(0);
                setSearchValue("");
            }
        }
    }, [searchValue]);

    return (
        <article className="word-container">
            <div className="blanks-container">
                {blanksDOM.map((blank) => {
                    return (
                        <div
                            className={blank === " " ? "blank" : "founded"}
                            key={nanoid()}
                        >
                            {blank}
                        </div>
                    );
                })}
            </div>
            <p className="word-description">{wordDescription}</p>
            <h3 className="count-correct-letters">
                correct letters :{" "}
                <span>
                    {countCorrectLetters}/{blanksArray.length}
                </span>
            </h3>
            <h3 className="count-guesses">guesses : {countGuesses}</h3>
            <div className="letters">
                {letters.map((letter) => {
                    return (
                        <button
                            onClick={(event) => {
                                setSearchValue(searchValue + letter);
                                if (blanksDOM[index] === " ") {
                                    blanksDOM[index] = letter;
                                } else {
                                    let nextIndex = index + 1;
                                    while (nextIndex < blanksDOM.length) {
                                        if (blanksDOM[nextIndex] === " ") {
                                            blanksDOM[nextIndex] = letter;
                                            break;
                                        }
                                        nextIndex++;
                                    }
                                }
                                setIndex(index + 1);
                                setBlanksDOM(blanksDOM);
                            }}
                            className={
                                foundedLetters.includes(letter)
                                    ? "btn letter founded-letter"
                                    : "btn letter"
                            }
                            key={nanoid()}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>
        </article>
    );
};

export default memo(WordContainer);
