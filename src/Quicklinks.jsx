import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './Fonts.css'
import {styled} from "@mui/material/styles";

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
    '&.Mui-selected': {color: 'grey',},
    '&.Mui-selected:hover': {color: '#D5441C',},})
    );

export default function Quicklinks() {

  return (
    <>
      <Box>
        <LinkTabs variant="scrollable">
          <LinkTab label="Heroku Dashboard" href={"https://dashboard.heroku.com/apps"} target="_blank" ></LinkTab>
          <LinkTab label="ChatGPT" href={"https://chat.openai.com/"} target="_blank" ></LinkTab>
          <LinkTab label="Cloud UI" href={"https://besterdev-ui-7acbd6898555.herokuapp.com/"} target="_blank" ></LinkTab>
          <LinkTab label="Cloud API" href={"https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/records"} target="_blank" ></LinkTab>
          <LinkTab label="localhost UI" href={"http://localhost:3000/"} target="_blank" ></LinkTab>
          <LinkTab label="localhost API" href={"http://localhost:8000/api/v1/records"} target="_blank" ></LinkTab>
          <LinkTab label="Bester.ie" href={"https://www.bester.ie"} target="_blank" ></LinkTab>
        </LinkTabs>
      </Box>
    </>
  )
}