document.getElementById("myForm").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); 
  var inputText = document.getElementById("city").value;
  initApp(inputText);
};

async function initApp(city) {
  const weatherData = await getWeather(city)
  htmlInsert(weatherData);
};

function htmlInsert(data) {
  document.getElementById('condition').innerHTML = data.condition;
  adjustBackground(data.condition);
  document.getElementById('location').innerHTML = data.name + ', ' + data.country;
  document.getElementById('temp').innerHTML = data.tempC + ' °C';
  document.getElementById('feelsLike').innerHTML = 'feels like: ' + data.feelslikeC + ' °C';
  document.getElementById('wind').innerHTML = 'wind: ' + data.windKph + ' Kph';
  document.getElementById('humidity').innerHTML = 'humidity: ' + data.humidity + '%';
};

function adjustBackground(condition) {
  const background = document.querySelector('body');
  switch (condition) {
    case 'Rainy':
    case 'Light rain':
      background.style.backgroundImage = "url('./img/rainy.jpeg')";
      break;
    case 'Sunny':
      background.style.backgroundImage = "url('./img/sunny.jpeg')";
      break;
    case 'Cloudy':
    case 'Partly cloudy':
      background.style.backgroundImage = "url('./img/cloudy.jpeg')";
      break;
    default:
      background.style.backgroundImage = "url('./img/night.jpg')";
      break;
  }
};

async function getWeather(input) {
  let location = input.toLowerCase();
  const weatherData = await fetch('http://api.weatherapi.com/v1/forecast.json?key=d1c1eb799dd44da58a973116231910&q=' + location + '&days=3&aqi=no&alerts=no', { mode: 'cors' });
  const json = await weatherData.json();
  const filteredJson = filterJson(json);
  return filteredJson;
};

function filterJson(json) {
  const newObj = {
    name: json.location.name,
    country: json.location.country,
    tempC: json.current.temp_c,
    tempF: json.current.temp_f,
    feelslikeC: json.current.feelslike_c,
    feelslikeF: json.current.feelslike_f,
    condition: json.current.condition.text,
    icon: json.current.condition.icon,
    windKph: json.current.wind_kph,
    windMph: json.current.wind_mph,
    humidity: json.current.humidity,
  }
  return newObj;
};

initApp('Chisinau');
