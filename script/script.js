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

// Función para guardar tareas en el almacenamiento local
function saveTasks() {
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

// Función para crear una nueva tarea
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

// Función para eliminar una tarea
function deleteTask(index) {
  itemsArray.splice(index, 1);
  saveTasks();
  displayItems();
  displayFooter();
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
        <select id="priority">
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <select id="priority-category">
      <option value="casa">casa</option>
      <option value="trabajo">trabajo</option>
      <option value="emprendimiento">Emprendimiento</option>
    </select>
      </div>
      <div class="update-controller">
        <textarea class="input-controller" disabled>${item.text}</textarea>
        <button class="saveBtn" onclick="guardarEdicion(${i})">Guardar</button>
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

  // Llamar a las funciones para activar los oyentes de eventos
  activateCheckboxListeners();
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

// Función para activar oyentes de eventos en las casillas de verificación
function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle');
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('change', () => {
      itemsArray[i].checked = ch.checked;
      saveTasks();
      displayFooter();
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
  const editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  const prioritySelects = document.querySelectorAll(
    '.edit-controller select'
  )[0]
  const categorySelects = document.querySelectorAll(
    '.edit-controller select'
  )[1]

  editBtn.forEach((eb, i) => {
    eb.addEventListener('click', () => {
      updateController[i].style.display = 'block'
      inputs[i].disabled = false

      prioritySelects.value = itemsArray[i].priority
      categorySelects.value = itemsArray[i].category
    })
  })

  const selectP = document.querySelectorAll('#priority')
  selectP.forEach((s, i) => {
    s.addEventListener('change', (event) => {
      itemsArray[i].priority = event.target.value
      localStorage.setItem('items', JSON.stringify(itemsArray))
    })
  })

  const selectC = document.querySelectorAll('#category')
  selectC.forEach((s, i) => {
    s.addEventListener('change', (event) => {
      itemsArray[i].category = event.target.value
      localStorage.setItem('items', JSON.stringify(itemsArray))
    })
  })
}

// Función para activar oyentes de eventos en los botones de guardar tarea editada
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll('.cancelBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener('click', () => {
      updateController[i].style.display = 'none'
      inputs[i].disabled = true
      inputs[i].style.border = 'none'
    })
  })
}

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
      itemsArray = itemsArray.filter((item) => !item.checked);
      saveTasks();
      displayItems();
      displayFooter();
    });

    // Agregar evento a los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener('click', (event) => {
        event.preventDefault();
        const filter = event.target.getAttribute('data-filter');
        filterTasks(filter);
      });
    });
  } else {
    footer.style.display = 'none';
  }
}

// Filtrar y mostrar tareas según el filtro seleccionado
function filterTasks(filter) {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';

  itemsArray.forEach((item, i) => {
    if (filter === 'all' || (filter === 'active' && !item.checked) || (filter === 'completed' && item.checked)) {
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
          <select id="priority">
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <select id="priority-category">
      <option value="casa">casa</option>
      <option value="trabajo">trabajo</option>
      <option value="emprendimiento">Emprendimiento</option>
    </select>
        </div>
      `;

      // Agregar eventos para marcar como completada
      const toggleCheckbox = li.querySelector('.toggle');
      toggleCheckbox.addEventListener('change', () => {
        itemsArray[i].checked = toggleCheckbox.checked;
        saveTasks();
        displayFooter();
      });

      // Agregar eventos para editar
      const editBtn = li.querySelector('.editBtn');
      editBtn.addEventListener('click', () => {
        const inputController = document.querySelectorAll('.input-controller')[i];
        inputController.disabled = false;
        const updateController = document.querySelectorAll('.update-controller')[i];
        updateController.style.display = 'block';
      });

      // Agregar eventos para eliminar
      const deleteBtn = li.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', () => {
        deleteTask(i);
      });

      todoList.appendChild(li);
    }
  });

  // Llamar a las funciones para activar los oyentes de eventos
  activateCheckboxListeners();
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}
function updateItem(text, i) {
  itemsArray[i].thing = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function deleteItem(i) {
  itemsArray.splice(i, 1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function createItem(item) {
  const newItem = {
    thing: item.value,
    checked: false,
    disabled: true,
    priority: 'Alta',
    category: 'Casa',
  }
  itemsArray.push(newItem)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

function countPend() {
  let num = itemsArray.length
  localStorage.setItem('items', JSON.stringify(itemsArray))
  return num
}

function showPend() {
  const pendientes = document.querySelectorAll('.input-controller')
  pendientes.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (check.checked) {
      element.style.display = 'none'
    }
    if (!check.checked) {
      element.style.display = ''
    }
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function showComp() {
  const completados = document.querySelectorAll('.input-controller')
  completados.forEach((element) => {
    const check = element.querySelector('.toggle')
    if (!check.checked) {
      element.style.display = 'none'
    }
    if (check.checked) {
      element.style.display = ''
    }
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function showAll() {
  const all = document.querySelectorAll('.input-controller')
  all.forEach((element) => {
    const check = element.querySelector('.toggle')
    element.style.display = ''
  })
  localStorage.setItem('items', JSON.stringify(itemsArray))
}

function borrarCompletados() {
  const completedTasks = itemsArray.filter((item) => item.checked === false)

  localStorage.setItem('items', JSON.stringify(completedTasks))
  location.reload()
} 
// Llamar a la función para cargar tareas al cargar la página
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