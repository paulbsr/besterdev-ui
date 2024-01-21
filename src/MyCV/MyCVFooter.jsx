import React from "react";
import '../Fonts.css'
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { TbSquareRoundedLetterA } from "react-icons/tb";
import { TbSquareRoundedLetterU } from "react-icons/tb";
import { TbSquareRoundedLetterL } from "react-icons/tb";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { TbSquareRoundedLetterE } from "react-icons/tb";
import { TbSquareRoundedLetterS } from "react-icons/tb";
import { TbSquareRoundedLetterT } from "react-icons/tb";
import { TbSquareRoundedLetterR } from "react-icons/tb";
import { TbSquareRoundedLetterC } from "react-icons/tb";
import { TbSquareRoundedLetterM } from "react-icons/tb";




import { TbLetterP} from "react-icons/tb";
import { TbLetterA } from "react-icons/tb";
import { TbLetterU } from "react-icons/tb";
import { TbLetterL } from "react-icons/tb";
import { TbLetterB } from "react-icons/tb";
import { TbLetterE } from "react-icons/tb";
import { TbLetterS } from "react-icons/tb";
import { TbLetterT } from "react-icons/tb";
import { TbLetterR } from "react-icons/tb";


const today = new Date(); // Create a new Date object representing today's date
const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
const MyCVFooter = () => (
<div className="footer Font-Verdana-Small-Footer">
    <TbSquareRoundedLetterP style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterA style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterU style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterL style={{color: 'black', fontSize: '20px' }}/>
    &nbsp;
    <TbSquareRoundedLetterB style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterE style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterS style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterT style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterE style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterR style={{color: 'black', fontSize: '20px' }}/>
    &nbsp; &nbsp; &nbsp;

    {/* < TbLetterP style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterA style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterU style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterL style={{color: 'black', fontSize: '14px' }}/>
    &nbsp; 
    < TbLetterB style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterE style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterS style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterT style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterE style={{color: 'black', fontSize: '14px' }}/>
    < TbLetterR style={{color: 'black', fontSize: '14px' }}/>
    &nbsp; &nbsp; &nbsp; */}

    {/* < TbLetterB style={{color: 'black', fontSize: '12px' }}/>
    < TbLetterS style={{color: 'black', fontSize: '12px' }}/>
    < TbLetterC style={{color: 'black', fontSize: '8px' }}/> */}

    {/* <TbSquareRoundedLetterM style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterS style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterC style={{color: 'black', fontSize: '20px' }}/>
    &nbsp; &nbsp; &nbsp;
    <TbSquareRoundedLetterM style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterS style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterC style={{color: 'black', fontSize: '20px' }}/>
    &nbsp; &nbsp; &nbsp;
    <TbSquareRoundedLetterB style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterS style={{color: 'black', fontSize: '20px' }}/>
    <TbSquareRoundedLetterC style={{color: 'black', fontSize: '20px' }}/> */}
    {/* MSc (Cloud Native SW Engineering) &nbsp; &nbsp; &nbsp;   MSc (Cloud Computing) &nbsp; &nbsp; &nbsp;BSc (Information Technology) */}
    &nbsp; &nbsp; &nbsp;
    {/* Last Updated: {formattedDate }.  */}
    Last Updated: 19 January 2024. 
</div>);

export default MyCVFooter;