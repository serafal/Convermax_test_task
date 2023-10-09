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
        let cron_string = document.getElementById("cron_main");
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
            if (CM === "exact_day_week") { //ВЫБРАНА НАСТРОЙКА "В ОПРЕДЕЛЁННОЕ ВРЕМЯ В УКАЗАНЫЕ ДНИ"
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
            if (CM === "custom") { //ВЫБРАНА НАСТРОЙКА "ПОЛЬЗОВАТЕЛЬСКАЯ НАСТРОЙКА"
                cron_arr_set[0] = min;
                cron_arr_set[1] = hour;
                cron_arr_set[2] = day;
                cron_arr_set[3] = month;
                cron_arr_set[4] = week;  
            }
        setCron(cron_arr_set);
        cron_string.value = cron_arr_set.join(' ')//Вывод данных в CRON-строку
    }

    function load_button() { //Функция кнопки LOAD для чтения ввода CRON
    //Получаем строку CRON, парсим её в массив по min,hour.... затем смотрим на значения.
        let cron_input_str = document.getElementById("cron_main").value
        console.log(cron_input_str)
        let cron_input_arr = cron_input_str.split(" ")
        console.log(cron_input_arr)
        
        if (cron_input_arr.length !== 5) { //Проверка на заполненность строки
            return alert ("Введённое значение не является CRON-строкой или не поддерживается в данном редакторе")
        }
        //Проверка на наличие неверных символов
        let regexp_cron_str = /(?!\d{1,2}|\*|\/|,|-)[^ ]+|(\/\*\d{1,2}\*)/;
        if (regexp_cron_str.test(cron_input_str)) { //Всё, кроме одной, или двух цифр, "*", "/", ",", 
          return alert ("Недопустимые вводные символы")  
        }
        
        let regexp_double_star = /[*]{2,}/ //Проверка на дублирование
        for (let i = 0; i < cron_input_arr.length; i++) {
            const element = cron_input_arr[i];
            if (element.match(regexp_double_star)) {//Проверка на дублирование
                return alert ('Недопустимые вводные данные. Проверьте дубликаты символов')
            }
        }

        //Возможные варианты:

        //   Каждые X минут: */7 * * * *
        let each_min_test = /\*\/\d{1,2}/;  
    if (each_min_test.test(cron_input_arr[0]) && cron_input_arr[1] === "*" && cron_input_arr[2] === "*" && cron_input_arr[3] === "*" && cron_input_arr[4] === "*") {
        document.getElementById("each_min").checked = true;
        setSelComp("each_min");
        const infil_values = () => { //Функция переноса данных в выбранный компонент
            let min_input = cron_input_arr[0].replace(/^\D+/g, '')
            if (min_input > 59) {
                return alert ("Слишком большое значение минутного символа. Он должен быть не больше 59")
            }
            document.getElementById('each_min_min').value = min_input
        }
        return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
        }
        //   Каждые X минут: */7 * * * *
    
        
        //   В выбранный день недели: 20 6 * * 1,2,4
        if (!(/[^0-9]/.test(cron_input_arr[0])) && !(/[^0-9]/.test(cron_input_arr[1])) && cron_input_arr[2] === "*" && cron_input_arr[3] === "*" && cron_input_arr[4] !== "*") {
        let min_input = cron_input_arr[0]
        let hour_input = cron_input_arr[1]
        let week_input = cron_input_arr[4].split(",")
        if (min_input > 59 || hour_input > 23) {
            return alert ("Слишком большое значение минутного или часового символа. Он должен быть не больше 59 и 23 соответственно")
        }
        document.getElementById("exact_day_week").checked = true;
        setSelComp("exact_day_week");
        const infil_values = () => { //Функция переноса данных в выбранный компонент
            document.getElementById('exact_day_week_min').value = min_input
            document.getElementById('exact_day_week_hour').value = hour_input
            for (let i = 0; i < week_input.length; i++) {
                const element = week_input[i]; //week_input[0] = 1
                document.getElementById("exact_day_week_" + element).checked = true
            }
      }
        return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
    }
    //   В выбранный день недели: 20 6 * * 1,2,4



        //   Каждый день: 0 12 * * *
        if (!(/[^0]/.test(cron_input_arr[0])) && !(/[^0-9]/.test(cron_input_arr[1])) && cron_input_arr[2] === "*" && cron_input_arr[3] === "*" && cron_input_arr[4] === "*") {
            let hour_input = cron_input_arr[1]   
            if (hour_input > 23) {
                return alert ("Слишком большое значение часового символа. Он должен быть не больше 23")
            }
            document.getElementById("each_day").checked = true;
            setSelComp("each_day");
            const infil_values = () => { 
            document.getElementById('each_day_hour').value = hour_input
            }
            return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
        }
        //   Каждый день: 0 12 * * *



        //   Дважды в день: 0 4,10 * * *
        if (!(/[^0]/.test(cron_input_arr[0])) && (/[0-9]{1,2},[0-9]{1,2}/.test(cron_input_arr[1])) && cron_input_arr[2] === "*" && cron_input_arr[3] === "*" && cron_input_arr[4] === "*") {
            let hour_input_arr = cron_input_arr[1].split(',')   //Разбиваем два числа часового символа на массив
            let hour_input_1 = hour_input_arr[0];
            let hour_input_2 = hour_input_arr[1];
            if (hour_input_1 > 23 || hour_input_2 > 23) {
                return alert ("Слишком большое значение одного или двух часовых символов. Он должен быть не больше 23")
            }
            if (hour_input_1 > hour_input_2) {
                return alert ("Недопустимый ввод. Первый запуск не может идти после второго")
            }
            if (hour_input_1 === hour_input_2) {
                return alert ("Недопустимый ввод. Первый и второй запуски не могут быть даны одновременно")
            }
            document.getElementById("twice_day").checked = true;
            setSelComp("twice_day");
            const infil_values = () => {
            document.getElementById('twice_day_1').value = hour_input_1
            document.getElementById('twice_day_2').value = hour_input_2
            }
            return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
        }
        //   Дважды в день: 0 4,10 * * *



        //   Каждый X день месяца: 0 0 28-30 * *
        if ((/[0]/.test(cron_input_arr[0])) && (/[0]/.test(cron_input_arr[1])) && (!(/[^0-9]/.test(cron_input_arr[2])) || (/[0-9]{1,2}-[0-9]{1,2}/.test(cron_input_arr[2]))) && cron_input_arr[3] === "*" && cron_input_arr[4] === "*") {
          if (!(/[^0-9]/.test(cron_input_arr[2]))) { //Если символ дня одиночный...
            let day_input = cron_input_arr[2]
            if (day_input > 31) {
               return alert ("Слишком большое значение дневного символа. Он не может быть больше 31")
            }   
            document.getElementById("exact_day_month").checked = true;
            setSelComp("exact_day_month");
            const infil_values = () => { 
            document.getElementById('exact_day_month_day').value = day_input
            }
            return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных  
          }
          if ((/[0-9]{1,2}-[0-9]{1,2}/.test(cron_input_arr[2]))) {//Если символ дня двойной...
            let day_input = cron_input_arr[2].split("-")
            if (day_input[1] > 31) {
                return alert ("Слишком большое значение дневного символа. Он не может быть больше 31")   
            }
            document.getElementById("exact_day_month").checked = true;
            setSelComp("exact_day_month");
            const infil_values = () => { 
            document.getElementById('exact_day_month_day').value = day_input[1]
            }
            return setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
          }
        }
        //   Каждый X день месяца: 0 0 23 * *

        //Разобъём пользовательский ввод
        else {
            document.getElementById("custom").checked = true;
            setSelComp("custom");
            const infil_values = () => { //Функция переноса данных в выбранный компонент
                document.getElementById('custom_min').value = cron_input_arr[0]
                document.getElementById('custom_hour').value = cron_input_arr[1]
                document.getElementById('custom_day').value = cron_input_arr[2]
                document.getElementById('custom_month').value = cron_input_arr[3]
                document.getElementById('custom_week').value = cron_input_arr[4]
            }
        setTimeout(infil_values, 50) //задержка для того, чтобы React успел отрисовать компонент перед внесением в него данных
        }
    }

   return (
    <div className="CronApp">
        <h1>Редактор CRON-раписания</h1>
        <div className="mode_select">
            <h1>Настройка расписания</h1>
            <h2>1. Выберите, когда задача должна запускаться:</h2>
            <form name="cron_mode">
            <p>
            <input type="radio" name="cron_mode" id="each_min" value="each_min" onClick = {() => setSelComp("each_min")}/>Каждые X минут <br></br>
            <input type="radio" name="cron_mode" id="exact_day_week" value="exact_day_week" onClick = {() => setSelComp("exact_day_week")}/>В выбранный день недели<br></br>
            <input type="radio" name="cron_mode" id="each_day" value="each_day" onClick = {() => setSelComp("each_day")}/>Каждый день<br></br>
            <input type="radio" name="cron_mode" id="twice_day" value="twice_day" onClick = {() => setSelComp("twice_day")}/>Дважды в день<br></br>
            <input type="radio" name="cron_mode" id="exact_day_month" value="exact_day_month" onClick = {() => setSelComp("exact_day_month")}/>Каждый X день месяца<br></br>
            <input type="radio" name="cron_mode" id="custom" value="custom" onClick = {() => setSelComp("custom")}/>Пользовательская настройка</p>
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
           // value={cron_arr_set.join(" ")}
         />
         <button type="button" onClick={() => save_button()}>SAVE</button> {/*Занесение введённых данных в ОМХ*/}
         <button type="button" onClick={() => load_button()}>LOAD</button> {/*Кнопка выгрузки данных из строки в редактор */}
        
    </div> 
   ) 
}

export default CRON_APP;