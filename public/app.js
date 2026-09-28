const expenseForm = document.getElementById("expenseForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");

// Get all expenses
async function getExpenses() {
    const response = await fetch("/expenses");
    const expenses = await response.json();

    expenseList.innerHTML = "";

    expenses.forEach(expense => {
        const div = document.createElement("div");

        div.className = "expense";

        div.innerHTML = `
            <span>
                ${expense.description} - ₹${expense.amount}
            </span>

            <div>
                <button onclick="editExpense(${expense.id}, '${expense.description}', ${expense.amount})">
                    Edit
                </button>

                <button onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(div);
    });
}

// Add expense
expenseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = amountInput.value;

    await fetch("/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description,
            amount
        })
    });

    expenseForm.reset();

    getExpenses();
});

// Edit expense
async function editExpense(id, oldDescription, oldAmount) {
    const description = prompt(
        "Enter new description:",
        oldDescription
    );

    const amount = prompt(
        "Enter new amount:",
        oldAmount
    );

    if (description === null || amount === null) {
        return;
    }

    await fetch(`/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description,
            amount
        })
    });

    getExpenses();
}

// Delete expense
async function deleteExpense(id) {
    await fetch(`/expenses/${id}`, {
        method: "DELETE"
    });

    getExpenses();
}

// Load expenses when page opens
getExpenses();