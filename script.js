let taskList = document.getElementById('list-task');
let whatToDoDiv = document.getElementById('whatToDo');
let doneList = document.getElementById('tasks-done');
let addTask = document.getElementById('addTask');
let inputTask = document.getElementById('inputPlace');
let alertDiv = document.getElementById('alert-text');
let clearAllButton = document.getElementById('clearAll');
let clearAllDoneButton = document.getElementById('clearAllDone');
let clearSelectedButton = document.getElementById('clearSelected');
let toUpButton = document.getElementById('toUp');
let toDownButton = document.getElementById('toDown');
let saveListButton = document.getElementById('saveList');
let target = '';
let selected = '';

function createTask(){
  if(inputTask.value === '') {
    alertText();
  } else {
    const liItem = document.createElement('li');
    liItem.className = 'list-group-item list-group-item-secondary text-center'
    liItem.innerHTML = inputTask.value;
    taskList.appendChild(liItem);
    inputTask.value = '';
    alertDiv.innerHTML = '';
  }
}

function doneTask() {
  target = event.target;
  let changeText = target.innerText;
  let changeElement = document.createElement('li');
  changeElement.innerHTML = changeText;
  changeElement.className = 'list-group-item list-group-item-success text-center';
  doneList.appendChild(changeElement);
  target.remove();
}

function changeBack() {
  target = event.target;
  let changeText = target.innerText;
  let changeElement = document.createElement('li');
  changeElement.innerHTML = changeText;
  changeElement.className = 'list-group-item list-group-item-secondary text-center';
  taskList.appendChild(changeElement);
  target.remove();
}

function selectedItem() {
  target = event.target;
  if(selected.id !== undefined){
    selected.id = '';
  }
  target.id = 'active';
  selected = document.getElementById('active');
}

function clearAll() {
  
  if(taskList.innerHTML === '' && doneList.innerHTML === '') {
    let div = document.createElement('div');
    div.className = 'alert text-center alert-success';
    div.innerText = "A lista já está vazia. ;)";
    alertDiv.appendChild(div);
    setTimeout(function(){
      alertDiv.innerHTML = '';
    }, 2000);
  } else {
    let div = document.createElement('div');
    div.className = 'alert text-center alert-success';
    div.innerText = "Lista apagada com sucesso.";
    alertDiv.appendChild(div);
    setTimeout(function(){
      alertDiv.innerHTML = '';  
    },2000);
    taskList.innerHTML = '';
    doneList.innerHTML = '';
  }
}

function adicionarTarefaEnter(tecla) {
  if (tecla.key === 'Enter') {
    createTask(); 
  }
}

function clearAllTaskDone() {
  if(doneList.innerHTML === '') {
    let div = document.createElement('div');
    div.className = 'alert text-center alert-success';
    div.innerText = "Nada para excluir.";
    alertDiv.appendChild(div);
  } else {
    let div = document.createElement('div');
    div.className = 'alert text-center alert-success';
    div.innerText = "Tarefas concluídas excluídas";
    alertDiv.appendChild(div);
    doneList.innerHTML = '';
  }
  setTimeout(function(){
    alertDiv.innerHTML= '';
  }, 2000);
}

function clearSelected() {
  let liSelected = document.getElementById('active');
  taskList.removeChild(liSelected);
  let div = document.createElement('div');
  div.className = 'alert text-center alert-success';
  div.innerText = "Tarefa Excluída.";
  alertDiv.appendChild(div);
  setTimeout(function() {
    alertDiv.innerHTML = '';
  }, 2000);
}

function alertText() {
  let div = document.createElement('div');
  div.className = 'alert text-center alert-danger';
  div.innerText = "Ops. Adicione algo para sua lista";
  alertDiv.appendChild(div);
  setTimeout(function(){
    alertDiv.innerHTML = '';
  }, 2000);
}

function toUp(){
  if (selected.id !== '' ) {
    let whoChange = document.getElementById('active');
    if ( whoChange.previousElementSibling !== null ) {
      let aux = whoChange.previousElementSibling.innerText;
      whoChange.previousElementSibling.innerText = whoChange.innerText;
      whoChange.innerText = aux;
      whoChange.id = '';
      whoChange.previousElementSibling.id = 'active';
      selected = document.getElementById('active');
    }
  }
}

function toDown(){
  if (selected.id !== '') {
    let whoChange = document.getElementById('active');
    if ( whoChange.nextElementSibling !== null ) {
      let aux = whoChange.nextElementSibling.innerText;
      whoChange.nextElementSibling.innerText = whoChange.innerText;
      whoChange.innerText = aux;
      whoChange.id = '';
      whoChange.nextElementSibling.id = 'active';
      selected = document.getElementById('active');
    }
  }
}

function setSavedList() {
  if(taskList.innerHTML === '') {
    localStorage.clear();
    let div = document.createElement('div');
    div.className = 'alert text-center alert-info';
    div.innerText = "Não há nada para salvar.";
    alertDiv.appendChild(div);
  } else {
    let div = document.createElement('div');
    div.className = 'alert text-center alert-success';
    div.innerText = "Lista salva com sucesso.";
    alertDiv.appendChild(div);
    localStorage.setItem('saved list', taskList.innerHTML);
  }
  setTimeout(function(){
    alertDiv.innerHTML = '';
  }, 2000);
}

function getSavedList() {
  const savedList = localStorage.getItem('saved list');
  taskList.innerHTML = savedList;
}

clearAllDoneButton.addEventListener('click', clearAllTaskDone);
inputTask.addEventListener('keyup',adicionarTarefaEnter);
saveListButton.addEventListener('click', setSavedList);
toUpButton.addEventListener('click', toUp);
toDownButton.addEventListener('click', toDown);
clearAllButton.addEventListener('click', clearAll);
taskList.addEventListener('click', selectedItem);
clearSelectedButton.addEventListener('click', clearSelected);
taskList.addEventListener('dblclick', doneTask);
doneList.addEventListener('dblclick', changeBack);
addTask.addEventListener('click', createTask);
window.addEventListener('load', getSavedList());

