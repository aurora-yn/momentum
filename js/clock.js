const clock = document.querySelector('.js-clock')
const clockDisplay = clock.querySelector('h1')

function getTime() {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  clockDisplay.innerText = `${
    hours < 10 ? `0${hours}` : hours }:${
    minutes < 10 ? `0${minutes}` : minutes }:${
    seconds < 10 ? `0${seconds}`: seconds
  }`
}

function init() {
  setInterval(getTime, 1000)
}
init()