import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import '../Fonts.css';
import 'react-dropdown/style.css';
import HowtoStepAccordion from './HowtoStepAccordion';
import { useWebsiteApi } from '../websites/WebSiteAPIProvider';

export default function HowtoEdit(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [websitedata1, setWebsitedata1] = useState([]);
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContext :-)

  useEffect(() => {
    if (websiterootdata && Array.isArray(websiterootdata)) {
      const filteredwebsites = websiterootdata.filter(site => site.howtoIdFk === props.howto_id);
      const sortedfilteredwebsites = filteredwebsites.sort((a, b) => a.websiteName.localeCompare(b.websiteName));
      setWebsitedata1(sortedfilteredwebsites);
    }
  }, [websiterootdata, props.howto_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const InnerTableLeft = () => {
    const groupedData = {};

    websitedata1.forEach((row) => {
      if (!groupedData[row.websiteCat]) {
        groupedData[row.websiteCat] = [];
      }
      groupedData[row.websiteCat].push(row);
    });

    const sortedCategories = Object.keys(groupedData).sort();

    return (
      <div className="scrollable-container">
        <Tooltip id="insert" />
        <table className="Table-home-left">
          <tbody>
            {sortedCategories.map((category) => (
              <>
                &nbsp;
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                {groupedData[category].map((record, index) => (
                  <tr key={index}>
                    <td style={{ width: '20%', verticalAlign: 'top' }} className="Font-Segoe-Medium-Howto">
                      <a href={record.websiteUrl} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={record.websiteDesc}>
                        {record.websiteName}
                      </a>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <td style={{ width: '25%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }}></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }}></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '25%' }} className="Table-home-left"><InnerTableLeft /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '48%' }} className="Table-home-centre"><HowtoStepAccordion howto_ids={props.howto_id} /></td>
            <td style={{ width: '1%' }}></td>
            <td style={{ width: '25%' }} className="Table-home-right"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
