document.getElementById('addDebtorBtn').addEventListener('click', function(){

    const formcontainer = document.createElement('div');
    formcontainer.id = 'debtorForm';
    formcontainer.style.display = 'block';

    const labeldebtor = document.createElement('label');
    labeldebtor.textContent = 'Debtor Name:';
    const inputdebtor = document.createElement('input');
    inputdebtor.type = 'text';
    inputdebtor.placeholder = 'Enter debtor name';

    const labelamount = document.createElement('label');
    labelamount.textContent = 'Amount quantity:';
    const inputamount = document.createElement('input');
    inputamount.type = 'number';
    inputamount.placeholder = 'Enter the amount';


    const submitBtn1 = document.createElement('button');
    submitBtn1.textContent = 'Guardar';
    const submitBtn2 = document.createElement('button');
    submitBtn2.textContent = 'Cancelar';
    submitBtn2.addEventListener('click', function(){
        formcontainer.style.display= 'none';
    });
    submitBtn1.addEventListener('click', function() { 

        const debtorName = inputdebtor.value;
        const amountQuantity = inputamount.value;

        fetch('http://localhost:4000/api/debtors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: debtorName, cantidad1: amountQuantity})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Debtor saved:', data);
            formcontainer.style.display = 'none';
            cargardebtors(); 
        })
        .catch(error => console.error('errror:', error));
    });

    formcontainer.appendChild(labeldebtor);
    formcontainer.appendChild(inputdebtor);
    formcontainer.appendChild(labelamount);
    formcontainer.appendChild(inputamount);
    formcontainer.appendChild(submitBtn1);
    formcontainer.appendChild(submitBtn2);

    document.getElementById('main').appendChild(formcontainer);
});

function cargardebtors() {
  fetch('http://localhost:4000/api/debtors')
    .then(response => response.json())
    .then(debtors => {
        const container = document.getElementById('debtorsList');
        container.innerHTML = '';
        
        debtors.forEach(debtor => {
            const debtorDiv = document.createElement('div');
            debtorDiv.className = 'debtor-item';
            debtorDiv.innerHTML = `
                <div class="debtor-content">
                    <p><strong>Name:</strong> ${debtor.nombre}</p>
                    <p><strong>Amount:</strong> ${debtor.cantidad1}</p>
                </div>
                <div class="debtor-buttons">
                    <button class="deleteBtn" data-id="${debtor.id}">Delete</button>
                    <button class="editBtn" data-id="${debtor.id}">Edit</button>
                </div>
            `;
            container.appendChild(debtorDiv);
            //Event listeners for delete and edit can be added here
            const deleteBtn = debtorDiv.querySelector('.deleteBtn');
            const editBtn = debtorDiv.querySelector('.editBtn');

            deleteBtn.addEventListener('click', function() {
                fetch(`http://localhost:4000/api/debtors/${debtor.id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(() => {
                    cargardebtors();
                })
                .catch(error => console.error('Error al eliminar deudor:', error));
            });
            editBtn.addEventListener('click', function() {
                const newname = prompt('Nuevp nombre:', debtor.nombre)
                const newamount = prompt('Nueva cantidad:', debtor.cantidad1)

                fetch(`http://localhost:4000/api/debtors/${debtor.id}`, {
                    method: 'PUT',
                    headers: {'Content-type': 'application/json' },
                    body: JSON.stringify({nombre: newname, cantidad1: newamount})
                })
                .then(response=>response.json())
                .then(data=> {
                    cargardebtors();
                })
            });
        });
    })
    .catch(error => console.error('Error al cargar deudores:', error));
}

cargardebtors();