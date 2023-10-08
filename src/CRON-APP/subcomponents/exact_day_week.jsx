import React from 'react';
import { useState } from 'react';

function HourSelect({selected, onChange}) {

  const handleChange = (event) => {
    onChange(event.target.value)
  }
  if (selected === "exact_days_week_in_time") {
    return (
      <div>
        <h1>exact_days_week_in_time <input type="text" onChange = {handleChange}/></h1>  
      </div>
  );  
  }
}

export default HourSelect;