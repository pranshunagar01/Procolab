import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 'Read',
  },
  {
    value: 40,
    label: 'Read & Write',
  },
  {
    value: 100,
    label: 'Read, Write & Delete',
  }
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function DiscreteSliderValues(props) {
  return (
    <div style={{margin: '10px 44px'}}>
    <Box sx={{ width: '85%' }}>
      <Slider
        onChange={(e)=>props.setpermissions(e.target.value)}
        aria-label="Restricted values"
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        
        marks={marks}
      />
    </Box>
    </div>
  );
}