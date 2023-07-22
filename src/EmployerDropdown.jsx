import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployerDropdown(props) {
  const [employers, setEmployers] = useState(null);

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers')
      .then((response) => {
        const sortedemployerrecords = response.data.sort((b, a) => b.empname.localeCompare(a.empname));
        setEmployers(sortedemployerrecords);
        })
      .catch((e) => console.error(e));
  }, []);


  return (
    <div>
      <label htmlFor="dropdown">&nbsp; &nbsp; Select an Employer:&nbsp; </label>
      <select id="dropdown" style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '300px' }}>
        {employers && employers.map(option => (
          <option key={option.id} value={option.id}>{option.empname}</option>
        ))}
      </select>
    </div>
  );
};
