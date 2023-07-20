import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AlertContext from "./Generic/Alerts/AlertContext";
import './Fonts.css'
import spacer from './graphix/besterdev_spacer_white.png'
import {FaMinusCircle, FaPlusCircle} from 'react-icons/fa';
import GradientLineThin from './GradientLineThin';
import { GiHummingbird, GiNestBirds } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'



export default function AccordionTemplate(props) {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
 

  return (

    
        <div className='Font-Verdana-Small-Heroku'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
            &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Template"><GiNestBirds style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
            &nbsp;<b>AccordionTemplate</b>
            </div>

            {isExpanded && (
                <div>
                    <div>

                        blah

                    </div>
                </div>)}
        </div>

    );
}