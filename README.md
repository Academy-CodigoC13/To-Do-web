## [DEMO](https://juanchos2905.github.io/)

![image](https://user-images.githubusercontent.com/64823934/184569395-6c5c1217-11e3-4ddf-8502-fd07d6deb405.png)

## ¿Qué es el DOM?

El DOM (Documento Objeto Modelo, en inglés Document Object Model) es la forma en
que la computadora entiende y organiza todo lo que se ve e interactúa en una
página web.

Cada elemento en la página web, como títulos, imágenes, botones y párrafos, se
convierte en una parte del DOM. Esto permite a los programas y scripts
interactuar con la página web, cambiar cosas en ella o responder a las acciones
de los usuarios, _como hacer clic en un botón_.

## Ejemplo de uso querySelector:

Devuelve el primer elemento del documento (utilizando un recorrido primero en
profundidad preordenado de los nodos del documento) que coincida con el grupo
especificado de selectores.

```
element = document.querySelector(selectores);
```

Donde:

º element es un objeto de tipo
[element](https://developer.mozilla.org/es/docs/Web/API/Element).

º selectores es una cadena de caracteres que contiene uno o más
[selectores CSS](https://developer.mozilla.org/es/docs/Learn/CSS/Building_blocks/Selectors)
(en-US) separados por coma.

## Ejemplo de uso querySelectorAll:

El método querySelectorAll() de un Element devuelve una NodeList estática (no
viva) que representa una lista de elementos del documento que coinciden con el
grupo de selectores indicados.

```
elementList = parentNode.querySelectorAll(selectors);
```

Donde:

º Selectors: Es un string que contiene 1 o más selectores para buscar
coincidencias en el DOM.

[Documentación oficial.](https://developer.mozilla.org/es/docs/Web/API/Document/querySelectorAll)

## Manejo del DOM para este proyecto:

1. para modificar el tag HTML <input> que será dónde crearas las tareas al
   presionar enter usa:

1.1 `document.querySelector('.new-todo')`

2. para modificar el tag HTML <ul> que será donde visualizaras todas las tareas
   usa:

2.1 `document.querySelector('.todo-list')`

3. para modificar el tag HTML <section> que será donde visualizaras las
   categorías (Pendiente, completado o todas) usa:

3.1 `document.querySelector('.footer')`

4. para modificar el tag HTML <input> que será para marcar y desmarcar las
   tareas completadas usa:

4.1 `document.querySelectorAll('.toggle')`

5. para modificar el tag HTML <i> que será donde al dar clic podrás eliminar una
   tarea usa:

5.1 `document.querySelectorAll('.deleteBtn')`

6. para modificar el tag HTML <i> que será donde al dar clic podrás acceder a
   modificar una tarea usa:

6.1 `document.querySelectorAll('.editBtn')`

7. para modificar el tag HTML <div> que será donde visualizaras las opciones de
   guardar y cancelar cambios en una tarea

7.1 ` document.querySelectorAll('.update-controller')`

8. para modificar el tag HTML <input> que será el recuadro donde modificaras el
   nombre de la tarea usa:

8.1 `document.querySelectorAll('.input-controller textarea')`

9. para modificar el tag HTML <div> que será donde almacenarás la prioridad de
   la tarea usa:

9.1 `document.querySelectorAll( '.edit-controller select' )[0]`

9.2 `document.querySelectorAll('#priority')`

10. para modificar el tag HTML <div> que será donde almacenarás la categoría de
    la tarea usa:

10.1 `document.querySelectorAll( '.edit-controller select' )[1]`

10.2 `document.querySelectorAll('#category')`

11. para modificar el tag HTML <button> que será donde se guardará y actualizará
    el cambio de nombre de alguna tarea para ello usa:

11.1 `document.querySelectorAll('.saveBtn')`

12. para modificar el tag HTML <button> que será un botón que al darle clic
    cancela un cambio de nombre de alguna tarea, para ello usa:

12.1 `document.querySelectorAll('.cancelBtn')`

## Código del DOM

A continuación, podrás encontrar el código del DOM que sugerimos incluyas/uses
en el archivo script.js (./script/script.js)

_Código DOM #1_

```
document.querySelector('.new-todo').addEventListener('keyup', (event) => {
  if (
    event.keyCode === 13 &&
    document.querySelector('.new-todo').value.length > 0
  ) {
    const item = document.querySelector('.new-todo')
    //Llamar la función que crea la tarea.**
  }
})
```

**LISTENERS**: Se encargan de hacer que los botones respondan a los clics y
realizar las acciones correspondientes (eliminar, editar, guardar, cancelar, dar
prioridad y categoría) además de guardar la información de la página que cuando
se recargue no se reinicien las tareas.

_Código DOM #2:_

```
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
```

_Código DOM #3:_

```
// Permite que la acción eliminar impacte el DOM del HTML, acá debes agegar algoritmo de eliminar tarea

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn')
  deleteBtn.forEach((db, i) => {
    db.addEventListener('click', () => {
      //Llamar la función que elimina la tarea
    })
  })
}
```

_Código DOM #4:_

```

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
```

_Código DOM #5:_

```
// Permite que la acción guardar el nuevo nombre de la tarea cuando decides editar y que impacte el DOM del HTML, acá debes agegar algoritmo de actualizar tarea

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll('.saveBtn')
  const inputs = document.querySelectorAll('.input-controller textarea')
  saveBtn.forEach((sB, i) => {
    sB.addEventListener('click', () => {
      // Llamar la función que guarda la actualización la tarea
    })
  })
}
```

_Código DOM #6:_

```
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
```

## Utils

A continuación, les compartimos la explicación de la función display items que
será de gran ayuda para que puedas mostrar en pantalla las tareas creadas.

**displayItems():** La función llamada displayItems que genera y muestra
elementos en una lista en el DOM. Aquí tienes una explicación breve de lo que
hace el código:

La función displayItems comienza definiendo una variable llamada items como una
cadena vacía. Esta variable se utilizará para acumular el HTML de los elementos
que se generarán.

Luego, entra en un bucle for que recorre cada elemento en la matriz itemsArray.

Dentro del bucle, se agrega una cadena de plantilla literal que contiene el HTML
para representar un elemento en la lista de tareas. El HTML incluye una casilla
de verificación, un cuadro de texto, selectores de prioridad y categoría, íconos
de edición y eliminación, y botones de guardar y cancelar.

Se utilizan expresiones condicionales dentro de las plantillas literales para
determinar si ciertos atributos deben estar presentes o no. Por ejemplo, se
utiliza ${itemsArray[i].checked ? 'checked' : ''} para determinar si la casilla
de verificación debe estar marcada o no.

Una vez que se ha generado el HTML para todos los elementos en itemsArray, se
asigna la cadena items al contenido HTML del elemento con la clase .todo-list.
Esto actualiza la lista de tareas en el DOM con los nuevos elementos generados.

Después de actualizar el DOM, se llama a varias funciones
(activateCheckboxListeners, activateDeleteListeners, activateEditListeners,
activateSaveListeners y activateCancelListeners) que probablemente están
diseñadas para asignar oyentes de eventos a los elementos recién generados para
manejar las interacciones del usuario, como marcar tareas como completadas,
editar tareas, eliminar tareas, etc.

En resumen, la función displayItems toma la información en itemsArray, genera el
HTML necesario para mostrar cada elemento en la lista de tareas y actualiza el
DOM con estos elementos. También activa oyentes de eventos para manejar las
interacciones del usuario con los elementos generados.

**displayFooter():** La función `displayFooter` genera y muestra el HTML
correspondiente al pie de página (footer) de la aplicación de lista de tareas.
Aquí está una explicación breve de lo que hace esta porción de código:

1. La función `displayFooter` define una variable llamada `page` que contiene
   una cadena de plantilla literal. Esta cadena de plantilla contiene el HTML
   para el pie de página de la aplicación.

2. Dentro del HTML del pie de página, hay varios elementos que se explican a
   continuación:

   - Se define un elemento `<footer>` con la clase `.footer` para representar el
     área del pie de página.

   - Se agrega un elemento `<span>` con la clase `.todo-count` que muestra la
     cantidad de tareas pendientes. El valor es obtenido llamando a la función
     `countPend()`, que probablemente devuelve el número de tareas pendientes.

   - Se crea una lista desordenada `<ul>` con la clase `.filters` que contiene
     tres elementos de lista `<li>`. Cada `<li>` contiene un enlace `<a>` que
     representa un filtro para mostrar tareas. Los filtros disponibles son
     "Todos", "Pendientes" y "Completados". Estos enlaces pueden tener atributos
     `onclick` que llaman a funciones como `showAll()`, `showPend()` y
     `showComp()`, que probablemente cambian la visualización de las tareas
     según el filtro seleccionado.

   - Se incluye un botón `<button>` con la clase `.clear-completed` que tiene un
     atributo `onclick` que llama a la función `borrarCompletados()`. Este botón
     se usa para borrar las tareas completadas.

3. Después de construir el HTML para el pie de página, la función establece el
   contenido HTML del elemento con la clase `.footer` (probablemente algún
   contenedor en tu aplicación) utilizando la cadena `page`.

En resumen, la función `displayFooter` genera y muestra en el DOM el pie de
página de una aplicación de lista de tareas. El pie de página incluye
información sobre el recuento de tareas pendientes, opciones de filtro para
mostrar diferentes tipos de tareas y un botón para borrar tareas completadas.
