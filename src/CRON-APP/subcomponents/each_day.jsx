import React from 'react';
import { useState } from 'react';

function DaySelect({selected, onChange}) {

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  if (selected === "each_day") {
    return (
      <div>
        <h1>each_day <input type="text" onChange = {handleChange}/></h1>  
      </div>
  );  
  }
}

export default DaySelect;