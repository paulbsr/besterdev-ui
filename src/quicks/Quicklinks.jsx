// import * as React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../Fonts.css'
import {styled} from "@mui/material/styles";
import { useUserContext } from '../UserContext';
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

const LinkTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    minWidth: 0,
    fontSize: 12,
    fontWeight: 1,
    paddingLeft: 22,
    paddingRight: 22,
    '&:hover': {color: '#D5441C',},
    '&.Mui-selected': {color: '#1994AD',},
    '&.Mui-selected:hover': {color: '#D5441C',},})
    );

export default function Quicklinks(props) {
  const { loggedInUserEmail } = useUserContext();
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