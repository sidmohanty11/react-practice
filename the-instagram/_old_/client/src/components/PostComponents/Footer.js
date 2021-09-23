import React from 'react';
import propTypes from 'prop-types';

const Footer = ({caption,username}) => {
    return (
        <div className="p-4 pt-2 pb-0">
            <span className="mr-1 font-bold">{username}</span>
            <span className="">{caption}</span>
        </div>
    )
}

export default Footer;

Footer.propTypes = {
    caption: propTypes.string,
    username: propTypes.string,
}
