document.getElementById('addDebtBtn').addEventListener('click', function() {
    const formContainer = document.createElement('div');
    formContainer.id = 'debtForm';
    formContainer.style.display = 'block';

    const labelAmount = document.createElement('label');
    labelAmount.textContent = 'Amount:';
    const inputAmount = document.createElement('input');
    inputAmount.type = 'number';
    inputAmount.placeholder = 'Enter the amount';

    const labelDescription = document.createElement('label');
    labelDescription.textContent = 'Description:';
    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.placeholder = 'Debt description';
    
    const labelowner = document.createElement('label');
    labelowner.textContent = 'Owner:';
    const inputowner = document.createElement('input');
    inputowner.type = 'text';
    inputowner.placeholder = 'Owner of the debt'; 

    const submitBtn1 = document.createElement('button');
    submitBtn1.textContent = 'Guardar';
    const submitBtn2 = document.createElement('button');
    submitBtn2.textContent = 'Cancelar';

    submitBtn2.addEventListener('click', function(){
      formContainer.style.display='none';
    });
    submitBtn1.addEventListener('click', function() {
        const amount = inputAmount.value;
        const description = inputDescription.value;
        const owner = inputowner.value;
        
        fetch('http://localhost:4000/api/debts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ dueño: owner, cantidad2: amount, descripcion: description})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Debt saved:', data);
            formContainer.style.display = 'none';
            cargarDeudas(); 
        })
        .catch(error => console.error('Error:', error)); 
    });

    formContainer.appendChild(labelowner);
    formContainer.appendChild(inputowner);
    formContainer.appendChild(labelAmount);
    formContainer.appendChild(inputAmount);
    formContainer.appendChild(labelDescription);
    formContainer.appendChild(inputDescription);
    formContainer.appendChild(submitBtn1);
    formContainer.appendChild(submitBtn2);

    document.getElementById('main').appendChild(formContainer);
});

function cargarDeudas() {
  fetch('http://localhost:4000/api/debts')
    .then(response => response.json())
    .then(deudas => {
      const container = document.getElementById('debtsList');
      container.innerHTML = '';
      
      deudas.forEach(deuda => {
        const debtElement = document.createElement('div');
        debtElement.className = 'debt-item';
        debtElement.innerHTML = `
          <div class="debt-content">
            <p><strong>Dueño:</strong> ${deuda.dueño}</p>
            <p><strong>Cantidad:</strong> ${deuda.cantidad2}</p>
            <p><strong>Descripcion:</strong> ${deuda.descripcion}</p>
          </div>
          <div class="debt-buttons">
            <button class="editBtn">Editar</button>
            <button class="deleteBtn">Eliminar</button>
          </div>
        `;
        container.appendChild(debtElement);

        // Event listeners para los botones
        const deleteBtn = debtElement.querySelector('.deleteBtn');
        const editBtn = debtElement.querySelector('.editBtn');

        deleteBtn.addEventListener('click', function() {
          fetch(`http://localhost:4000/api/debts/${deuda.id}`, {
            method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
            cargarDeudas();
          })
          .catch(error => console.error('Error:', error));
        });

        editBtn.addEventListener('click', function() {
          const nuevoOwner = prompt('Nuevo dueño:', deuda.dueño);
          const nuevaCantidad = prompt('Nueva cantidad:', deuda.cantidad2);
          const nuevaDescripción =  prompt('Nueva descripción:', deuda.descripcion);
          
          fetch(`http://localhost:4000/api/debts/${deuda.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dueño: nuevoOwner, cantidad2: nuevaCantidad, descripcion: nuevaDescripción })
          })
          .then(response => response.json())
          .then(data => {
            cargarDeudas(); 
          });
        });
      });
    })
    .catch(error => console.error('Error al cargar deudas:', error));
}

cargarDeudas();



