import React from 'react';

function ExactDayMonth({selected, onChange, onDayChange}) {

  const handleDayChange = (event) => {
    onDayChange(event.target.value) 
  }

  const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
    event.preventDefault();
  }

  if (selected === "exact_day_month") {
    return (
      <div>
        <form>
        <h1>Задача будет запускаться каждый указанный день месяца</h1>
          <input
          min = {1}
          max = {31}
         type="number"
         onChange = {handleDayChange}
         onKeyDown = {keyDownDisabled}
          />
        </form>
      </div>
  );  
  }
}

export default ExactDayMonth;