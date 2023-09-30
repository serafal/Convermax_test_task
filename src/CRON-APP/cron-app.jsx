import { useState } from "react";

function CRON_APP() {

    const [min, setMin] = useState (0) //Передача состояния минутного символа
    const [hour, sethour] = useState (0) //Передача состояния часового символа
    const [day, setday] = useState (0) //Передача состояния дневного символа
    const [month, setmonth] = useState (0) //Передача состояния месячного символа
    const [week, setweek] = useState (0) //Передача состояния недельного символа


   return (
    <div className="CronApp">
        <h1>Редактор CRON-раписания</h1>
        <h3>Минутный символ</h3>
        <input
            value={min} 
            type="text"
        />
        <input       
            id="min"
            type="text"
            onChange={event => setMin(event.target.value)}
        />

        <h2>CRON-строка</h2>
        <input //Инпут конечного вывода строки CRON
            id="cron_main"
            type="text" 
         />
        
    </div> 
   ) 
}

export default CRON_APP;