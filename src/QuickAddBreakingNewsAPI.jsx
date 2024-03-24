// import React, { useState, useEffect } from "react";
// import './Fonts.css';


// export default function QuickAddBreakingNewsAPI(props) {
//     const [searchPhrase, setSearchPhrase] = useState('dddddddddddddddddd');

//     // Update searchPhrase state when props.searchPhrase changes
//     useEffect(() => {
//         setSearchPhrase(props.searchPhrase);
//     }, [props.searchPhrase]);

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//     };

//     console.log('QuickAddBreakingNewsAPI', searchPhrase)

//     return (
//         <div className='Font-Verdana-QuickAdd'>&nbsp;
//         <form onSubmit={handleFormSubmit}>
//             <input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '90px' }} type="text" value={searchPhrase} required />
//             <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#ffffff', color: 'green', cursor: 'pointer' }}>Go</button>
//         </form>
//         </div>
//     )
// }
