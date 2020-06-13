const toDoAdd = document.querySelector('#js-toDoAdd')
const toDoForm = document.querySelector('.js-toDoForm')
const toDoInput = toDoForm.querySelector('input')
const toDoList = document.querySelector('.js-toDoList')

// const VISIBLE_CN = 'visible'
const INVISIBLE_CN = 'invisible'
const CHECKED_CN = 'checked'
const TODOS_LS = 'toDos'
let toDos = []

function checkToDo(e) {
  const btn = e.target
  const li = btn.parentNode
  
  const checkedToDos = toDos.filter(function (toDo) {
    if (toDo.id === parseInt(li.id)) {
      if (toDo.checked !== '') {
        li.classList.remove(CHECKED_CN)
        toDo.checked = ''
        return toDo
      } else {
        li.classList.add(CHECKED_CN)
        toDo.checked = true
        return toDo
      }
    } else {
      return toDo
    }
  })
  toDos = checkedToDos
  saveToDos()
}

function deleteToDo(e) {
  const btn = e.target
  const li = btn.parentNode
  toDoList.removeChild(li)

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id)
  })
  toDos = cleanToDos
  saveToDos()
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintTodo(text, checked) {
  const li = document.createElement('li')
  const delBtn = document.createElement('button')
  const chkBtn = document.createElement('button')
  const span = document.createElement('span')
  const toDoId = toDos.length + 1
  chkBtn.innerHTML = '✔️'
  delBtn.innerHTML = '✖️'
  chkBtn.addEventListener('click', checkToDo)
  delBtn.addEventListener('click', deleteToDo)
  span.innerText = text
  
  li.appendChild(span)
  li.appendChild(chkBtn)
  li.appendChild(delBtn)
  li.id = toDoId
  toDoList.appendChild(li)
  
  if (checked === undefined) checked = ''

  const toDoObj = {
    id: toDoId,
    text: text,
    checked: checked
  }

  toDos.push(toDoObj)
  saveToDos()
  toDoForm.classList.remove(VISIBLE_CN)
  toDoAdd.classList.remove(INVISIBLE_CN)
  if (toDoObj.checked === true) li.classList.add(CHECKED_CN)
}

function submitNewTodo(e) {
  e.preventDefault()
  const currentValue = toDoInput.value
  paintTodo(currentValue)
  toDoInput.value = ''
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS)
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos)
    parsedToDos.forEach(function(toDo) {
      paintTodo(toDo.text, toDo.checked)
    })
  }
}

function showInput() {
  toDoForm.classList.add(VISIBLE_CN)
  toDoAdd.classList.add(INVISIBLE_CN)
}

function init() {
  loadToDos()
  toDoForm.addEventListener('submit', submitNewTodo)
  toDoAdd.addEventListener('click', showInput)
}
init()