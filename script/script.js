/*TIPS: *No olvides utilizar el almacenamiento local (localStorage)
 para que las tareas queden guardadas en caso
 de que la aplicación se cierre.*/

// Codigo DOM #1

// Codigo DOM #2

// Codigo DOM #3
// Permite que la acción eliminar impacte el DOM del HTML, acá debes agegar algoritmo de eliminar tarea

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll('.deleteBtn')
    deleteBtn.forEach((db, i) => {
      db.addEventListener('click', () => {
        //Llamar la función que elimina la tarea
        document.querySelectorAll('.deleteBtn')
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
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      // Llamar la función que guarda la actualización la tarea
      document.querySelectorAll('.saveBtn')
    })
  })
}
// Codigo DOM #6
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
