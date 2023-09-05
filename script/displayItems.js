/* 
El siguiente código lo podrás usar para renderizar en tu front el panel de 
cada tarea de tu aplicación
*/
function displayItems() {
  let items = ''
  for (let i = 0; i < itemsArray.length; i++) {
    items += `    <div class="item" style="background: ${itemsArray[i].color};">
                    <div class="input-controller">
                      <input class="toggle" type="checkbox" id="check_${i}" ${
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
                                itemsArray[i].category === 'Emprendimiento'
                                  ? 'selected'
                                  : ''
                              }>Emprendimiento</option> 
                            </select>
                        </div>
                        <div>
                          Color
                          <select id="color">
                            <option value="#94D8F6" ${
                              itemsArray[i].color === '#94D8F6'
                                ? 'selected'
                                : ''
                            }>Azul</option>
                            <option value="#FBCFD0" ${
                              itemsArray[i].color === '#FBCFD0'
                                ? 'selected'
                                : ''
                            }>Rojo</option> 
                            <option value="#C8EFD4" ${
                              itemsArray[i].color === '#C8EFD4'
                                ? 'selected'
                                : ''
                            }>Verde</option>
                            <option value="#FFE5D4" ${
                              itemsArray[i].color === '#FFE5D4'
                                ? 'selected'
                                : ''
                            }>Naranja</option>
                            <option value="#D3D5F5" ${
                              itemsArray[i].color === '#D3D5F5'
                                ? 'selected'
                                : ''
                            }>Morado</option>
                          </select>
                        </div>
                        <img src="icons/edit.svg" class="editBtn">
                        <img src="icons/x.svg" class="deleteBtn">
                      </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                     <button class="cancelBtn">Cancel</button>
                    </div>
                  </div>`;
  }
  document.querySelector('.todo-list').innerHTML = items
  activateCheckboxListeners()
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}
