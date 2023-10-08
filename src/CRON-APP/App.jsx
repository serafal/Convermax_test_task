import {useState } from "react";
import EachMin from "./subcomponents/each_min";
import EachDay from "./subcomponents/each_day";
import ExactDaysWeek from "./subcomponents/exact_day_week";
import TwiceDay from "./subcomponents/twice_day";
import ExactDayMonth from "./subcomponents/exact_day_month";
import CustomSelect from "./subcomponents/custom-select";


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
        //В этой функции осуществляется парсинг собранных значений в формат CRON.
        let CM = document.forms.cron_mode.cron_mode.value;
            if (CM === "each_min") { //ВЫБРАНА НАСТРОЙКА "КАЖДЫЕ X МИНУТ"
                if (min === "*") { //Проверка на не введённое значение
                    return alert ("Пожалуйста, введите желаемое значение")
                }
                cron_arr_set[0] = "*/" + min;
                cron_arr_set[1] = "*";
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "exact_days_week_in_time") { //ВЫБРАНА НАСТРОЙКА "В ОПРЕДЕЛЁННОЕ ВРЕМЯ В УКАЗАНЫЕ ДНИ"
                if (min === "*" || hour === "*" || week === ("*") ) { //Проверка на не введённое значение
                    return alert ("Пожалуйста, введите желаемое значение")
                }
                cron_arr_set[0] = min;
                cron_arr_set[1] = hour;
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = week;  
            }
            if (CM === "each_day") {  //ВЫБРАНА НАСТРОЙКА "КАЖДЫЙ ДЕНЬ В УКАЗАННЫЙ ЧАС"
                if (hour === "*") { //Проверка на не введённое значение
                    return alert ("Пожалуйста, введите желаемое значение")
                }
                cron_arr_set[0] = "0";
                cron_arr_set[1] = hour;
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "twice_day") { //ВЫБРАНА НАСТРОЙКА "ДВАЖДЫ В ДЕНЬ В УКАЗАННЫЕ ЧАСЫ"
                let hour_arr = hour.split(",")
                setHour(hour_arr.join(","))
                if (hour === "*") { //Проверка на не введённое значение
                    return alert ("Пожалуйста, введите желаемые значения")
                }
                if (hour_arr[0] === "" || hour_arr[1] === "") {
                    return alert ("Пожалуйста, введите желаемое значение")
                }
                if (Number(hour_arr[0]) > Number(hour_arr[1])) {
                    return alert ("Недопустимые вводные данные. Второй запуск должен быть после первого")
                }
                if (Number(hour_arr[0]) === Number(hour_arr[1])) {
                    return alert ("Недопустимые вводные данные. Второй и первый запуск не могут быть даны одновременно")
                } 
                cron_arr_set[0] = "0";
                cron_arr_set[1] = hour;
                cron_arr_set[2] = "*";
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*";  
            }
            if (CM === "exact_day_month") { //ВЫБРАНА НАСТРОЙКА "КАЖДЫЙ УКАЗАННЫЙ ДЕНЬ МЕСЯЦА"
                if (day > 28) {
                  let confirmDate = window.confirm("Введённое значение не рекомендуется к использованию, поскольку не в каждом месяце есть такое число. Желаете ввести эту дату? Если да - задача будет запущена в промежутке между 28-ым числом месяца и указанным числом месяца. После подтверждения, нажмите SAVE ещё раз");
                  if (confirmDate) {
                    return setDay("28-" + day) 
                  }
                  else return  
                }
                cron_arr_set[0] = "0";
                cron_arr_set[1] = "0";
                cron_arr_set[2] = day;
                cron_arr_set[3] = "*";
                cron_arr_set[4] = "*"; 
            }
            if (CM === "custom") {
                cron_arr_set[0] = min;
                cron_arr_set[1] = hour;
                cron_arr_set[2] = day;
                cron_arr_set[3] = month;
                cron_arr_set[4] = week;  
            }
        setCron(cron_arr_set);
        
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
        <EachMin        selected = {selComp} 
                        onMinChange={handleMinChange}/>
        <ExactDaysWeek  selected = {selComp} 
                        onMinChange={handleMinChange}               
                        onHourChange = {handleHourChange}
                        onWeekChange = {handleWeekChange}/>
        <EachDay        selected = {selComp} 
                        onHourChange={handleHourChange}/>
        <TwiceDay       selected = {selComp}
                        onHourChange={handleHourChange}/>
        <ExactDayMonth  selected = {selComp}
                        onDayChange={handleDayChange}/>
        <CustomSelect   selected={selComp}
                        onMinChange={handleMinChange}
                        onHourChange={handleHourChange}
                        onDayChange={handleDayChange}
                        onMonthChange={handleMonthChange}
                        onWeekChange={handleWeekChange}/>
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