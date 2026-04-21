document.addEventListener('DOMContentLoaded', function(){
    const calendarp = document.getElementById('calendar');
    

    const calendar = new FullCalendar.Calendar(calendarp, {
    initialView: 'dayGridMonth', 
    locale: 'es',                
    height: '100%',              
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    
    events: [
      
      {
        title: 'Comienzo App cotizaciones',
        start: '2026-02-09',
        backgroundColor: '#3b82f6' 
      },
      {
        title: 'Refactorización App J.P finances',
        start: '2026-02-14',
        backgroundColor: '#008000'
      }
    ]
    });

  
  calendar.render();
  
});



document.getElementById('incomeBtn').addEventListener('click', function() {

    const container1 = document.createElement('div');
    container1.id = 'container1_dash';
    container1.style.display = 'block';

    const labelincome = document.createElement('label');
    labelincome.textContent = 'Enter your new income:';
    const inputincome = document.createElement('input');
    inputincome.type = 'number';
    inputincome.placeholder = 'Income amount here';

    const submitBtn1 = document.createElement('button');
    submitBtn1.textContent = 'Save';
    
    const submitBtn3 = document.createElement('button');
    submitBtn3.textContent = 'Cancel';
    submitBtn3.addEventListener('click', function(){
        container1.style.display = 'none';
    });

    submitBtn1.addEventListener('click', function(){
        const amount = inputincome.value;
        fetch('http://localhost:4000/api/income',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({cantidad4: amount})
        })
        .then(response=>response.json())
        .then(()=>{
            container1.style.display = 'none';
            cargarincome();
        })
    });

    container1.appendChild(labelincome);
    container1.appendChild(inputincome);
    container1.appendChild(submitBtn1);
    container1.appendChild(submitBtn3);

    document.getElementById('finance-sectionI').appendChild(container1);
});


document.getElementById('expenBtn').addEventListener('click', function(){

    const container2 = document.createElement('div');
    container2.id = 'conatiner2_dash';
    container2.style.display = 'block';

    const labelexpense = document.createElement('label');
    labelexpense.textContent= 'Enter the new expense';
    const inputexpense = document.createElement('input');
    inputexpense.type = 'number';
    inputexpense.placeholder = 'Expense amount here';

    const submitBtn2 = document.createElement('button');
    submitBtn2.textContent = 'Save';
    const submitBtn4 = document.createElement('button');
    submitBtn4.textContent = 'Cancel';

    submitBtn4.addEventListener('click', function(){
        container2.style.display='none';
    });
    

    submitBtn2.addEventListener('click', function(){
        const amount2 = inputexpense.value;
        fetch('http://localhost:4000/api/expense',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({cantidad5: amount2})
        })
        .then(response=>response.json())
        .then(()=>{
            container2.style.display = 'none';
            cargarexpense();
        })
    })
    container2.appendChild(labelexpense);
    container2.appendChild(inputexpense);
    container2.appendChild(submitBtn2);
    container2.appendChild(submitBtn4);

    document.getElementById('finance-sectionE').appendChild(container2);
});

function cargarincome(){
    const view = document.getElementById('income');
    fetch('http://localhost:4000/api/income')
        .then(response=>response.json())
        .then(incomes=>{
            incomes.forEach(income=>{
                view.textContent = income.cantidad4;
            })
        })
}
function cargarexpense(){
    const view2 = document.getElementById('expenses');
    fetch('http://localhost:4000/api/expense')
        .then(response=>response.json())
        .then(expenses=>{
            expenses.forEach(expense=>{
                view2.textContent = expense.cantidad5;
            })
        })
}

cargarincome()
cargarexpense()