import { useState, useEffect } from 'react';

function useFetch(url){
    const [data, setData] = useState([]);

    async function fetchURL(){
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
    }

    useEffect(() =>{
        fetchURL();
    }, []);
    return [data];
}

export {useFetch};