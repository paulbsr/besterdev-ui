import { useState, useEffect } from 'react'
import axios from 'axios'
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';



export default function RecordCollectorAPI() {
    const [apidata, setApidata] = useState([]);
    


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

  return (
    <>
    <BannerLight/>
    <GradientLineThin/>
    <Quicklinks/>
      {
        apidata.map((value, key) => {
          return (<div key={key}>{value.Population}</div>);
        })
      }
    </>
  );

}
