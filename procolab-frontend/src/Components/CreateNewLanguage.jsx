import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CreateNewLanguage(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: "223px" }}>
      <FormControl fullWidth>
        <InputLabel id="" style={{backgroundColor: 'white', paddingRight: '5px'}}>Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          onBlur={(e)=>{props.setlanguage(e.target.value)}}
        >
          <MenuItem value={10}>Python</MenuItem>
          <MenuItem value={20}>C/C++</MenuItem>
          <MenuItem value={30}>Javascript</MenuItem>
          <MenuItem value={40}>Java</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}