import React, {useState, useEffect} from 'react';
import axios from "axios";
import ItemsCard from "./ItemsCard";

const AllBerries = () => {
    const [allItems, setAllItems] = useState([]);
    const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/item");
    const [previousPage, setPreviousPage] = useState(null);

    const findAllItems = async (page) => {
        try {
            const goToPage = page ? page : nextPage;
            const response = await axios.get(goToPage);

            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);

            const findItems = (items) => {
                items.forEach(async item => {
                    const moreItems = await axios.get(`https://pokeapi.co/api/v2/item/${item.name}`);
                    setAllItems(itemsFound => [...itemsFound, moreItems.data]);
                })
            }

            findItems(response.data.results);
            allItems.sort((a, b) => parseInt(a.id) - parseInt(b.id));

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        findAllItems();
    }, []);

    const loadMoreItems = () => {
        setAllItems([]);
        findAllItems(nextPage);
    }

    const loadPreviousItems = () => {
        setAllItems([]);
        findAllItems(previousPage);
    }

    return (
        <>
            {allItems &&
                <>

                    <div className={"navigation-buttons-wrapper"}>
                        {previousPage &&
                            <button className={"navigation-button"} onClick={() => loadPreviousItems()}>Previous
                                Page</button>}
                        {nextPage &&
                            <button className={"navigation-button"} onClick={() => loadMoreItems()}>Next
                                Page</button>}
                    </div>
                    <div className="all-container">
                        {allItems.map((item, index) =>
                            <ItemsCard
                                key={index}
                                id={item.id}
                                image={item.sprites.default}
                                name={item.name}
                                cost={item.cost}
                                category={item.category.name}
                                description={item.flavor_text_entries[0].text}
                                flingPower={item.fling_power}
                                attributes={item.attributes}
                                effects={item.effect_entries[0].effect}
                            />)}
                    </div>
                </>
            }
        </>);
};

export default AllBerries;