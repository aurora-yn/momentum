const greetingForm = document.querySelector('.js-greetingForm')
const input = greetingForm.querySelector('input')
const greeting = document.querySelector('.js-greeting')

const USER_LS = 'currentUser'
const VISIBLE_CN = 'visible'

function saveUser(name) {
  localStorage.setItem(USER_LS, name)
}

function submitName(e) {
  e.preventDefault()
  const currentValue = input.value
  paintGreeting(currentValue)
  saveUser(currentValue)
}

function askName() {
  greetingForm.classList.add(VISIBLE_CN)
  greetingForm.addEventListener('submit', submitName)
}

function editName(e) {
  e.preventDefault()
  localStorage.removeItem(USER_LS)
  greeting.classList.remove(VISIBLE_CN)
  loadName()
}

function paintGreeting(user) {
  const time = new Date()
  const hour = time.getHours()

  greetingForm.classList.remove(VISIBLE_CN)
  greeting.classList.add(VISIBLE_CN)
  
  if (hour < 12) {
    greeting.innerText = `Good morning, ${user}`
  } else if (hour < 18) {
    greeting.innerText = `Good afternoon, ${user}`
  } else if (hour < 24) {
    greeting.innerText = `Good evening, ${user}`
  }
  greeting.addEventListener('click', editName)
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS)
  if (currentUser === null) {
    askName()
  } else {
    paintGreeting(currentUser)
  }
}

function init() {
  loadName()
}
init()