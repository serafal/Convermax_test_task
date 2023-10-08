import React from 'react';
import { useState } from 'react';

function ExactDaysWeek({selected, onChange}) {

  /*const handleChange = (event) => {
    onChange(event.target.value)
  }
  if  {
    return (
      <div>
        <h1>exact_days_week_in_time <input type="text" onChange = {handleChange}/></h1>  
      </div>
  );  
  }
}*/

//Данный компонент отвечает за выдачу CRON-значений соответствующих запросу "Каждую X минуту."
// X * * * *
const handleChange = (event) => {
  onChange(event.target.value) 
}

const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
  event.preventDefault();
}

if (selected === "exact_days_week_in_time") { //Выбор проходит в App.jsx
  return (
    <div>
      <form>
      <h1>Задача будет запускаться каждый указанный день недели:</h1> 
        <input
        min = {1}
        max = {59}
       type="number"
       onChange = {handleChange}
       onKeyDown = {keyDownDisabled}
        />
      </form>
    </div>
);  
}
}

export default ExactDaysWeek;