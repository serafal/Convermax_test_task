import React from 'react';

function EachDay({selected, onHourChange, onChange}) {

  const handleHourChange = (event) => {
    onHourChange(event.target.value) 
  }

  const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
    event.preventDefault();
  }

  if (selected === "each_day") {
    return (
      <div>
        <form>
        <h1>Задача будет запускаться каждый день, в указанный час</h1>
          <input
          id='each_day_hour'
          min = {0}
          max = {23}
         type="number"
         onChange = {handleHourChange}
         onKeyDown = {keyDownDisabled}
          />
        </form>
      </div>
  );  
  }
}
//КОМПОНЕНТ ГОТОВ
export default EachDay;