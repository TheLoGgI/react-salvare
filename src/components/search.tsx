import React, { } from 'react';
import '../css/searchbar.css';


function handleSubmit(
    event: React.SyntheticEvent<EventTarget | any>,
    toggle: (value: boolean) => void,
    setInput: (value: string | null) => void) {
    event.preventDefault()
    setInput(event.currentTarget.childNodes[0].value)
    // toggle(true)
}

interface SetInput {
    setInput: (value: string | null) => void;
    toggle: (value: boolean) => void;
}

function Search({ setInput, toggle}: SetInput) {
    
    return (
        <form className="input" onSubmit={e => handleSubmit(e, toggle, setInput)}>
            <input className="search" autoComplete="search" type="text" id="name" placeholder="Ingredienser.."/>
            <input className="input-submit" type="submit" value="Søg ingrediens"/>
        </form>
    )
}

export default Search;
