/*TIPS: *No olvides utilizar el almacenamiento local (localStorage)
 para que las tareas queden guardadas en caso
 de que la aplicación se cierre.*/

// Codigo DOM #1
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
    if (
      event.keyCode === 13 &&
      document.querySelector('.new-todo').value.length > 0
    ) {
      const item = document.querySelector('.new-todo')
      //Llamar la función que crea la tarea.**
    }
  })
  function agregarTarea(){
    const tarea = document.querySelector('.new-todo')
   tarea.push()
   tarea.value = (agregarTarea)
   
  }
// Codigo DOM #2
// este fragmento permite conservar el estado del checkbox (true o false) en el localStorage

function activateCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.toggle')
    checkboxes.forEach((ch, i) => {
      ch.addEventListener('click', () => {
        itemsArray[i].checked = ch.checked
        localStorage.setItem('items', JSON.stringify(itemsArray))
      })
    })
  }
// Codigo DOM #3

// Codigo DOM #4

// Codigo DOM #5

// Codigo DOM #6

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
