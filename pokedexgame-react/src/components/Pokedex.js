import React from 'react'
import Pokecard from './Pokecard';
import './Pokedex.css'

const Pokedex = (props) => {
    let title;
    if (props.isWinner) {
        title=<h1 className="winner">Winning Hand!</h1>
    } else {
        title = <h1 className="loser">Losing Hand!</h1>
    }
    return (
        <div className="Pokedex">
            <h4>TOTAL EXP: {props.exp}</h4>
            <p>{title}</p>
            <div className="Pokedex-cards">
            {props.pokemon.map((p) => (
                <Pokecard
                    id={p.id}
                    name={p.name}
                    type={p.type}
                    exp={p.base_experience} />
            ))}
            </div>
        </div>
    );
};

export default Pokedex;
