import './Fonts.css'
import { TbSquareRoundedLetterP } from "react-icons/tb";
import { TbSquareRoundedLetterA } from "react-icons/tb";
import { TbSquareRoundedLetterU } from "react-icons/tb";
import { TbSquareRoundedLetterL } from "react-icons/tb";
import { TbSquareRoundedLetterB } from "react-icons/tb";
import { TbSquareRoundedLetterE } from "react-icons/tb";
import { TbSquareRoundedLetterS } from "react-icons/tb";
import { TbSquareRoundedLetterT } from "react-icons/tb";
import { TbSquareRoundedLetterR } from "react-icons/tb";


const today = new Date(); // Create a new Date object representing today's date
const formattedDate = today.toISOString().split('T')[0]; // Convert the date to the desired format (YYYY-MM-DD)
const Footer = () => (
<div className="Font-Verdana-Small-Footer">
    <TbSquareRoundedLetterP style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterA style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterU style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterL style={{color: 'white', fontSize: '25px' }}/>
    &nbsp;
    <TbSquareRoundedLetterB style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterE style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterS style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterT style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterE style={{color: 'white', fontSize: '25px' }}/>
    <TbSquareRoundedLetterR style={{color: 'white', fontSize: '25px' }}/>
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    Last Updated: {formattedDate }. &nbsp; All rights reserved. 
</div>);

export default Footer;