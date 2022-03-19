import React from 'react';
import pokeCoin from '../assets/PokeCoin.png';
import './itemCard.css';

const BerryCard = ({key, id, image, name, cost, category, description, flingpower, attributes, effects}) => {
    const newClass = category + " item-card";

    const renderAttributes = (attributes) => {
        return attributes.map(attribute => (
            <div key={attribute.name} className={"attribute"}>{attribute.name}</div>
        ))
    }

    return (
        <div className={newClass}>
            {/*<div className={"pokemon-id"}>#0{id}</div>*/}
            <div className="item-category"><p>{category}</p></div>
            <div className={"item-header"}>
                <img src={image} alt={name}/>
                <h3>{name}</h3>
            </div>
            <div className="property-title">
                <h4>Description</h4>
                <p>{description}</p>
            </div>
            <div className="property-title">
                <h4>Effects</h4>
                <p>{effects}</p>
            </div>
            <div className="property-title">Attributes</div>
            {renderAttributes(attributes)}
            <div className={"item-cost"}>
                {flingpower &&
                    <>
                        <p>flingpower: </p>{flingpower}
                    </>}
                <img src={pokeCoin} alt={"poke dollar"}/>
                <p>{cost}</p>
            </div>

        </div>
    )
}

export default BerryCard;
