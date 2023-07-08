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
          <LinkTab label="AWS Amplify Console" href={"https://eu-west-1.console.aws.amazon.com/amplify/home?installation_id=39421369&setup_action=install&region=eu-west-1#/dv43gyvsmgsn1/settings/domains/"} target="_blank" ></LinkTab>
          <LinkTab label="Heroku Dashboard" href={"https://dashboard.heroku.com/apps"} target="_blank" ></LinkTab>
          <LinkTab label="ChatGPT" href={"https://chat.openai.com/"} target="_blank" ></LinkTab>
          <LinkTab label="localhost ui" href={"http://localhost:3000"} target="_blank" ></LinkTab>
          <LinkTab label="Bester.ie" href={"https://www.bester.ie"} target="_blank" ></LinkTab>
        </LinkTabs>
      </Box>
    </>
  )
}