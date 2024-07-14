let city='siliguri';
let api_key='e57645c115893c63d8a07ced5998025c';
const weatherSearchForm=document.querySelector(".weather_search");
 
const weatherCity = document.querySelector('.weather_city');
const weatherDateTime = document.querySelector('.weather_date_time');
const weatherForecast = document.querySelector('.weather_forecast');
const weatherIcon = document.querySelector('.weather_icon');
const weatherTemperature = document.querySelector('.weather_temperature');
const weatherMinMax = document.querySelector('.weather_min_max');
const weatherMin = document.querySelector('.weather_min');
const weatherMax = document.querySelector('.weather_max');

const weatherInfo = document.querySelector('.weather_info');
const weatherFeelsLike = document.querySelector('.weather_feels_like');
const weatherWind = document.querySelector('.weather_wind');
const weatherPressure = document.querySelector('.weather_pressure');
const weatherHumidity = document.querySelector('.weather_Humidity');
const getcountry=(code)=>{
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

const gettime=(dt)=>{
    const currentTime = new Date();
    const options={
          weekday:"long",
          month:"long",
          day:"numeric",
          year:"numeric",
          hour:"numeric",
          minute:"numeric"
    };

    return new Intl.DateTimeFormat("en-us",options).format(currentTime);
/*
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const formattedTime = {
        dayOfWeek: daysOfWeek[currentTime.getDay()],
        month: monthsOfYear[currentTime.getMonth()],
        day: currentTime.getDate(),
        year: currentTime.getFullYear(),
        hours: currentTime.getHours() % 12 || 12, // Convert to 12-hour format
        minutes: currentTime.getMinutes(),
        period: currentTime.getHours() >= 12 ? "pm" : "am"
    };
    
     return (`${formattedTime.dayOfWeek}, ${formattedTime.month} ${formattedTime.day}, ${formattedTime.year} at ${formattedTime.hours}.${formattedTime.minutes.toString().padStart(2, '0')} ${formattedTime.period}`);
  */  
}
const gettemp=(temp)=>{
    const tem=temp-273.15;
    return tem.toFixed();
}
const get_temp=(temp)=>{
    const tem=temp-273.15;
    return tem.toFixed(2);
}
const getdata= async ()=>{

let url=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key}`;
let res=await fetch(url);
let data=await res.json();

let url2=  `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${api_key}`;
let res2=await fetch(url2);
let data2=await res2.json();
//console.log(data[0].country);
//console.log(data);
//console.log(data2);
const {main,weather,wind,dt}=data2;
weatherCity.innerHTML=`${data[0].name},${data[0].state},${getcountry(data[0].country)}`;
weatherDateTime.innerHTML=gettime(dt);
weatherForecast.innerHTML=`${weather[0].description}`;
weatherIcon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
weatherTemperature.innerHTML=`${gettemp(main.temp)}&#176`;
weatherMin.innerHTML=`${get_temp(main.temp_min)}&#176`;
weatherMax.innerHTML=`${get_temp(main.temp_max)}&#176`;
weatherFeelsLike.innerHTML=`${gettemp(main.feels_like)}&#176`;
weatherHumidity.innerHTML=`${main.humidity}%`;
weatherPressure.innerHTML=`${main.pressure} hPa`;
weatherWind.innerHTML=`${wind.speed} m/s`;
}
weatherSearchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    city= document.querySelector('.city_name').value;
    getdata();
    document.querySelector('.city_name').value="";

});
document.body.addEventListener("load",getdata());