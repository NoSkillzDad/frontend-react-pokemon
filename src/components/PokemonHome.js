import React, {useEffect, useState} from 'react';
import axios from "axios";
import PokemonCard from "./PokemonCard";

const PokemonHome = () => {
    // const [pokemon, setPokemon] = useState(); //used for just one pokemon
    const [allPokemons, setAllPokemons] = useState([]);
    const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon");
    const [previousPage, setPreviousPage] = useState(null);
    // const isMounted = useRef(false);

    const getAllPokemons = async (page) => {
        try {
            //Get the list of all pokemons

            const goToPage = page ? page : nextPage;

            const response = await axios.get(goToPage);

            //add next and previous here

            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);

            //Grab 20 pokemons
            const grabPokemons = (pokemons) => {
                pokemons.forEach(async pokemon => {
                    const morePokis = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    setAllPokemons(pokemonsGrabbed => [...pokemonsGrabbed, morePokis.data]);
                })

            }

            grabPokemons(response.data.results);

            allPokemons.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            // This is for just 1 pokemon
            // const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
            // await setPokemon(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getAllPokemons();
    }, []);

    // useEffect(() => {
    //     if (isMounted.current) {
    //         console.log(pokemon);
    //         console.log(pokemon.name);
    //         console.log(pokemon.weight);
    //         console.log(pokemon.moves.length);
    //         console.log(pokemon.abilities[0].ability.name);
    //         console.log(pokemon.sprites.front_default);
    //     } else {
    //         isMounted.current = true;
    //     }
    // }, [pokemon]);

    const loadMorePokis = () => {
        setAllPokemons([]);
        getAllPokemons(nextPage);
    }

    const loadPreviousPokis = () => {
        setAllPokemons([]);
        getAllPokemons(previousPage);
    }

    return (
        <>
            {allPokemons &&
                <>

                    <div className={"navigation-buttons-wrapper"}>
                        {previousPage &&
                            <button className={"navigation-button"} onClick={() => loadPreviousPokis()}>Previous
                                Page</button>}
                        {nextPage &&
                            <button className={"navigation-button"} onClick={() => loadMorePokis()}>Next
                                Page</button>}
                    </div>
                    <div className="all-container">
                        {allPokemons.map((pokemon, index) =>
                            <PokemonCard
                                key={index}
                                id={pokemon.id}
                                image={pokemon.sprites.other.['official-artwork'].front_default}
                                name={pokemon.name}
                                weight={pokemon.weight}
                                moves={pokemon.moves.length}
                                type={pokemon.types[0].type.name}
                                abilities={pokemon.abilities}
                            />)}
                    </div>
                </>
            }
        </>);
};

export default PokemonHome;