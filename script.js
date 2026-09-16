let members=[];
let expenses = [];
let totalExpense = document.getElementById("totalExpense");
let totalTransactons = document.getElementById("totalTransactions");
function updateStatistics(){
    let total = 0;
    for(let i=0;i<expenses.length;i++){
        total += Number(expenses[i].amount);
    }
    totalExpense.innerText = total;
    totalTransactions.innerText = expenses.length;
}

let amountInput = document.getElementById("amount");
let descriptionInput = document.getElementById("description");
let dateInput = document.getElementById("date");
let saveExpenseBtn = document.getElementById("saveExpenseBtn");
saveExpenseBtn.addEventListener("click", saveExpense);
async function saveExpense(){
    let expense = {
        payer: payer.value,
        amount: amountInput.value,
        description: descriptionInput.value,
        date: dateInput.value
    };
    expenses.push(expense);
    console.log(expenses);
    let table = document.getElementById("expenseTable");
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${expense.payer}</td>
    <td>$${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.date}</td>`;
    table.appendChild(row);
    updateStatistics();
    amountInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    payer.selectedIndex = 0;
    
}


let memberInput = document.getElementById("memberName");
let addButton = document.getElementById("addMemberBtn");
let memberList = document.getElementById("memberList");
let payer = document.getElementById("payer");
addButton.addEventListener("click", addMember);
async function addMember(){
    let name = memberInput.value;
    if(name==""){
        alert("Please enter a name");
        return;
    }
    const response = await fetch("http://localhost:5000/members",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    });
    const data = await
    response.json();
    console.log(data);
    members.push(name);

    let li = document.createElement("li");
    li.innerText = name;
    memberList.appendChild(li);

    let option = document.createElement("option");
    option.innerText = name;
    payer.appendChild(option);
    memberInput.value="";
}

async function loadMembers(){
    const response = await fetch("http://localhost:5000/members");
    const members = await response.json();
    memberList.innerHTML = "";
    payer.innerHTML = "";
    members.forEach(member => {
        let li = document.createElement("li");
        li.textContent = member.name;
        memberList.appendChild(li);
        let option = document.createElement("option");
        option.value = member.name;
        option.textContent = member.name;
        payer.appendChild(option);
    });
}

async function loadExpenses(){
    const response = await fetch("http://localhost:5000/expenses");
    const expenses = await response.json();
    expenseTable.innerHTML ="";
    expenses.forEach(expense => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${expense.payer}</td>
        <td>${expense.amount}</td>
        <td>${expense.description}</td>
        <td>${expense.date}</td>
        `;
    expenseTable.appendChild(row);
    });
}

// loadMembers();
// loadExpenses();