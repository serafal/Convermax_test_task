import React from 'react';
import { useState } from 'react';

function EachMin({selected, onChange}) {
//Данный компонент отвечает за выдачу CRON-значений соответствующих запросу "Каждую X минуту."
// X * * * *
  const handleChange = (event) => {
    onChange(event.target.value) 
  }

  const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
    event.preventDefault();
  }

  if (selected === ("each_min")) { //Выбор проходит в App.jsx
    return (
      <div>
        <form>
        <h1>Задача будет запускаться каждые
          <input
          min = {1}
          max = {59}
         type="number"
         onChange = {handleChange}
         onKeyDown = {keyDownDisabled}
          />
           минут.</h1> 
        </form>
      </div>
  );  
  }
}
//КОМПОНЕНТ ГОТОВ
export default EachMin;

