// import * as React from 'react';
import { useState } from 'react';
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import '../Fonts.css'
import GradientLineThin from '../gradientlines/GradientLineThin';
import QuickAddWebResource from './QuickAddWebResource';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 , paddingTop: 2}}>
            {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const LinkTabs = styled(Tabs)({'& .MuiTabs-indicator': {display: 'none',},});

export default function Quicklinks(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);

  return (
    <>
      <Box>
        <LinkTabs variant="scrollable">
          <QuickAddWebResource checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>
        </LinkTabs>
      </Box>
      <GradientLineThin />
    </>
  )
}