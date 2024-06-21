import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
export default function TaskStatusDropDown() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={30}
          inputProps={{name: 'age', id: 'uncontrolled-native',}}>
          <option value={10}>START</option>
          <option value={20}>WIP</option>
          <option value={30}>DONE</option>
          <option value={30}>PROBLEM</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}