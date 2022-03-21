import React from 'react';
import './MoveCard.css';
import {Link} from "react-router-dom";

const MoveCard = ({
                      name,
                      description,
                      damagaType,
                      accuracy,
                      effectChance,
                      power,
                      powerPoints,
                      priority,
                      contestType,
                      contestCombos,
                      learnedByPokemon
                  }) => {

    const renderElement = (element, title) => {
        if (element) return (
            <div className={"property-title"}>{title}
                <p className={"property-mini-title"}>{element}</p>
            </div>
        )
    }

    const renderContestCombos = (combos, title) => {
        if (combos) {
            return (combos.map((combo, index) => (
                renderElement(combo.name, title)
                // <div key={`CC-${index}`} className={"pokemon-mini-wrapper"}>{convo.name}</div>
            )));
        } else return <></>
    }

    const renderPokemons = (pokemons) => {
        return pokemons.map((pokemonIcon, index) => (
            <div key={`IMG-${index}`}>
                {/*<Link to={`/pokemon/name`}>*/}
                {/*    <img src={pokemonIcon.sprites.front_default} alt={pokemonIcon.name}/>*/}
                <img src={pokemonIcon} alt={`pokemons with ${name} move`}/>
                {/*</Link>*/}
            </div>
        ))
    }

    // alert(contestCombos.normal.use_before[0].name)


    return (
        <div className={"move-wrapper"}>
            <div className={"move-header"}>
                <h2>{name}</h2> <p>({damagaType} damage)</p>
                <p>{description}</p>
            </div>

            <div className={"two-cols-wrapper"}>
                <div className={"col-one"}>
                    {renderElement(accuracy, "Accuracy:")}
                    {renderElement(effectChance, "Effect Chance:")}
                    {renderElement(powerPoints, "Power Points:")}
                    {renderElement(priority, "Priority")}
                    {renderElement(power, "Power:")}
                    {renderElement(contestType.name, "Contest Type:")}
                </div>
                <div className={"col-two"}>
                    {(contestCombos.normal.use_before || contestCombos.normal.use_after) && <>
                        <div className={"section-title"}>Normal</div>
                        {renderContestCombos(contestCombos.normal.use_before, "use before:")}
                        {renderContestCombos(contestCombos.normal.use_after, "use after:")}
                    </>
                    }
                    {(contestCombos.super.use_before || contestCombos.super.use_after) && <>
                    <div className={"section-title"}>Super</div>
                    {renderContestCombos(contestCombos.super.use_before, "use before:")}
                    {renderContestCombos(contestCombos.super.use_after, "use after:")}
                    </>
                    }
                </div>
            </div>

            <div className={"description-footer"}>
                <div className={"poke-icons-wrapper"}>
                    {/*<div className={"property-title poke-icons-title"}>Learned by</div>*/}
                    {renderPokemons(learnedByPokemon)}
                </div>

            </div>
        </div>
    )
}
export default MoveCard;