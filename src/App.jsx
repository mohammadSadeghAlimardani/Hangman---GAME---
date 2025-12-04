import { useEffect, useState } from "react";
import "./App.css";
import ImageContainer from "./components/ImageContainer";
import WordContainer from "./components/WordContainer";
import Loading from "./components/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "./components/Modal";

const getImageAPI =
    "https://pixabay.com/api/?key=53548487-e0c2ccd68c6363fc05f6edab1";

const getWordAPI = "https://random-word-api.vercel.app/api?words=1";

const wordInfoAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const App = () => {
    const [image, setImage] = useState("");
    const [word, setWord] = useState("");
    const [wordInfo, setWordInfo] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [error, setError] = useState("");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["word"],
        queryFn: async () => {
            const response = await axios.get(getWordAPI);
            return response.data[0];
        },
    });

    const fetchImage = async (word) => {
        try {
            const response = await axios.get(
                `${getImageAPI}&q=${word}&image_type=photo&pretty=true`
            );
            if (response) {
                const randomNumber = Math.floor(
                    Math.random() * response.data.hits.length
                );
                setImage(response.data.hits[randomNumber]);
            }
        } catch (error) {
            setError(true);
        }
    };

    const fetchWordInfo = async (word) => {
        try {
            const response = await axios.get(`${wordInfoAPI}${word}`);
            setWordInfo(response.data);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        if (data) {
            fetchImage(data);
            fetchWordInfo(data);
            setWord(data);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || error) {
        return (
            <div className="alert alert-danger">
                <div className="alert-icon">&#10799;</div>
                <p>
                    an Error Happend During Fetching Word, Please Refresh The
                    Page
                </p>
            </div>
        );
    }

    return (
        <main className="game">
            <Modal isOpenModal={isOpenModal} />
            <div className="section-center game-center column column-2">
                <ImageContainer image={image} word={word} />
                <WordContainer
                    word={word}
                    wordInfo={wordInfo}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    setIsOpenModal={setIsOpenModal}
                />
            </div>
        </main>
    );
};

export default App;
