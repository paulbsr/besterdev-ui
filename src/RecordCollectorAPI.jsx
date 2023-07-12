import { useState, useEffect } from 'react'
import axios from 'axios'

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
            {
              apidata.map((value, key) =>
              {
                return (
                  <div key={key}>
                    {value.Nation}
                  </div>
                );
              })
            }
          </>
        );

           }
