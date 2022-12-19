//put our api key in a API_KEY variable
const API_KEY="Your_API_KEY";


//fetch the data with async await to get full response
const getCurrentWeatherData=async()=>{
    const city="pune";
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.json()
}
const formatTemperature=(temp)=>`${temp?.toFixed(1)}℃`

//take content from API and put into a current-forecast id
loadCurrentForecast=({name,main:{temp,temp_max,temp_min},weather:[{description}]})=>{
    const currentForecastElement=document.querySelector("#current-forecast");
    currentForecastElement.querySelector(".city").textContent=name;
    currentForecastElement.querySelector(".temp").textContent=formatTemperature(temp);
    currentForecastElement.querySelector(".description").textContent=description;
    currentForecastElement.querySelector(".min-max-temp").textContent=`H:${formatTemperature(temp_max)} L:${formatTemperature(temp_min)}`;

}

//call fuction to get response from the api by async await
document.addEventListener("DOMContentLoaded",async()=>{
       const currentWeather= await getCurrentWeatherData();
       loadCurrentForecast(currentWeather )
 })
