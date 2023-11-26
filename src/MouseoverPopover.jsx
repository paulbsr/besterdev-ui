import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function MouseoverPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {setAnchorEl(event.currentTarget);};
  const handlePopoverClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);

  return (
    <>
      <Typography sx={{fontFamily: 'Verdana', fontSize: '13px'}} aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onClick={handlePopoverClose} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      {props.see}
      </Typography>
     
     
      <Popover
        id="mouse-over-popover"
        sx={{pointerEvents: 'none', fontFamily: 'Verdana'}}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'bottom', horizontal: 'left',}}
        onClose={handlePopoverClose}
        disableScrollLock
        disableAutoFocus
        disableRestoreFocus>
           
        <Typography sx={{ p: 0.5 , fontFamily: 'Verdana', fontSize: '13px', color: '#336791'}}>{props.read}</Typography>
      </Popover>
    </>
  );
}