import React from 'react';
import { useState } from 'react';

function CustomSelect({selected, name}) {

    

  if (selected === "customComp") {
    return (
      <div>
        <h1>Custom-SELECT2 <input type="text" value = {name}/></h1>  
      </div>
  );  
  }
}

export default CustomSelect;