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
    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    Last Updated: {formattedDate }. &nbsp; All rights reserved. 
</div>);

export default Footer;