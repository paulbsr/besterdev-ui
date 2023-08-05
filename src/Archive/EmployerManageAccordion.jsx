import { useState, useEffect, useContext } from 'react'
import './Fonts.css'
import { FaPeopleGroup } from "react-icons/fa6";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import EmployerManage from './EmployerManage';
import EmployerCreate from './EmployerCreate';


export default function EmployerManageAccordion(props) {

    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };


    return (


        <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
                &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Manage"><FaPeopleGroup style={{ color: '#336791', fontSize: '45px', cursor: 'pointer' }} /></a>
                &nbsp;<b>Manage Employers/Customers</b>
            </div>

            {isExpanded && (
                <div>
                    <div>

                        <EmployerCreate />
                        <EmployerManage />


                    </div>
                </div>
            )
            }
        </div>
    );
}