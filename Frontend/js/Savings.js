document.getElementById('addsaving').addEventListener('click', function(){

    const formcontainer = document.createElement('div');
    formcontainer.id = 'savingform';
    formcontainer.style.display = 'block';

    const labelamount = document.createElement('label');
    labelamount.textContent = 'Amount to save';
    const inputamount = document.createElement('input');
    inputamount.type = 'number';
    inputamount.placeholder = 'Amount here?';


    const labelsavingname = document.createElement('label');
    labelsavingname.textContent='What are you saving money for?';
    const inputsavingname = document.createElement('input');
    inputsavingname.type = 'text';
    inputsavingname.placeholder='Description here';


    const submitBtn1 = document.createElement('button');
    submitBtn1.textContent= 'Guardar';
    const submitBtn2 = document.createElement('button');
    submitBtn2.textContent= 'Cancelar';
    submitBtn2.addEventListener('click', function(){
        formcontainer.style.display = 'none';

    });
    submitBtn1.addEventListener('click', function(){
        const amount = inputamount.value;
        const savingname = inputsavingname.value;

        fetch('http://localhost:4000/api/savings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cantidad3: amount, nombre_ahorro:savingname})
        })
        .then(response=> response.json())
        .then(data =>{
            console.log('saving saved:', data);
            formcontainer.style.display ='none';
            cargarAhorros();

        })
        .catch(error => console.error('Error:', error));
    });

    formcontainer.appendChild(labelamount);
    formcontainer.appendChild(inputamount);
    formcontainer.appendChild(labelsavingname);
    formcontainer.appendChild(inputsavingname);
    formcontainer.appendChild(submitBtn1);
    formcontainer.appendChild(submitBtn2);
    

    document.getElementById('main').appendChild(formcontainer);
});

function cargarAhorros(){
    fetch('http://localhost:4000/api/savings')
    .then(response =>response.json())
    .then(savings =>{
        const container = document.getElementById('savinglist');
        container.innerHTML = '';
        savings.forEach(saving =>{
            const savingElement = document.createElement('div');
            savingElement.className ='saving-item';
            savingElement.innerHTML = `
                <div class="saving-content">
                    <p><strong>Nombre</strong> ${saving.nombre_ahorro}</p>
                    <p><strong>Cantidad</strong> ${saving.cantidad3}</p>
                </div>
                <div class="debt-buttons">
                    <button class="editBtn">Editar</button>
                    <button class="deleteBtn">Eliminar</button>
                </div> 
                `;
                container.appendChild(savingElement);
                const deleteBtn = savingElement.querySelector('.deleteBtn');
                const editBtn = savingElement.querySelector('.editBtn');

                deleteBtn.addEventListener('click', function(){
                    fetch (`http://localhost:4000/api/savings/${saving.id}`, {
                        method: 'DELETE'
                    })
                    .then(response=> response.json())
                    .then(()=>{
                        cargarAhorros();
                    })
                    .catch(error=>console.error('error al eliminar el ahorro:', error));
                });
                editBtn.addEventListener('click', function(){
                    const newamount = prompt('Nueva cantidad:', saving.cantidad3);
                    const newsavingname = prompt('Nuevo nombre:', saving.nombre_ahorro);

                    fetch(`http://localhost:4000/api/savings/${saving.id}`, {
                        method: 'PUT',
                        headers: {'Content-type': 'application/json'},
                        body: JSON.stringify({cantidad3: newamount, nombre_ahorro: newsavingname})
                    })
                    .then(response=>response.json())
                    .then(data =>{
                        cargarAhorros();
                    })
                })

        });

    })
}
cargarAhorros();