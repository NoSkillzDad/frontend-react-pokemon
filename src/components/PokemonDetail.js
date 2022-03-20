import React from 'react';
import './PokemonDetails.css';

const PokemonDetail = ({id, name, image, moves, weight, abilities, type, stats}) => {

    const newClass = type + " pokemon-details";

    const renderAbilities = (abilities) => {
        return abilities.map(ability => (
            <div key={ability.ability.name} className={"ability"}>{ability.ability.name}</div>
        ))
    }

    const renderMoves = (moves) => {
        return moves.map(move => (
            <div key={move.move.name} className={"ability"}>{move.move.name}</div>
        ))
    }

    const renderStats = (stats) => {
      return stats.map((stat, index) => (
          <div key={index} className="property-title">{stat.stat.name}: <p className={"property-mini-title"} key={index}>{stat.base_stat}</p></div>
          // <div key={index} className="property-title">{stat.stat.name}: <p>{stat.base_stat}</p></div>
      ))
    }


    return (
        <div className={newClass}>
            <img src={image} alt={name}/>
            <div className={"details-wrapper"}>
                <div className={"name"}>
                    <h3>{name}</h3>
                </div>
                <div className="property-title">Stats</div>
                {renderStats(stats)}
                <div className="property-title">Abilities</div>
                {renderAbilities(abilities)}
                <div className="property-title">Moves</div>
                {renderMoves(moves)}
                <div className="property-title">weight:<p className={"property-mini-title"}>{weight}</p></div>
                <div className={"pokemon-id"}><p>#0{id} (type: {type})</p></div>
            </div>

        </div>
    )
}
export default PokemonDetail;