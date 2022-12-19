//put our api key in a API_KEY variable
const API_KEY="ed3bc1def53428b7b7537acd276e8a35";


//fetch the data about weather with async await to get full response
const getCurrentWeatherData=async()=>{
    const city="gopalganj";
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.json()
}

//fetch the data about forecast(time-wise-weather) with async await to get full response
const getHourForecast=async({name:city})=>{
  const response= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  const data=await response.json();

  return data.list.map(forecast=>{
    const {main:{temp,temp_max,temp_min},dt,dt_txt,weather:[{description,icon}]}=forecast;
    return {temp,temp_max,temp_min,dt,dt_txt,description,icon}
  })

}

//add "°"to temperature
const formatTemperature=(temp)=>`${temp?.toFixed(1)}°`

//get icon from url
const createIconUrl=(icon)=>`http://openweathermap.org/img/wn/${icon}@2x.png`;

//take content from API of weather and put into a current-forecast id
loadCurrentForecast=({name,main:{temp,temp_max,temp_min},weather:[{description}]})=>{
    const currentForecastElement=document.querySelector("#current-forecast");
    currentForecastElement.querySelector(".city").textContent=name;
    currentForecastElement.querySelector(".temp").textContent=formatTemperature(temp);
    currentForecastElement.querySelector(".description").textContent=description;
    currentForecastElement.querySelector(".min-max-temp").textContent=`H:${formatTemperature(temp_max)} L:${formatTemperature(temp_min)}`;

}

//take content from API of forecast and put into a hourly-conatiner id

const loadHourlyForecast=(hourlyForecast)=>{
    console.log(hourlyForecast);
    let dataFor12Hours=hourlyForecast.slice(1,13);
    const hourlyContainer=document.querySelector(".hourly-container");
    let innerHTMLString=``;
    for (let{temp,icon,dt_txt} of dataFor12Hours){
        innerHTMLString+=`
        <article>
        <h3 class="time">${dt_txt.split(" ")[1]}</h3>
        <img class="icon" src="${createIconUrl(icon)}"/>
        <p class="hourly-temp">${formatTemperature(temp)}</p>
    </article>
        `
    }
    hourlyContainer.innerHTML=innerHTMLString;
}

//extract feels_like data from response coming out by API
const loadFeelsLike=({main:{feels_like}})=>{
    let container=document.querySelector("#feels-like");
    container.querySelector(".feels-like-temp").textContent =formatTemperature(feels_like);
}

//extract humidity data from response coming out by API
const loadHumidity=({main:{humidity}})=>{
    let container=document.querySelector("#humidity");
    container.querySelector(".humidity-value").textContent =`${humidity} %`;
}


//call fuction to get response from the api by async await
document.addEventListener("DOMContentLoaded",async()=>{
       const currentWeather= await getCurrentWeatherData();
       loadCurrentForecast(currentWeather );
       const hourlyForecast=await getHourForecast(currentWeather);
       loadHourlyForecast(hourlyForecast);
       loadFeelsLike(currentWeather);
       loadHumidity(currentWeather);
 })