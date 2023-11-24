import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'


export default function SideBarNavigation(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [tabledata, setTabledata] = useState([]);


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedTabledata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setTabledata(sortedTabledata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);

  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

      <table className="Table5">
        <thead>
          <tr>
          </tr>
        </thead>

        <tbody>
          {tabledata.map((row) => {
            return (
              <tr key={row.id}>
                <td>
                  <>
                    <Tooltip id="edit" />

                  </>
                </td>

                <td className="Table5-hover"><a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">{row.website_name} </a>

                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}