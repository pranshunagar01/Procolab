import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
export default function TogglePersonStatus() {
  const [alignment, setAlignment] = React.useState('view');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div style={{margin: '20px 0'}}>
        <div style={{margin: '10px 0 10px 25px'}}><InputLabel id="demo-simple-select-label">Permissions</InputLabel></div>
        <div style={{margin: '0 20px'}}>
        <FormControlLabel style={{display: 'block', margin: '0'}} control={<Checkbox onChange={(e)=>console.log(e)} />} label="Allow to read" />
        <FormControlLabel style={{display: 'block', margin: '0'}} control={<Checkbox />} label="Allow to read and write" />
        <FormControlLabel style={{display: 'block', margin: '0'}} control={<Checkbox />} label="Allow to read, write and delete" />
        </div>
    </div>
  );
}