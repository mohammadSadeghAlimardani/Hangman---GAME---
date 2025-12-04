import { FaStar } from "react-icons/fa6";
import audioEffect from "../assets/audios/game-bonus-144751.mp3";
import { useEffect, useRef } from "react";

const Modal = (props) => {
    const { isOpenModal } = props;
    const audioRef = useRef(null);
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            audioRef.current.play();
        }
    }, [isOpenModal]);

    return (
        <div className={isOpenModal ? "modal show-modal" : "modal"}>
            <div className="section-center modal-center">
                <p>That's Exactly True</p>
                <ul>
                    <FaStar
                        style={{
                            animation: isOpenModal
                                ? "bounceFirst 1.5s linear 1"
                                : "",
                        }}
                    />
                    <FaStar
                        style={{
                            animation: isOpenModal
                                ? "bounceSecond 1.5s linear 1"
                                : "",
                        }}
                    />
                    <FaStar
                        style={{
                            animation: isOpenModal
                                ? "bounceThird 1.5s linear 1"
                                : "",
                        }}
                    />
                </ul>
                <audio src={audioEffect} ref={audioRef}></audio>
            </div>
        </div>
    );
};

export default Modal;
