import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import MoveCard from "./MoveCard";

const GetMove = () => {
    const {move} = useParams();
    const navigate = useNavigate();

    const [moveDesc, setMoveDesc] = useState();
    const [pokemonsIcon, setPokemonsIcon] = useState([]);
    const isMounted = useRef(false);

    const getMove = async (move) => {
        try {
            const moveData = await axios.get(`https://pokeapi.co/api/v2/move/${move}`);
            setMoveDesc(moveData.data);
            moveData.data.learned_by_pokemon.forEach(async pokemon => {
                const pokeList = await axios.get(pokemon.url);
                setPokemonsIcon(pokemonsIcon => [...pokemonsIcon, pokeList.data.sprites.front_default]);
            })
        } catch (e) {
            console.log(e)
            // navigate(`/PokeNotFound/${e.response}`);
            // navigate(`/PokeNotFound/${e.response.status}`);
        }
    }

    useEffect(() => {
        getMove(move);
    }, []);

    // useEffect(() => {
    //     // if (isMounted.current) {
    //     // } else {
    //     //     isMounted.current = true;
    //     // }
    // }, [moveDesc]);



    return (
        <>
            {moveDesc &&
                <>
                    <div className="all-container">
                        <MoveCard
                            name={moveDesc.name}
                            description={moveDesc.effect_entries[0].short_effect}
                            damagaType={moveDesc.damage_class.name}
                            accuracy={moveDesc.accuracy}
                            effectChance={moveDesc.effect_chance}
                            powerPoints={moveDesc.pp}
                            priority={moveDesc.priority}
                            power={moveDesc.power}
                            contestType={moveDesc.contest_type}
                            contestCombos={moveDesc.contest_combos}
                            learnedByPokemon={pokemonsIcon}
                        />

                    </div>
                </>
            }
        </>);
};

export default GetMove;