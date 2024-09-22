import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoleDropdown(props) {
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {
        const sortedrolerecords = response.data.sort((b, a) => b.company.localeCompare(a.company));
        setRoles(sortedrolerecords);
        })
      .catch((e) => console.error(e));
  }, []);


  return (
    <div>
      <label htmlFor="dropdown">&nbsp; &nbsp; Propose candidate for this Employer/Role/JR:&nbsp;</label>
      <select id="dropdown" style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }}>
        {roles && roles.map(option => (
          <option key={option.id} value={option.id}>{option.company} / {option.jrtitle} / {option.jrnumber}</option>
        ))}
      </select>
    </div>
  );
};
