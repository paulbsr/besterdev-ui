import React from "react";
import './Fonts.css';
import BreakingNewsAPI from "./BreakingNewsAPI";

export default function QuickAddBreakingNewsAPI(props) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Call a function passed down from props to handle form submission
        props.onSubmit(props.searchPhrase);
    };

    console.log('Jou QuickAddBreakingNewsAPI searchPhrase:', props.searchPhrase)

    return (
        <div className='Font-Verdana-QuickAdd'>&nbsp;
            <form onSubmit={handleFormSubmit}>
                <input 
                    style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '90px' }} 
                    value={props.searchPhrase} 
                    onChange={(e) => props.onSearchPhraseChange(e.target.value)} 
                />
                <button 
                    className="Font-Verdana-Small-Postgres" 
                    type="submit" 
                    style={{ marginLeft: '10px', height: '20.5px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#ffffff', color: 'green', cursor: 'pointer' }}
                >
                    Go
                </button>
            </form>
        </div>
    )
}

