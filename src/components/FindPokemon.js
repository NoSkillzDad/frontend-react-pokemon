import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import PokemonDetail from "./PokemonDetail";

const FindPokemon = () => {
    const {poke} = useParams();

    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(); //used for just one pokemon
    const [nextPokemon, setNextPokemon] = useState(null);
    const [previousPokemon, setPreviousPokemon] = useState(null);

    const isMounted = useRef(false);

    const getPokemon = async (poke) => {
        try {
            const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`);
            setPokemon(pokemonDetails.data);
        } catch (e) {
            console.log(e);
            navigate("/PokeNotFound");
        }
    }

    useEffect(() => {
        getPokemon(poke);

    }, []);

    useEffect(() => {
        if (isMounted.current) {
            if (pokemon) setNextPokemon(pokemon.id + 1);
            if (pokemon && pokemon.id > 1) setPreviousPokemon(pokemon.id - 1);
            if (pokemon.id === 1) setPreviousPokemon(null);
        } else {
            isMounted.current = true;
        }
    }, [pokemon]);

    const loadMorePoki = () => {
        getPokemon(nextPokemon);
    }

    const loadPreviousPoki = () => {
        getPokemon(previousPokemon);
    }

    return (
        <>
            {pokemon &&
                <>
                    <div className={"navigation-buttons-wrapper"}>
                        {previousPokemon &&
                            <button className={"navigation-button"} onClick={() => loadPreviousPoki()}>Previous
                                Pokemon</button>}
                        {nextPokemon &&
                            <button className={"navigation-button"} onClick={() => loadMorePoki()}>Next
                                Pokemon</button>}
                    </div>
                    <div className="all-container">
                        <PokemonDetail
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.sprites.other.['official-artwork'].front_default}
                            name={pokemon.name}
                            weight={pokemon.weight}
                            moves={pokemon.moves}
                            type={pokemon.types[0].type.name}
                            abilities={pokemon.abilities}
                            stats={pokemon.stats}
                        />
                    </div>
                </>
            }
        </>);
};

export default FindPokemon;