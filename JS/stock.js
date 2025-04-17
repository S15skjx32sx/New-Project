document.getElementById("stockForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const type = document.getElementById("type").value;
    const vendorName = document.getElementById("vendorName").value;
    const productName = document.getElementById("productName").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const unitPrice = parseFloat(document.getElementById("unitPrice").value);
  
    // Calculate Total Amount
    const totalAmount = quantity * unitPrice;
  
    // Create stock entry object
    const stockEntry = {
      type: type,
      vendorName: vendorName,
      productName: productName,
      quantity: quantity,
      unitPrice: unitPrice,
      totalAmount: totalAmount
    };
  
    // Get existing entries from localStorage
    let stockData = JSON.parse(localStorage.getItem("stockEntries")) || [];
  
    // Add new stock entry
    stockData.push(stockEntry);
  
    // Save updated stock data to localStorage
    localStorage.setItem("stockEntries", JSON.stringify(stockData));
  
    // Display updated stock entries
    displayStockEntries();
    document.getElementById("stockForm").reset();
  });
  
  function displayStockEntries() {
    const stockData = JSON.parse(localStorage.getItem("stockEntries")) || [];
    const tableBody = document.getElementById("stockTable").getElementsByTagName("tbody")[0];
  
    // Clear existing rows
    tableBody.innerHTML = "";
  
    // Add new rows for each stock entry
    stockData.forEach((entry) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${entry.type}</td>
        <td>${entry.vendorName}</td>
        <td>${entry.productName}</td>
        <td>${entry.quantity}</td>
        <td>${entry.unitPrice}</td>
        <td>${entry.totalAmount}</td>
      `;
    });
  }
  
  // Call displayStockEntries to load saved entries when the page loads
  window.onload = displayStockEntries;
  
  
  function chooseInvoiceOption() {
    const choice = confirm("Do you want to generate a **single invoice** with all stock entries?\nClick OK for Single Invoice\nClick Cancel for Separate Invoices");

    if (choice) {
      // Single Invoice
      window.location.href = "invoice.html?mode=single";
    } else {
      // Separate Invoices
      window.location.href = "invoice.html?mode=separate";
    }
  }
