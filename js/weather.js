const weather = document.querySelector('.js-weather')
const weatherDetail = document.querySelector('.js-weather-detail')

const API_KEY = '548d0aded0d3190f2ace2c0873d8621c'
const COORDS = 'coords'

function getWeather(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json()
  }).then(function(json) {
    // console.log(json)
    const temperature = json.main.temp
    const temperatureMax = json.main.temp_max
    const temperatureMin = json.main.temp_min
    const place = json.name
    const desc = json.weather[0].main
    weather.innerText = `${desc}, ${temperature}°C at ${place}`
    weatherDetail.innerText = `(Max ${temperatureMax}°C - Min ${temperatureMin}°C)`
  })
}

function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords))
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError() {
  console.log('Cannot get geo location')
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
  const loadCoords = localStorage.getItem('COORDS')
  if (loadCoords == null) {
    askForCoords()
  } else {
    const parsedCoords = JSON.parse(loadCoords)
    getWeather(parsedCoords.latitude, parsedCoords.longitude)
  }
}

function init() {
  loadCoords()
}
init()