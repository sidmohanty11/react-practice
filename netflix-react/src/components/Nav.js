import React, {useState, useEffect } from 'react';
import './Nav.css';

const Nav = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    },[]);

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt="Netflix Logo"
            />
            <img className="nav__avatar"
                src="https://pbs.twimg.com/media/DmBraqkXcAA1Yco.jpg"
                alt="User Logo"
                />
        </nav>
    )
}

export default Nav;
