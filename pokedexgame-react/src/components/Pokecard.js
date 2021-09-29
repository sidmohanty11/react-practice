import React from 'react'
import './Pokecard.css'

const Pokecard = (props) => {
    const imgURL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
    let padToThree = num => (num <= 999 ? `00${num}`.slice(-3) : num);
    let imgSRC = `${imgURL}${padToThree(props.id)}.png`;

    return (
        <div className="Pokecard">
            <div className="Pokemon-image"><img src={imgSRC} alt={props.name} /></div>
            <h1>{props.name}</h1>
            <h6>TYPE: {props.type}</h6>
            <h6>EXP: {props.exp}</h6>
        </div>
    )
}

export default Pokecard;
