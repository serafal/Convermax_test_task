import React from 'react';
import { useState } from 'react';

function WeekSelect({selected, onChange}) {

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  if (selected === "exact_day_month") {
    return (
      <div>
        <h1>exact_day_month <input type="text" onChange = {handleChange}/></h1>  
      </div>
  );  
  }
}

export default WeekSelect;