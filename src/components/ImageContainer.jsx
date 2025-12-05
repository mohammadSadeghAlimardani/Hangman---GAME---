import { memo } from "react";

const ImageContainer = (props) => {
    const { image } = props;
    return (
        <article className="image-container">
            {image === 404 ? (
                <p>No Image Found</p>
            ) : (
                <img src={image?.largeImageURL} />
            )}
        </article>
    );
};

export default memo(ImageContainer);
