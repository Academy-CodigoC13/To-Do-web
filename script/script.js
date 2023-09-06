let itemsArray = [];

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    itemsArray = JSON.parse(savedItems);
    displayItems();
    displayFooter();
  }
}

// Función para guardar las tareas en el almacenamiento local
function saveTasks() {
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

function createTask(taskText) {
  itemsArray.push({
    text: taskText,
    checked: false,
    priority: 'Media', // Prioridad por defecto
    category: 'Sin categoría', // Categoría por defecto
  });
  saveTasks();
  displayItems();
  displayFooter();
}

function editTask(index, newText) {
  itemsArray[index].text = newText;
  saveTasks();
  displayItems();
}

function deleteTask(index) {
  itemsArray.splice(index, 1);
  saveTasks();
  displayItems();
  displayFooter();
}

function clearCompletedTasks() {
  itemsArray = itemsArray.filter((item) => !item.checked);
  saveTasks();
  displayItems();
  displayFooter();
}

function showAllTasks() {
  displayItems();
}

function showPendingTasks() {
  const pendingTasks = itemsArray.filter((item) => !item.checked);
  displayItems(pendingTasks);
}

function showCompletedTasks() {
  const completedTasks = itemsArray.filter((item) => item.checked);
  displayItems(completedTasks);
}

function toggleTaskCompletion(index) {
  itemsArray[index].checked = !itemsArray[index].checked;
  saveTasks();
  displayFooter();
}

// Resto del código para mostrar tareas y el pie de página

// Llamar a las funciones para activar los oyentes de eventos después de cargar y mostrar las tareas
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  displayItems();
  displayFooter();
});

// Agregar evento al campo de entrada para crear tareas
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && document.querySelector('.new-todo').value.length > 0) {
    const item = document.querySelector('.new-todo').value;
    createTask(item);
    document.querySelector('.new-todo').value = '';
  }
});

// Función para mostrar el pie de página con estadísticas
function displayFooter() {
  const footer = document.querySelector('.footer');
  const todoCount = itemsArray.filter((item) => !item.checked).length;
  const clearCompletedBtn = document.querySelector('.clear-completed');

  if (itemsArray.length > 0) {
    footer.style.display = 'block';
    const itemCountLabel = todoCount === 1 ? ' tarea pendiente' : ' tareas pendientes';
    footer.innerHTML = `
      <span class="todo-count">${todoCount}${itemCountLabel}</span>
      <ul class="filters">
        <li><a href="#" class="filter-button" data-filter="all">Todas</a></li>
        <li><a href="#" class="filter-button" data-filter="active">Pendientes</a></li>
        <li><a href="#" class="filter-button" data-filter="completed">Completadas</a></li>
      </ul>
      <button class="clear-completed">Borrar Completadas</button>
    `;

    // Agregar evento al botón "Borrar Completadas"
    clearCompletedBtn.addEventListener('click', () => {
      clearCompletedTasks();
    });

    // Agregar evento a los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = event.target.getAttribute('data-filter');
        if (filter === 'all') {
          showAllTasks();
        } else if (filter === 'active') {
          showPendingTasks();
        } else if (filter === 'completed') {
          showCompletedTasks();
        }
      });
    });
  } else {
    footer.style.display = 'none';
  }
}

// Función para mostrar las tareas en la lista
function displayItems(filteredItems = itemsArray) {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';
  filteredItems.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${item.checked ? 'checked' : ''}>
        <label>${item.text}</label>
        <button class="deleteBtn"><i class="fas fa-trash"></i> Eliminar</button>
        <button class="editBtn"><i class="fas fa-edit"></i> Editar</button>
      </div>
      <div class="update-controller">
        <textarea class="input-controller" disabled>${item.text}</textarea>
        <button class="saveBtn">Guardar</button>
        <button class="cancelBtn">Cancelar</button>
      </div>
    `;
    // Agregar eventos para marcar como completada
    const toggleCheckbox = li.querySelector('.toggle');
    toggleCheckbox.addEventListener('change', () => {
      toggleTaskCompletion(i);
    });
    // Agregar eventos para editar
    const editBtn = li.querySelector('.editBtn');
    const inputController = li.querySelector('.input-controller');
    const saveBtn = li.querySelector('.saveBtn');
    const cancelBtn = li.querySelector('.cancelBtn');
    const updateController = li.querySelector('.update-controller');
    editBtn.addEventListener('click', () => {
      inputController.disabled = false;
      updateController.style.display = 'block';
    });
    saveBtn.addEventListener('click', () => {
      editTask(i, inputController.value);
      inputController.disabled = true;
      updateController.style.display = 'none';
    });
    cancelBtn.addEventListener('click', () => {
      inputController.value = item.text;
      inputController.disabled = true;
      updateController.style.display = 'none';
    });
    // Agregar eventos para eliminar
    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
      deleteTask(i);
    });

    todoList.appendChild(li);
  });
}
