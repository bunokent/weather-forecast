const cityName = document.querySelector(".city-name");
const weather_description = document.querySelector(".weather-description");
const weather_icon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind-speed");
const search = document.querySelector('input[type="text"]');
const search_btn = document.querySelector("button");

let api_link =
  "https://api.openweathermap.org/data/2.5/weather?q=bohol&appid=b901de12351656e3950e4bbd1a41dd43";
async function fetchData() {
  try {
    if (search.value != "")
      api_link = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=b901de12351656e3950e4bbd1a41dd43`;

    const response = await fetch(api_link);
    if (!response.ok) {
      search.style.border = "2px solid #781818";
      document.querySelector(".invalid").classList.remove("hide");
      throw new Error("Could not find city");
    }
    search.style.border = "none";
    document.querySelector(".invalid").classList.add("hide");
    const data = await response.json();
    let temp = data.main.temp - 273.15;
    let icon_link = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    cityName.textContent = data.name;
    weather_description.textContent = data.weather[0].description;
    weather_icon.src = icon_link;
    temperature.textContent = `${temp.toFixed(2)}°`;
    humidity.textContent = `${data.main.humidity}%`;
    wind_speed.textContent = `${data.wind.speed}km/hr`;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();

search_btn.addEventListener("click", fetchData);
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchData();
});
