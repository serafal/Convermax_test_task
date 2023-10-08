import {useState } from "react";
import MinSelect from "./subcomponents/each_min";
import DaySelect from "./subcomponents/each_day";
import HourSelect from "./subcomponents/exact_day_week";
import MonthSelect from "./subcomponents/twice_day";
import WeekSelect from "./subcomponents/exact_day_month";
import CustomSelect from "./subcomponents/custom-select";
import EachMin from "./subcomponents/each_min";

function CRON_APP(props) {
    
    const [min, setMin] = useState ("*") //Передача состояния минутного символа
        const handleMinChange = (min) => {setMin(min);}

    const [hour, setHour] = useState ("*") //Передача состояния часового символа
        const handleHourChange = (hour) => {setHour(hour);}   

    const [day, setDay] = useState ("*") //Передача состояния дневного символа
        const handleDayChange = (day) => {setDay(day);}

    const [month, setMonth] = useState ("*") //Передача состояния месячного символа
        const handleMonthChange = (month) => {setMonth(month);}

    const [week, setWeek] = useState ("*") //Передача состояния недельного символа
        const handleWeekChange = (week) => {setWeek(week);}

    const [cron_arr, setCron] = useState(["*","*","*","*","*"]); //Начальный массив хранения CRON-строки 
    let cron_arr_set = Object.assign([], cron_arr); //Основной массив для хранения CRON-строки (ОМХ)

    const [selComp, setSelComp] = useState ("minComp") //Выбранный компонент для ввода настроек

    function save_button() { //Функция кнопки SAVE для занесения данных в строку CRON.
        
        let CM = document.forms.cron_mode.cron_mode.value;
            if (CM === "each_min") {
                if (min === "*") { //Проверка на не введённое значение
                    return alert ("Пожалуйста, введите желаемое значение")
                }
                cron_arr_set[0] = min + "/";
                cron_arr_set[1] = "*";
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "exact_days_week_in_time") {
                cron_arr_set[0] = 0;
                cron_arr_set[1] = 0;
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = week;  
            }
            if (CM === "each_day") {
                cron_arr_set[0] = "0";
                cron_arr_set[1] = "0";
                cron_arr_set[2] = 1 + "/";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "twice_day") {
                cron_arr_set[0] = min + "/";
                cron_arr_set[1] = "*";
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "exact_day_month") {
                cron_arr_set[0] = min + "/";
                cron_arr_set[1] = "*";
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "custom") {
                cron_arr_set[0] = min + "/";
                cron_arr_set[1] = "*";
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
        setCron(cron_arr_set);
        console.log(CM)
    }

    const test_function = () => { //ТЕСТ-функция (для релиза - УДАЛИТЬ)
        console.log(document.forms.cron_mode.cron_mode.value)   
    }

   return (
    <div className="CronApp">
        <h1>Редактор CRON-раписания</h1>
        <div className="mode_select">
            <h1>Настройка расписания</h1>
            <h2>1. Выберите, когда задача должна запускаться:</h2>
            <form name="cron_mode">
            <p>
            <input type="radio" name="cron_mode" value="each_min" onClick = {() => setSelComp("each_min")}/>Каждые X минут <br></br>
            <input type="radio" name="cron_mode" value="exact_days_week_in_time" onClick = {() => setSelComp("exact_days_week_in_time")}/>В выбранный день недели<br></br>
            <input type="radio" name="cron_mode" value="each_day" onClick = {() => setSelComp("each_day")}/>Каждый день<br></br>
            <input type="radio" name="cron_mode" value="twice_day" onClick = {() => setSelComp("twice_day")}/>Дважды в день<br></br>
            <input type="radio" name="cron_mode" value="exact_day_month" onClick = {() => setSelComp("exact_day_month")}/>Каждый X день месяца<br></br>
            <input type="radio" name="cron_mode" value="custom" onClick = {() => setSelComp("custom")}/>Пользовательская настройка</p>
            </form>
        </div>
        <EachMin selected = {selComp} onChange={handleMinChange}/>
        <HourSelect selected = {selComp} onChange={handleHourChange}/>
        <DaySelect selected = {selComp} onChange={handleDayChange}/>
        <MonthSelect selected = {selComp} onChange={handleMonthChange}/>
        <WeekSelect selected = {selComp} onChange={handleWeekChange}/>
        <CustomSelect selected={selComp}/>
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