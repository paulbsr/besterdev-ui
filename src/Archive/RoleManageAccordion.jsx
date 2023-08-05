import { useState } from 'react'
import './Fonts.css'
import { FaCriticalRole } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import RoleCreate from './RoleCreate';
import RoleManage from './RoleManage';


export default function RoleManageAccordion(props) {

    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };


    return (


        <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
                &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Manage"><FaCriticalRole style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
                &nbsp;<b>Manage Roles</b>
            </div>

            {isExpanded && (
                <div>
                    <div>
                        <RoleCreate />
                        <RoleManage />
                    </div>
                </div>)}
        </div>
    );
}