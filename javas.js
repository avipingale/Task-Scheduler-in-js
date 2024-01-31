function updateDay() {
    const dateInput = document.getElementById("dateInput").value;
    const selectedDate = new Date(dateInput);
    const options = { weekday: 'long' };
    const day = new Intl.DateTimeFormat('en-US', options).format(selectedDate);
    document.getElementById("dayInput").value = day;
}

function addTask() {
    const dateInput = document.getElementById("dateInput").value;
    const dayInput = document.getElementById("dayInput").value;
    const taskInput = document.getElementById("taskInput").value;
    const toInput = document.getElementById("toInput").value;
    const fromInput = document.getElementById("fromInput").value;
    const priorityInput = document.getElementById("priorityInput").value;
    const taskList = document.getElementById("taskList");

    if (taskInput.trim() !== "") {
        const newRow = taskList.insertRow();
        const cells = Array.from({ length: 7 }, (_, index) => newRow.insertCell(index));

        cells[0].innerText = dateInput;
        cells[1].innerText = dayInput;
        cells[2].innerText = taskInput;
        cells[3].innerText = toInput;
        cells[4].innerText = fromInput;
        cells[5].innerText = priorityInput;
        cells[6].innerHTML = `<button onclick="removeTask('task${taskList.rows.length - 1}')">Remove</button>`;

        
        document.getElementById("dateInput").value = "";
        document.getElementById("dayInput").value = "";
        document.getElementById("taskInput").value = "";
        document.getElementById("toInput").value = "";
        document.getElementById("fromInput").value = "";
        document.getElementById("priorityInput").value = "";

        
        sortTableByPriority();
    }
}

function removeTask(taskId) {
    const userConfirmation = confirm('If your task Completed, click OK?');

    if (userConfirmation) {
        removeTaskElement(taskId);
    } else {
        console.log('Task removal canceled by the user.');
    }
}

function removeTaskElement(taskId) {
    const rowIndex = parseInt(taskId.replace('task', ''), 10);
    const row = document.getElementById(`taskList`).rows[rowIndex];

    if (row) {
        row.parentNode.removeChild(row);

       
        sortTableByPriority();
    }
}

function sortTableByPriority() {
    const table = document.getElementById("taskTable");
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    const sortedRows = Array.from(rows).sort((a, b) => {
        const priorityA = parseInt(a.cells[5].innerText, 10);
        const priorityB = parseInt(b.cells[5].innerText, 10);
        return priorityA - priorityB; 
    });

    
    Array.from(rows).forEach(row => tbody.removeChild(row));

    
    sortedRows.forEach(row => tbody.appendChild(row));
}