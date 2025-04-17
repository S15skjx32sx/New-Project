// Initialize totals and array
let income = 0;
let expense = 0;
let transactions = [];

// Load data from localStorage when the page loads
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("incomeEntries")) || [];
  transactions = saved;

  // Calculate totals
  saved.forEach(entry => {
    if (entry.type === "income") {
      income += entry.amount;
    } else {
      expense += entry.amount;
    }
  });

  updateTotals();
};

// Add Transaction button logic
function addTransaction() {
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("transaction-type").value;

  // Validation
  if (category === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid category and amount.");
    return;
  }

  // Create new transaction
  const transaction = { category, amount, type };
  transactions.push(transaction);

  // Update totals
  if (type === "income") {
    income += amount;
  } else {
    expense += amount;
  }

  // Save to localStorage
  localStorage.setItem("incomeEntries", JSON.stringify(transactions));

  // Update displayed totals
  updateTotals();

  // Clear form
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
}

// Update total income, expense and net profit/loss
function updateTotals() {
  document.getElementById("total-income").textContent = income.toFixed(2);
  document.getElementById("total-expense").textContent = expense.toFixed(2);
  document.getElementById("net-profit-loss").textContent = (income - expense).toFixed(2);
}
