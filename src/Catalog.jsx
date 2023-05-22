import { useState, useEffect } from "react"
import axios from 'axios'

export const Catalog = () => {

    const [card, setCard] = useState([]);
    
    
    const tasksGetter = async () => {
        const {data} = await axios.get('http://localhost:5000/')
        console.log(data.name);
        setCard(data);
    }

    useEffect(() => {
        tasksGetter()
    }, [])


    return (
        <>
            <button onClick={tasksGetter}>Carta</button>
        </>
    )
}