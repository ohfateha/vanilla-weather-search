function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city");
  let descElement = document.querySelector("#current-desc");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector(".current-temperature-icon");
  let timeElement = document.querySelector("#current-date");
  let timezoneOffset = response.data.timezone;
  let date = new Date(response.data.dt + timezoneOffset * 1000);
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = temperature;
  descElement.innerHTML = response.data.weather.description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.weather[0]}" alt="weather-icon">`;
  timeElement.innerHTML = formatDate(date);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#inputbox");
  let city = searchInputElement.value;

  let apiKey = "39ad2a3a59aa421537085a78d67b8659";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
