import axios from 'axios';
import '../Fonts.css'

export const PeopleScorecardUpdateHelp = async (id, person, newValues, setCheckForRecords, checkForRecords, alertHandler) => {

    try
    {const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/scorecard_people/update/${person}/${id}`, newValues);

        if(response.status === 202)
        {setCheckForRecords(!checkForRecords); alertHandler.success(`${person} has been updated`);}

        else {alertHandler.error(`Error in ${person} update`); 

    }
    }

    catch(err) {alertHandler.error(`Error in PeopleScorecardUpdateHelp for ${person}`); console.log(err);}
}