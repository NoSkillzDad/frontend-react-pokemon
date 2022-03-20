// noinspection JSVoidFunctionReturnValueUsed
import React from 'react';
import './App.css';
import './assets/pokeball-png-photos.png';
import pokemonLogo from './assets/pokemon-logo.png';
import pokeball from './assets/pokeball-png-photos.png';
import PokemonHome from "./components/PokemonHome";
import {NavLink, Route, Routes} from "react-router-dom";
import AllItems from "./components/AllItems";
import SearchBar from "./components/SearchBar";
import FindPokemon from "./components/FindPokemon";
import Poke404 from "./components/Poke404";

const App = () => {
    return (
        <>
            <div className="app-container">
                <div className={"main-nav"}>
                    <div id={"my-search-bar"}>
                        <SearchBar/>
                    </div>
                    <ul>

                        <li>
                            <NavLink id={"nav-home"} to="/">Home</NavLink>
                            <img id={"home-pokeball"} src={pokeball} alt={"pokemon ball"} width={"50px"}/>
                        </li>
                        <li>
                            <NavLink id={"nav-item"} to="/items">Items</NavLink>
                            <img id={"item-pokeball"} src={pokeball} alt={"pokemon ball"} width={"50px"}/>
                        </li>
                    </ul>
                </div>
                <img src={pokemonLogo} alt={"Pokemon Logo"} width={"300px"} height={"auto"}/>

                <Routes>
                    <Route path={"/"} element={<PokemonHome/>}/>
                    <Route path={"/items"} element={<AllItems/>}/>
                    <Route path={"/pokemon/:poke"} element={<FindPokemon />}/>
                    <Route path={"/PokeNotFound/:error"} element={<Poke404 />}/>
                </Routes>

            </div>
        </>
    )
        ;
}

export default App;
