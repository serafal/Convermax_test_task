import { useState } from "react";

function CRON_APP() {

    const [min, setMin] = useState ("*") //Передача состояния минутного символа
    const [hour, setHour] = useState ("*") //Передача состояния часового символа
    const [day, setDay] = useState ("*") //Передача состояния дневного символа
    const [month, setMonth] = useState ("*") //Передача состояния месячного символа
    const [week, setWeek] = useState ("*") //Передача состояния недельного символа

    const [cron_arr, setCron] = useState(["*","*","*","*","*"]); //Начальный массив хранения CRON-строки 
    let cron_arr_set = Object.assign([], cron_arr); //Основной массив для хранения CRON-строки (ОМХ)

    function save_button() { //Функция кнопки SAVE для занесения данных в строку CRON. ЗДЕСЬ ВСЁ ХОРОШО.

        cron_arr_set[0] = min;
        cron_arr_set[1] = hour;
        cron_arr_set[2] = day;
        cron_arr_set[3] = month;
        cron_arr_set[4] = week;
        setCron(cron_arr_set);
    }

    function test_function() { //ТЕСТ-функция (для релиза - УДАЛИТЬ)
        setMin(10);
    }
    
   return (
    <div className="CronApp">
        <h1>Редактор CRON-раписания</h1>
        <h3>Минутный символ</h3>
        <input
            value={min} 
            type="text"
        />
        <input      //Ввод минутного символа (ДАЛЕЕ РЕАЛИЗОВАТЬ ЧЕРЕЗ НАСТРОЙКУ)
            id="min"
            type="text"
            onChange={event => setMin(event.target.value)}
        />
        <h3>Часовой символ</h3>
        <input
            value={hour} 
            type="text"
        />
        <input      //Ввод часового символа (ДАЛЕЕ РЕАЛИЗОВАТЬ ЧЕРЕЗ НАСТРОЙКУ)
            id="hour"
            type="text"
            onChange={event => setHour(event.target.value)}
        />
        <h3>Дневной символ</h3>
        <input
            value={day} 
            type="text"
        />
        <input      //Ввод дневного символа (ДАЛЕЕ РЕАЛИЗОВАТЬ ЧЕРЕЗ НАСТРОЙКУ)
            id="day"
            type="text"
            onChange={event => setDay(event.target.value)}
        />
        <h3>Месячный символ</h3>
        <input
            value={month} 
            type="text"
        />
        <input      //Ввод месячного символа (ДАЛЕЕ РЕАЛИЗОВАТЬ ЧЕРЕЗ НАСТРОЙКУ)
            id="month"
            type="text"
            onChange={event => setMonth(event.target.value)}
        />
        <h3>Недельный символ</h3>
        <input
            value={week} 
            type="text"
        />
        <input      //Ввод недельного символа (ДАЛЕЕ РЕАЛИЗОВАТЬ ЧЕРЕЗ НАСТРОЙКУ)
            id="week"
            type="text"
            onChange={event => setWeek(event.target.value)}
        />
        <h2>CRON-строка</h2>
        <input //Инпут конечного вывода строки CRON
            id="cron_main"
            type="text"
            value={cron_arr_set.join(" ")}
         />
         <button type="button" onClick={() => save_button()}>SAVE</button> {/*Занесение введённых данных в ОМХ*/}

         <button type="button" onClick={() => test_function()}>TEST</button> {/*Кнопка для тестирования различных моментов (ДЛЯ РЕЛИЗА - УДАЛИТЬ) */}
    </div> 
   ) 
}

export default CRON_APP;