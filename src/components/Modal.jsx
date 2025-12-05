import { FaStar } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import winEffect from "../assets/audios/game-bonus-144751.mp3";
import loseEffect from "../assets/audios/violin-lose-4-185125.mp3";

const Modal = (props) => {
    const { isOpenModal, isGiveup, word } = props;
    const winAudioRef = useRef(null);
    const loseRef = useRef(null);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            if (!isGiveup) {
                winAudioRef.current.play();
            } else {
                loseRef.current.play();
            }
        }
    }, [isGiveup]);

    return (
        <div className={isOpenModal ? "modal show-modal" : "modal"}>
            <div className="section-center modal-center">
                {!isGiveup ? (
                    <>
                        <p>That's Exactly True</p>
                        <ul>
                            <FaStar
                                style={{
                                    animation: "bounceFirst 1.5s linear 1",
                                }}
                            />
                            <FaStar
                                style={{
                                    animation: "bounceSecond 1.5s linear 1",
                                }}
                            />
                            <FaStar
                                style={{
                                    animation: "bounceThird 1.5s linear  1",
                                }}
                            />
                        </ul>
                    </>
                ) : (
                    <p>
                        You Lost, the word was <span>{word}</span>
                    </p>
                )}
                <audio src={winEffect} ref={winAudioRef}></audio>
                <audio src={loseEffect} ref={loseRef}></audio>
            </div>
        </div>
    );
};

export default Modal;
