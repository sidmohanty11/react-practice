import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import axios from '../axios.js';

const TinderCards = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const req = await axios.get("/tinder/cards");

            setPeople(req.data);
        }

        fetchData();
    }, []);

    const swiped = (dir, nameToDelete) => {
        console.log("removed " + nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log("left the screen" + name);
    };

    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
            {people.map(character => (
                <TinderCard
                    className="swipe"
                    key={character.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, character.name)}
                    onCardLeftScreen={() => outOfFrame(character.name)}
                >
                    <div style={{ backgroundImage: `url(${character.imgUrl})` }} className="card">
                        <h3>{character.name}</h3>
                    </div>
                </TinderCard>
            ))}
            </div>
        </div>
    )
}

export default TinderCards;
