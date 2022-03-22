import React from 'react';
import './Poke404.css';
import {useParams} from "react-router-dom";

const Poke404 = () => {
    const {error} = useParams();

    return (
        <>
            <div className={"error-title"}>
                {/*<h1>404</h1>*/}
                <h1>{error}</h1>
                <p>PokeProblem - One of us did something wrong! Was it you?</p>
                {/*<p>{error.data}</p>*/}
            </div>
            <div className={"error-message"}>
            </div>
        </>
    );
};

export default Poke404;