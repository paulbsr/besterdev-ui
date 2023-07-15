import { useState, useEffect } from 'react'
import axios from 'axios'
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';



export default function RecordCollectorAPI() {
    const [apidata, setApidata] = useState([]);
    const [apidata2, setApidata2] = useState([]);
    


  useEffect(() => {
    // axios('http://universities.hipolabs.com/search?country=ireland')
    axios('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      // axios ('https://randomuser.me/api/')
      .then((response) => {
        setApidata(response.data.data);
        console.log(response.data.data);
        console.log(apidata);
      }
      )
  }, []);


  useEffect(() => {
    // axios('http://universities.hipolabs.com/search?country=ireland')
    // axios('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      axios ('https://randomuser.me/api/')
      .then((response) => {
        setApidata2(response.data.results);
        console.log(response.data.results);
        console.log(apidata2);
      }
      )
  }, []);


  function GenderLabel({ gender }) {
    if (gender === "female") {
      return <span>F</span>;
    } else if (gender === "male") {
      return <span>M</span>;
    } else {
      return null; // Return null if the value is neither "female" nor "male"
    }
  }

  return (
    <>
      {
        apidata.map((value, key) => {
          return (<div key={key}>&nbsp;{value.Population}&nbsp; &nbsp;{value.Nation}&nbsp; &nbsp;{value.Nation}</div>);
        })
      }
      <GradientLineThin/>
      {
        apidata2.map((value, key) => {
          return (
          <div key={key}>
            <div><b>&nbsp;Vitals: </b>{value.name.first} {value.name.last}.&nbsp; {value.dob.age}<GenderLabel gender={value.gender}/>.&nbsp; {value.location.state}, {value.location.country}</div>
            <div><b>&nbsp;eMail: </b>{value.email}</div>
            <div><b>&nbsp;Landline: </b>{value.phone}</div>
            <div><b>&nbsp;Mobile: </b>{value.cell}</div>
            <div><b>&nbsp;Street: </b>{value.location.street.number} &nbsp;{value.location.street.name}, {value.location.city}, {value.location.postcode}</div>
            {/* <div><b>&nbsp;City: </b>{value.location.city}</div>
            <div><b>&nbsp;State/Province: </b>{value.location.state}</div>
            <div><b>&nbsp;Postcode: </b>{value.location.postcode}</div> */}

          </div>
          
          
          
          
          );
        })
      }
    </>
  );

}
