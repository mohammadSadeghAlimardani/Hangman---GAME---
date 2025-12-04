import { memo } from "react";

const ImageContainer = (props) => {
    const { image, word } = props;
    return (
        <article className="image-container">
            <img src={image?.largeImageURL} alt={word} />
        </article>
    );
};

export default memo(ImageContainer);
