/*TIPS: *No olvides utilizar el almacenamiento local (localStorage)
 para que las tareas queden guardadas en caso
 de que la aplicación se cierre.*/
 let itemsArray = localStorage.getItem("items") ? JSON.parse (localStorage.getItem("items")):[];
function crearTarea (nombreTarea) {
  let objetoTarea = {
    thing: nombreTarea,
    checked: false,
    priority: "Alta",
    category: "Hogar",
  };

  itemsArray.push(objetoTarea);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
  console.log(itemsArray)
}

function borrarTarea(posicion) {
  itemsArray.splice(posicion, 1);
  itemsArray = itemsArray.filter((tarea, i)=> i !== posicion && tarea);

  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function actualizarTarea (tarea, posicion){
  itemsArray[posicion].thing=tarea
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}

function countPend() {
  const contadorPendientes = itemsArray.filter(
    (tarea) => tarea.checked===false
  );
  return contadorPendientes.length;
}
/* 
El siguiente código lo podrás usar para renderizar en tu front el panel de 
cada tarea de tu aplicación
*/
function displayItems() {
  let items = ''
  for (let i = 0; i < itemsArray.length; i++) {
    items += `    <div class="item">
                    <div class="input-controller">
                      <input class="toogle" type="checkbox" id="check_${i}" ${
      itemsArray[i].checked ? 'checked' : ''
    } />
                      <textarea disabled>${itemsArray[i].thing}</textarea>
                      <div class="edit-controller">
                        <div>
                          Prioridad
                          <select id="priority">
                            <option ${
                              itemsArray[i].priority === 'Alta'
                                ? 'selected'
                                : ''
                            }>Alta</option>
                            <option ${
                              itemsArray[i].priority === 'Media'
                                ? 'selected'
                                : ''
                            }>Media</option> 
                            <option ${
                              itemsArray[i].priority === 'Baja'
                                ? 'selected'
                                : ''
                            }>Baja</option> 
                          </select>
                        </div>
                        <div>
                          Categorías
                          <select id="category">
                              <option ${
                                itemsArray[i].category === 'Casa'
                                  ? 'selected'
                                  : ''
                              }>Casa</option> 
                              <option ${
                                itemsArray[i].category === 'Trabajo'
                                  ? 'selected'
                                  : ''
                              }>Trabajo</option> 
                              <option ${
                                itemsArray[i].category === 'Estilo de vida'
                                  ? 'selected'
                                  : ''
                              }>Estilo de vida</option> 
                            </select>
                        </div>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                        <i class="fa-solid fa-x deleteBtn"></i>
                      </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                     <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>`
  }
  document.querySelector('.todo-list').innerHTML = items
  activateCheckboxListeners()
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function displayFooter() {
  let page = `
     
      <footer class="footer">
       
        <span class="todo-count"><strong>${countPend()}</strong> pendiente(s)</span>
        
        <ul class="filters">
          <li>
            <a onclick="showAll() "class="selected filtro" href="#/">Todos</a>
          </li>
          <li>
            <a onclick="showPend()" class="filtro" href="#/active">Pendientes</a>
          </li>
          <li>
            <a onclick="showComp()" class="filtro" href="#/completed">Completados</a>
          </li>
        </ul>
        <button onclick="borrarCompletados()" id="clear-completed" class="clear-completed">Borrar completados</button>
      </footer>
    `
  document.querySelector('.footer').innerHTML = page
}

// Codigo DOM #1
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo')
    //Llamar la función que crea la tarea.**
    // console.log(item.value);
    crearTarea(item.value);
  }
})

// Codigo DOM #2
// este fragmento permite conservar el estado del checkbox (true o false) en el localStorage

function activateCheckboxListeners() {
  const checkboxes = document.querySelectorAll('.toggle')
  checkboxes.forEach((ch, i) => {
    ch.addEventListener('click', () => {
      itemsArray[i].checked = ch.checked
      localStorage.setItem('items', JSON.stringify(itemsArray))
      location.reload
    });
  });
}
// Codigo DOM #3

// Permite que la acción eliminar impacte el DOM del HTML, acá debes agegar algoritmo de eliminar tarea

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn')
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      //Llamar la función que elimina la tarea
      borrarTarea(i);
    })
  })
}

// Codigo DOM #4

// Permite que la acción editar de las 2 listas desplegables "prioridad" y "categoría" impacte el DOM del HTML cuando cambies de opción, inserta este código tal cual, el reto está en saber en qué parte de tu código debes usarlo.

function activateEditListeners() {
  const editBtn = document.querySelectorAll('.editBtn')
  const updateController = document.querySelectorAll('.update-controller')
  const inputs = document.querySelectorAll('.input-controller textarea')
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
      inputs[i].style.background = "blue"

      prioritySelects.value = itemsArray[i].priority
      categorySelects.value = itemsArray[i].category
    })
  })

  prioritySelects.addEventListener('change', (event) => {
    const selectedIndex = event.target.selectedIndex
    itemsArray[i].priority = event.target.options[selectedIndex].text
    localStorage.setItem('items', JSON.stringify(itemsArray))
  })

  categorySelects.addEventListener('change', (event) => {
    const selectedIndex = event.target.selectedIndex
    itemsArray[i].category = event.target.options[selectedIndex].text
    localStorage.setItem('items', JSON.stringify(itemsArray))
  })
}
// Codigo DOM #5
// Permite que la acción guardar el nuevo nombre de la tarea cuando decides editar y que impacte el DOM del HTML, acá debes agegar algoritmo de actualizar tarea

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      // Llamar la función que guarda la actualización la tarea
      actualizarTarea(inputs[i].value, i);
    })
  })
}

// Codigo DOM #6
// Esta es la lógica para el botón "cancelar" cuando presionas editar una tarea, inserta este código tal cual, el reto está en saber en qué parte de tu código debes usarlo.

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
//El sistema debe permitir EDITAR o MODIFICAR una tarea.

//El sistema debe permitir ELIMINAR una tarea.

//El sistema debe permitir AGREGAR una o varias tareas tarea.

//El sistema deber permitir MARCAR una tarea como completada

//El sistema debe permitir dar diferentes PRIORIDADES a las tareas
//EJEMPLO:

//Sacar la basura - Prioridad: media

//El sistema debe permitir visualizar tareas por CATEGORÍAS o ETIQUETAS
//EJEMPLO:

/*Categorías disponibles: PENDIENTE, COMPLETADO o TODASE.T.C */

//Recordar llamar las funciones displayItems() y displayFooter() para mostrar
//las tareas en pantalla
displayFooter()
displayItems()
