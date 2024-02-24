import React, { useState, useContext } from 'react';
import '../Fonts.css'
import axios from 'axios'
import { Tooltip } from '@mui/material';
import { GiCheckMark } from "react-icons/gi"; //Commit
import { PiArrowCounterClockwiseBold } from 'react-icons/pi'; //Discard
import { toast } from 'react-toastify';
import MyCVEmployerRoles from './MyCVEmployerRoles';
import Tenure from './Tenure';
import { BsPencil } from "react-icons/bs";
import GM from './GM.png'
import { MdReadMore } from "react-icons/md";
import { Image } from 'react-bootstrap';



export default function MyCVEmployers({ mycvdata, employer_id, employer_name, employer_start, employer_end, employer_desc, checkForRecords, setCheckForRecords }) {

    const [editing, setEditing] = useState(false);
    const [employerdesc, setEmployerdesc] = useState();
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };

    const tenure = {employer_start} - {employer_end}

    const handleEdit = () => 
    {
        setEmployerdesc(employer_desc)
        setEditing(true)
    }

    const onEditCancel = () => 
    {
        setEditing(false);
    }

    const onEditSave = async () => 
    {
        const updatedEmployer =
        {
            'employer_desc': employerdesc
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employer_desc/update/${employer_id}`, updatedEmployer)
            .then((response) => {
                setCheckForRecords(!checkForRecords);
                toast.success(`${employer_name} updated.`)
            }
            )
        onEditCancel();
    }

    const employerImages = 
    {
        "General Motors IT Services Ireland (GMISI)": require('./GM.png'),
        "Hewlett Packard": require('./HP.png'),
        "Dell Inc.": require('./DELL.png'),
        "Bryan S Ryan": require('./BSR.jpg'),
    };

}
