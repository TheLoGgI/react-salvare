import React, { useState, useEffect } from 'react';
// import { APP_ID, APP_KEY} from '../components/envfile.js';

const useFetch = (url:string) => {
    const [data, setData] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        console.log('useEffetch Ran!');
        
        (async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
        })()
    }, [url]);

    return { data, loading };
};


function List(data: object[]) {
    const listItems = data.map((item: any) => {
        return <li key={item.id}>
            {item.name} <span>Phone: {item.phone} </span>
        </li>
    })

    return <ul className = "displaydata-list">{ listItems }</ul>
}

interface InputParam {
    searchParam: string | null;
    isSubmitted: boolean;
    
}

function Container({ searchParam, isSubmitted}: InputParam) {

    // const [url, setParam] = useState<string>(`https://jsonplaceholder.typicode.com/${searchParam}`)

    // const url = `https://jsonplaceholder.typicode.com/${param}`
    // const url = `https://api.edamam.com/api/food-database/parser?ingr=${searchParam}&app_id=${APP_ID}&app_key=${APP_KEY}`
    // const url = `https://jsonplaceholder.typicode.com/users`

    // const { data, loading } = useFetch(url);

    // console.log(data, loading);


    return (
        <>
            <h2> Hallo </h2>
            {/* <img src={ingredient.image} alt={ingredient.label} width="100" height="100" /> */}
            {/* {!loading && 'hallo'} */}
            </>
        );
        
}

export default Container;
