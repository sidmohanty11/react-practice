import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';

const base_img_url = 'https://image.tmdb.org/t/p/original/';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(requests.fetchNetflixOriginals);
            const randomMovie = Math.floor(Math.random() * req.data.results.length -1);
            setMovie(req.data.results[randomMovie]);
            return req;
        }
        fetchData();
    }, []);

    //console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url(${base_img_url}${movie?.backdrop_path})`,
            backgroundPosition: "center center",
        }}>
            <div className="banner__contents">
            <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

            <div className="banner__buttons">
                <button className="banner__button">PLAY</button>
                <button className="banner__button">MY LIST</button>
            </div>

            <h2 className="banner__description">{truncate(movie?.overview,100)}</h2>
            </div>
            <div className="banner__fadeBottom" />
        </header>
    );
}

export default Banner;
