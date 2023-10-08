import React from 'react';

function TwiceDay({selected, onChange, onHourChange}) {

  const handleHourChange = (event) => {
    let hour_arr = []//Массив хранения значений выбранных часов
    let inputs = document.querySelectorAll('input[type=number]')
    for (let i = 0; i < inputs.length; i++) {
      hour_arr.push(inputs[i].value);
    }
    if (!hour_arr[0] || !hour_arr[1]) { //Если данные не введены
      hour_arr = [];
      hour_arr.push("*"); //Это значение выдаст ошибку на проверке в App
    }
    onHourChange(hour_arr.join(",")) 
  }

  const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
    event.preventDefault();
  }

  if (selected === "twice_day") {
    return (
      <div>
        <form>
        <h1>Задача будет запускаться каждый день, в указанные часы</h1>
         <p>Первый запуск в <input
          min = {0}
          max = {23}
         type="number"
         onChange = {handleHourChange}
         onKeyDown = {keyDownDisabled}
          /> часов <br />
         Второй запуск в <input
          min = {0}
          max = {23}
         type="number"
         onChange = {handleHourChange}
         onKeyDown = {keyDownDisabled}
          /> часов </p>
        </form>
      </div>
  );  
  }
}
//КОМПОНЕНТ ГОТОВ
export default TwiceDay;