import * as React from 'react';
import './pokemonCard.css';

const PokemonCard = ({id, name, image, moves, weight, abilities, type}) => {

    const newClass = type + " pokemon-card";

    const renderAbilities = (abilities) => {
        return abilities.map(ability => (
            <div key={ability.ability.name} className={"ability"}>{ability.ability.name}</div>
        ))
    }

    return (
        <div className={newClass}>
            <div className={"pokemon-id"}>#0{id}</div>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <div className="property-title">Moves:<p>  {moves}</p></div>
            <div className="property-title">Weight:<p>  {weight}</p></div>
            <div className="property-title">Abilities</div>
            {renderAbilities(abilities)}
        </div>
    )
}

export default PokemonCard;