let itemsArray = [];

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    itemsArray = JSON.parse(savedItems);
    displayItems();
  }
}

// Función para guardar tareas en el almacenamiento local
function saveTasks() {
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

// Función para crear una nueva tarea
function createTask(taskText) {
  itemsArray.push({
    text: taskText,
    checked: false,
  });
  saveTasks();
  displayItems();
}

// Función para eliminar una tarea
function deleteTask(index) {
  itemsArray.splice(index, 1);
  saveTasks();
  displayItems();
}

// Función para guardar la actualización de una tarea
function saveTaskUpdate(index, newText) {
  itemsArray[index].text = newText;
  saveTasks();
}

// Función para mostrar las tareas en la lista
function displayItems() {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';

  itemsArray.forEach((item, i) => {
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
      itemsArray[i].checked = toggleCheckbox.checked;
      saveTasks();
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
      saveTaskUpdate(i, inputController.value);
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

// Llamar a las funciones para activar los oyentes de eventos después de cargar y mostrar las tareas
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  displayItems();
});

// Agregar evento al campo de entrada para crear tareas
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && document.querySelector('.new-todo').value.length > 0) {
    const item = document.querySelector('.new-todo').value;
    createTask(item);
    document.querySelector('.new-todo').value = '';
  }
});

// Función para activar oyentes de eventos en las casillas de verificación
function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle');
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('change', () => {
      itemsArray[i].checked = ch.checked;
      saveTasks();
    });
  });
}

// Función para activar oyentes de eventos en los botones de eliminar tarea
function activateDeleteListeners() {
  const deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach((deleteBtn, i) => {
    deleteBtn.addEventListener('click', () => {
      deleteTask(i);
    });
  });
}

// Función para activar oyentes de eventos en los botones de editar tarea
function activateEditListeners() {
  const editBtns = document.querySelectorAll('.editBtn');
  editBtns.forEach((editBtn, i) => {
    editBtn.addEventListener('click', () => {
      const inputController = document.querySelectorAll('.input-controller')[i];
      inputController.disabled = false;
      const updateController = document.querySelectorAll('.update-controller')[i];
      updateController.style.display = 'block';
    });
  });
}

// Función para activar oyentes de eventos en los botones de guardar tarea editada
function activateSaveListeners() {
  const saveBtns = document.querySelectorAll('.saveBtn');
  saveBtns.forEach((saveBtn, i) => {
    saveBtn.addEventListener('click', () => {
      const inputController = document.querySelectorAll('.input-controller')[i];
      const updateController = document.querySelectorAll('.update-controller')[i];
      saveTaskUpdate(i, inputController.value);
      inputController.disabled = true;
      updateController.style.display = 'none';
    });
  });
}

// Función para activar oyentes de eventos en los botones de cancelar edición
function activateCancelListeners() {
  const cancelBtns = document.querySelectorAll('.cancelBtn');
  cancelBtns.forEach((cancelBtn, i) => {
    cancelBtn.addEventListener('click', () => {
      const inputController = document.querySelectorAll('.input-controller')[i];
      const updateController = document.querySelectorAll('.update-controller')[i];
      inputController.value = itemsArray[i].text;
      inputController.disabled = true;
      updateController.style.display = 'none';
    });
  });
}
