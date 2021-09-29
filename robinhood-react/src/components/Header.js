import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';

const Header = () => {
    return (
        <div className="header__wrapper">
            <div className="header__logo">
                <img src="./robinhood-2.svg" alt="logo" width="70" />
            </div>
            <div className="header__search">
                <div className="header__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="header__menuItems">
                <a href="/freestocks">Freestocks</a>
                <a href="/portfolio">Portfolio</a>
                <a href="/cash">Cash</a>
                <a href="/messages">Messages</a>
                <a href="/account">Account</a>
            </div>
        </div>
    )
}

export default Header;
