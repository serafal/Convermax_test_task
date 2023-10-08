import React from 'react';
import { useState } from 'react';

function MonthSelect({selected, onChange}) {

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  if (selected === "twice_day") {
    return (
      <div>
        <h1>twice_day <input type="text" onChange = {handleChange}/></h1>  
      </div>
  );  
  }
}

export default MonthSelect;