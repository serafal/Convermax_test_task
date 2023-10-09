import React from 'react';

function CustomSelect({selected, onChange,onMinChange,onHourChange,onDayChange,onMonthChange,onWeekChange}) {

  const handleMinChange = (event) => {
    onMinChange(event.target.value) 
  }
  const handleHourChange = (event) => {
    onHourChange(event.target.value) 
  }
  const handleDayChange = (event) => {
    onDayChange(event.target.value) 
  }
  const handleMonthChange = (event) => {
    onMonthChange(event.target.value) 
  }
  const handleWeekChange = (event) => {
    onWeekChange(event.target.value) 
  }

  if (selected === "custom") {
    return (
      <div>
        <h1>Внимание! Данная консоль предназначена только для опытных пользователей. Вводите данные внимательно</h1>
        <input type="text" id = "custom_min" onChange={handleMinChange}/> Минуты <br />
        <input type="text" id = "custom_hour" onChange={handleHourChange}/> Часы <br />
        <input type="text" id = "custom_day" onChange={handleDayChange}/> Дни <br />
        <input type="text" id = "custom_month" onChange={handleMonthChange}/> Месяцы <br />
        <input type="text" id = "custom_week" onChange={handleWeekChange}/> Недели  <br />
      </div>
  );  
  }
}

export default CustomSelect;