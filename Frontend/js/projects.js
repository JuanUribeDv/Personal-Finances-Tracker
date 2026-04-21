
document.getElementById('Btnprojects').addEventListener('click', function(){

    const formcontainer = document.createElement('div');
    formcontainer.id = 'projectForm';
    formcontainer.style.display = 'block'; 


 
    const labelname = document.createElement('label');
    labelname.textContent= 'Project name';
    const inputname = document.createElement('input');
    inputname.type = ('text');
    inputname.placeholder = 'Name your project';

  
    const labeldesc = document.createElement('label');
    labeldesc.textContent = 'Description';
    const inputdesc = document.createElement('input');
    inputdesc.type = 'text';
    inputdesc.placeholder = 'Enter the project description';

    const submitBtn1 = document.createElement('button');
    submitBtn1.textContent = 'Guardar';
    const submitBtn2 = document.createElement('button');
    submitBtn2.textContent = 'Cancelar';
    submitBtn2.addEventListener('click', function(){
        formcontainer.style.display = 'none';
    });
    submitBtn1.addEventListener('click', function(){

        const name = inputname.value;
        const description = inputdesc.value;
        fetch('http://localhost:4000/api/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nombre_proy: name, descripcion: description})
        })
        .then(response => response.json())
        .then(data =>{
            console.log('project saved:', data);
            formcontainer.style.display = 'none'
            CargarProyectos();
        })
        

    });


    formcontainer.appendChild(labelname);
    formcontainer.appendChild(inputname);
    formcontainer.appendChild(labeldesc);
    formcontainer.appendChild(inputdesc);
    formcontainer.appendChild(submitBtn1);
    formcontainer.appendChild(submitBtn2);

    document.getElementById('main').appendChild(formcontainer);
});

function CargarProyectos(){
    fetch('http://localhost:4000/api/projects')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projectlist');
            container.innerHTML='';

            projects.forEach(project => {
                const projectsDiv = document.createElement('div');
                projectsDiv.className = 'project-item'
                projectsDiv.innerHTML=`
                    <div class="debtor-content">
                        <p><strong>Name:</strong> ${project.nombre_proy}</p>
                        <p><strong>Description:</strong> ${project.descripcion}</p>
                    </div>
                    <div class="debtor-buttons">
                        <button class="edit-project" data-id="${project.id}">Edit</button>
                        <button class="delete-project" data-id="${project.id}">Delete</button>
                        <button class="view-project" data-id="${project.id}">View</button>
                    </div>
                `;
                container.appendChild(projectsDiv);
                const deleteBtn = projectsDiv.querySelector('.delete-project');
                const viewBtn = projectsDiv.querySelector('.view-project');
                const editBtn=projectsDiv.querySelector('.edit-project');

                deleteBtn.addEventListener('click', function(){
                    fetch(`http://localhost:4000/api/projects/${project.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => response.json())
                    .then(() => {
                        CargarProyectos();
                    })
                    .catch(error => console.error('Error al eliminar proyecto:', error));
                });
                
                editBtn.addEventListener('click', function(){
                    const newproject = prompt('Nuevo nombre:', project.nombre_proy);
                    const newdesc = prompt('Nueva descripcion:',project.descripcion);
                    fetch(`http://localhost:4000/api/projects/${project.id}`,{
                        method: 'PUT',
                        headers: {'content-type': 'application/json'},
                        body: JSON.stringify({nombre_proy: newproject, descripcion: newdesc})
                    })
                    .then(response=>response.json())
                    .then(data=> {
                        CargarProyectos();
                    })
                        
                });

                // viewBtn.addEventListener('click', function(){
                    //fetch('http://localhost:4000/api/projects')
                    //.then(response => response.json())
                    //.then(projects=>{
                        
                   // });
                //})
            });
        })
        .catch(error => console.error('Error al cargar proyectos:', error));
}
CargarProyectos();