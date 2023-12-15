import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import One from './graphix/3.png'
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { Link } from 'react-router-dom';
import CyclopediaAccordion from './CyclopediaAccordion';
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";
import { toast } from 'react-toastify';


export default function HomePage(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata, setWebsitedata] = useState([]);
  const [howtodata, setHowtodata] = useState([]);
  const [cyclopediadata, setCyclopediaData] = useState([]);
  const [showHowtoEdit, setShowHowtoEdit] = useState(false);
  const [howtoIdd, setHowtoIdd] = useState(null);
  const [editing, setEditing] = useState(false);
  const [cyclopedianame, setCyclopediaName] = useState();
  const [cyclopediadesc, setCyclopediaDesc] = useState();
  const [cyclopediaref, setCyclopediaRef] = useState();

  const handleLinkClick = (howtoId) => {
    setHowtoIdd(howtoId);
    setShowHowtoEdit(true);
  }


  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedwebsitedata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setWebsitedata(sortedwebsitedata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);



  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      .then((response) => {
        const sortedHowtodata = response.data.sort((a, b) => a.howto_name.localeCompare(b.howto_name));
        setHowtodata(sortedHowtodata);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);



  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia')
      .then((response) => {
        const sortedCyclopediaData = response.data.sort((a, b) => a.cyclopedia_name.localeCompare(b.cyclopedia_name));
        setCyclopediaData(sortedCyclopediaData);
      })
      .catch((e) => console.error(e));
  }, [props.checkForRecords]);


  const handleEdit = (cyclopedia_id, newcyclopedianame, newcyclopediadesc, newcyclopediaref ) => {
    setEditing(cyclopedia_id);
    setCyclopediaName(newcyclopedianame);
    setCyclopediaDesc(newcyclopediadesc);
    setCyclopediaRef(newcyclopediaref);
}

const onEditCancel = () => 
{
    setEditing(false);
}

const onEditSave = async (cyclopedia_id) => {

    const CyclopediaRecordPUT = 
    {
        'cyclopedia_name': cyclopedianame,
        'cyclopedia_desc': cyclopediadesc,
        'cyclopedia_ref': cyclopediaref,
    }

    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${cyclopedia_id}`, CyclopediaRecordPUT)
    setCheckForRecords(!checkForRecords)
    toast.success(`Cyclopedia Record amended.`)
    onEditCancel();
}

function editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref, checkForRecords, setCheckForRecords) {
  return (
      <div>
          <div style={{ display: 'flex' }}>
              <div>
                  {editing === cyclopedia_id ?
                      <>
                          &nbsp;&nbsp;&nbsp;

                          <input
                              required
                              defaultValue={cyclopedia_name}
                              onChange={(e) => setCyclopediaName(e.target.value)}
                              style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '250px', padding: 0, paddingLeft: '9px', }} />
                          &nbsp;&nbsp;

                          <input
                              required
                              defaultValue={cyclopedia_desc}
                              onChange={(e) => setCyclopediaDesc(e.target.value)}
                              style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} />
                      </>
                      :
                      <div className="Font-Calibri-Large-Howto">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cyclopedia_name}.&nbsp;&nbsp;&nbsp;{cyclopedia_desc} {cyclopedia_id}
                      </div>
                  }
              </div>

              <div style={{ display: 'flex', float: 'right' }}>
                  <>
                      {editing === cyclopedia_id ?
                          (
                              <>&nbsp;&nbsp;
                                  <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(cyclopedia_id)}><AiOutlineCheckCircle style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>&nbsp;
                                  <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
                              </>
                          )
                          :
                          (
                              <Tooltip title='Edit Cyclopedia' placement="top-end">
                                  <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(cyclopedia_id, cyclopedia_name, cyclopedia_desc) }}>
                                      <AiOutlineEdit style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '18px' }} /></button>
                              </Tooltip>
                          )
                      }
                  </>
              </div>
          </div>
      </div>
  )
}


  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '100%' }}><img src={One} /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            </td>
          </tr>
        </tbody>
      </table>




      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}></th>
            <th style={{ width: '2%' }}></th>
            <th style={{ width: '46%' }}></th>
            <th style={{ width: '2%' }}></th>
            <th style={{ width: '20%' }}></th>
          </tr>
        </thead>


        <tbody>
          {
            websitedata.map((row, index) => {
              const howtoRow = howtodata[index];
              const cyclopediaRow = cyclopediadata[index]

              return (
                <tr key={index}>

                  <td style={{ width: '20%' }} className="Table-home-left">
                    <Tooltip id="edit" />
                    <a data-tooltip-id="edit" data-tooltip-content={row.website_desc} href={row.website_url} target="_blank">{row.website_name}</a>
                  </td>

                  <td></td>

                  {/* <td style={{ width: '50%' }} className="Table-home-right"> */}
                    {/* <CyclopediaAccordion cyclopediadata={cyclopediadata}/> */}
                    {/* {cyclopediaRow && ( */}
                      {/* <div> */}
                        {/* <a><b><i>{cyclopediaRow.cyclopedia_name}</i>:</b> {cyclopediaRow.cyclopedia_desc}</a> */}
                        {/* <CyclopediaAccordion cyclopediadata={cyclopediadata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
                        {/* {cyclopediadata.map(({ cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref }) => (editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref)))} */}
                      {/* </div> */}
                    {/* )} */}
                  {/* </td> */}

                  <td style={{ width: '50%' }} className="Table-home-right">
                    {cyclopediaRow && (
                      <div>
                        <a><b><i>{cyclopediaRow.cyclopedia_name}</i>:</b> {cyclopediaRow.cyclopedia_desc}</a>
                        {/* {cyclopediadata.map(({ cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref }) => (editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref)))} */}
                      </div>
                    )}
                  </td>



                  <td></td>


                  <td style={{ width: '20%' }} className="Table-home-right">
                    {howtoRow && (
                      <div>
                        <a href={`/howtoedit/${howtoRow.howto_id}`} target="_blank">{howtoRow.howto_name}</a>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <CyclopediaAccordion cyclopediadata={cyclopediadata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
    </div>
  );

}