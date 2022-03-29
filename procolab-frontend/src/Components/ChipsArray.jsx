import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {


  const handleDelete = (chipToDelete) => () => {
    props.setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  return (
      <div style={{marginTop: '15px'}}>
          {/*<div style={{marginBottom: '0'}}>
            {(errorornot==="error")?<TextField error id="outlined-error" label="Limit reached" defaultValue="Limit reached" helperText={String(props.chipData.length)+"/10"}/>:<TextField onKeyPress={(event)=>{if(event.charCode === 13){onAddTagClick()}}} id="outline" label="Add People" color="primary" variant="outlined" helperText={String(props.chipData.length)+"/10"} onChange={(e)=>{setcurrentText(e.target.value);}}/>}
          </div>*/}
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0,
        mt: 1,
        minHeight: '30px',
        border: 'none',
        boxShadow: 'none'
      }}
      component="ul"
    >
      {props.chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
    </div>
  );
}
