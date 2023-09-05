//Funcion para el boton de mostrar todas las tareas.
function showAll(){
    const verTodos = document.querySelectorAll(".input-controller");

    verTodos.forEach((element) => {
        const marcado = element.querySelector(".toggle");
        element.style.display = "";
    });
    
    localStorage.setItem("items", JSON.stringify(itemsArray));
}