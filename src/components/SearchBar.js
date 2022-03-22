import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './searchbar.css';
import loupe from '../assets/search-loupe-small.png';

const SearchBar = () => {

    const navigate = useNavigate();

    const [pokemon, findPokemon] = useState();
    const endAPI = "https://pokeapi.co/api/v2/pokemon/";

    const handleChange = (e) => {
        findPokemon(e.target.value);
    }
    const handleSubmit = (e) => {
        navigate(`/pokemon/${pokemon}`);
    }

    return (
        <div>
            <form className="search-container" onSubmit={handleSubmit}>
                <input type="text" id="search-bar" placeholder="What pokemon you wanna catch?" value={pokemon}
                       onChange={handleChange}/>
                <a href={"#"}><img className="search-icon" alt={"search"}
                                   src={loupe}/></a>
                                   {/*src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>*/}
            </form>
        </div>
    );
};

export default SearchBar;