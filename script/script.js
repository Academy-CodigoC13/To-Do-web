let itemsArray = []; // asumiré que este es tu array de tareas.

// Cargar tareas (suponiendo que usas localStorage).
function loadTasks() {
  const storedTasks = localStorage.getItem('items');
  if (storedTasks) {
    itemsArray = JSON.parse(storedTasks);
  }
}

// Mostrar tareas.
function displayItems() {
  const taskContainer = document.querySelector('.todo-list');
  taskContainer.innerHTML = '';

  itemsArray.forEach((task, i) => {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle';
    checkbox.checked = task.checked;

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);
    taskContainer.appendChild(taskElement);
  });

  activateCheckboxListeners();
  activateDeleteListeners();
}

// Mostrar el pie de página (aquí puedes adaptar lo que desees mostrar).
function displayFooter() {
  const footer = document.querySelector('.footer');
  const taskCount = itemsArray.length;

  footer.innerHTML = `${taskCount} tarea${taskCount === 1 ? '' : 's'} pendiente${taskCount === 1 ? '' : 's'}`;
}



