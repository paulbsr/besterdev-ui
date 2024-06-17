import axios from 'axios';
import './Fonts.css'

export const PeopleScorecardUpdateHelp = async (id, person, newValues, setCheckForRecords, checkForRecords, alertHandler) => {

    try
    {const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/scorecard_people/update/${person}/${id}`, newValues);

        if(response.status === 202)
        {setCheckForRecords(!checkForRecords); alertHandler.success(`${person} has been updated`);}

        else {alertHandler.error(`Error in ${person} update`); 
        // console.log(err);
    }
    }

    catch(err) {alertHandler.error(`Error in PeopleScorecardUpdateHelp for ${person}`); console.log(err);}
}