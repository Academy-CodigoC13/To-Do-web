document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo');
    // Llamar la función que crea la tarea.
    createTask(item.value);
    item.value = ''; // Limpiar el campo de entrada.
  }
});

function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle');
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('click', () => {
      itemsArray[i].checked = ch.checked;
      localStorage.setItem('items', JSON.stringify(itemsArray));
    });
  });
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      // Llamar la función que elimina la tarea.
      deleteTask(i);
    });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll('.editBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  const prioritySelects = document.querySelectorAll(
    '.edit-controller select'
  )[0];
  const categorySelects = document.querySelectorAll(
    '.edit-controller select'
  )[1];

  editBtn.forEach((eb, i) => {
    eb.addEventListener('click', () => {
      updateController[i].style.display = 'block';
      inputs[i].disabled = false;

      prioritySelects.value = itemsArray[i].priority;
      categorySelects.value = itemsArray[i].category;
    });
  });

  prioritySelects.addEventListener('change', (event) => {
    const selectedIndex = event.target.selectedIndex;
    itemsArray[i].priority = event.target.options[selectedIndex].text;
    localStorage.setItem('items', JSON.stringify(itemsArray));
  });

  categorySelects.addEventListener('change', (event) => {
    const selectedIndex = event.target.selectedIndex;
    itemsArray[i].category = event.target.options[selectedIndex].text;
    localStorage.setItem('items', JSON.stringify(itemsArray));
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn');
  const inputs = document.querySelectorAll('.input-controller textarea');
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      // Llamar la función que guarda la actualización de la tarea.
      saveTaskUpdate(i, inputs[i].value);
      inputs[i].disabled = true;
      updateController[i].style.display = 'none';
    });
  });
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll('.cancelBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener('click', () => {
      updateController[i].style.display = 'none';
      inputs[i].disabled = true;
      inputs[i].style.border = 'none';
    });
  });
}

