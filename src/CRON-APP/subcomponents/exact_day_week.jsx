import React from 'react';

function ExactDaysWeek({selected, onChange, onMinChange, onHourChange, onWeekChange, onClick}) {

//Данный компонент отвечает за выдачу CRON-значений соответствующих запросу "Каждый указанный день недели в указанное время"
// X Y * * Z1,Z2,Z3...

const handleMinChange = (event) => { //Отслеживаем изменения MIN
  onMinChange(event.target.value) 
}

const handleHourChange = (event) => { //Отслеживаем изменения Hour
  onHourChange(event.target.value) 
}

const handleWeekChange = (event) => { //Отслеживаем изменения Week
  let week_arr = [] //Массив хранения значений выбранных дней
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
  for (let i = 0; i < checkboxes.length; i++) {
    week_arr.push(checkboxes[i].value)
  }
  if (week_arr.length === 0) { //Если данные не введены
    week_arr.push("*");
  }
  onWeekChange(week_arr.join(",")) 
}

const keyDownDisabled = (event) => {//Отключаем ручной ввод в input
  event.preventDefault();
}

if (selected === "exact_day_week") { //Выбор проходит в App.jsx
  return (
    <div>
      <form name='week_checkbox'>
      <h1>Задача будет запускаться каждый указанный день недели:</h1> 
      <input type="checkbox" name = "week_checkbox" value="1" id="exact_day_week_1" onClick={handleWeekChange}/>Понедельник <br></br>
      <input type="checkbox" name = "week_checkbox" value="2" id="exact_day_week_2" onClick={handleWeekChange}/>Вторник <br></br>
      <input type="checkbox" name = "week_checkbox" value="3" id="exact_day_week_3" onClick={handleWeekChange}/>Среда <br></br>
      <input type="checkbox" name = "week_checkbox" value="4" id="exact_day_week_4" onClick={handleWeekChange}/>Четверг <br></br>
      <input type="checkbox" name = "week_checkbox" value="5" id="exact_day_week_5" onClick={handleWeekChange}/>Пятница <br></br>
      <input type="checkbox" name = "week_checkbox" value="6" id="exact_day_week_6" onClick={handleWeekChange}/>Суббота <br></br>
      <input type="checkbox" name = "week_checkbox" value="7" id="exact_day_week_7" onClick={handleWeekChange}/>Воскресенье <br></br>
      <p>В <input type="number"
        name=""
        id="exact_day_week_hour"
        min = {0}
        max = {23}
        onChange={handleHourChange}
        onKeyDown = {keyDownDisabled}/> часов
      и <input type="number"
        name=""
        id="exact_day_week_min"
        min = {0}
        max = {59}
        onChange={handleMinChange}
        onKeyDown = {keyDownDisabled}/>  минут</p>
      </form>
    </div>
);  
}
}
//КОМПОНЕНТ ГОТОВ
export default ExactDaysWeek;