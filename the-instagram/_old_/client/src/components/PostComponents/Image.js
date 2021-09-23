import React from 'react';
import propTypes from "prop-types";

const Image = ({src, caption}) => {
    return (
        <img src={src} alt={caption} />
    )
}

export default Image;
Image.propTypes = {
    src: propTypes.string,
    caption:propTypes.string,
}