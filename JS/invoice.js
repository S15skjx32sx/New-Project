window.onload = function () {
  const params = new URLSearchParams(location.search);
  let mode = params.get('mode');
  if (!mode) {
    mode = confirm("OK for SINGLE invoice, Cancel for SEPARATE invoices") ? 'single' : 'separate';
  }

  const entries = JSON.parse(localStorage.getItem('stockEntries')) || [];

  if (!entries.length) {
    document.body.innerHTML += "<p><em>No stock entries found in localStorage.</em></p>";
    return;
  }

  if (mode === 'single') {
    document.getElementById('invoiceContainer').style.display = 'none';
    generateSingleInvoice(entries);
  } else {
    document.getElementById('singleInvoice').style.display = 'none';
    generateSeparateInvoices(entries);
  }
};

// Single Invoice
function generateSingleInvoice(data) {
  
  const invNo = "INV" + Date.now();
  const date = new Date().toISOString().slice(0, 10);

  document.getElementById('invNo').textContent = `Invoice No: ${invNo}`;
  document.getElementById('invDate').textContent = `Date: ${date}`;
  
  const tbody = document.querySelector('#itemsTable tbody');
  let totalSum = 0;

  data.forEach(item => {
    const lineTotal = item.quantity * item.unitPrice;
    totalSum += lineTotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.productName}</td>
      <td>${item.quantity}</td>
      <td>${item.unitPrice.toFixed(2)}</td>
      <td>${lineTotal.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  const tax = totalSum * 0.1;
  const grand = totalSum + tax;

  document.getElementById('summaryBlock').innerHTML = `
    <p><strong>Subtotal:</strong> ₹${totalSum.toFixed(2)}</p>
    <p><strong>Tax (10%):</strong> ₹${tax.toFixed(2)}</p>
    <p><strong>Grand Total:</strong> ₹${grand.toFixed(2)}</p>
  `;
}

// Separate Invoices
function generateSeparateInvoices(data) {
  const container = document.getElementById('invoiceContainer');

  data.forEach((item, index) => {
    const lineTotal = item.quantity * item.unitPrice;
    const tax = lineTotal * 0.1;
    const grand = lineTotal + tax;

    const div = document.createElement('div');
    div.className = 'invoice-block';
    div.innerHTML = `
      <h3>Invoice #${index + 1}</h3>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Vendor:</strong> ${item.vendorName}</p>
      <p><strong>Product:</strong> ${item.productName}</p>
      <p><strong>Quantity:</strong> ${item.quantity}</p>
      <p><strong>Unit Price:</strong> ₹${item.unitPrice.toFixed(2)}</p>
      <p><strong>Line Total:</strong> ₹${lineTotal.toFixed(2)}</p>
      <p><strong>Tax (10%):</strong> ₹${tax.toFixed(2)}</p>
      <p><strong>Grand Total:</strong> ₹${grand.toFixed(2)}</p>
    `;
    container.appendChild(div);
  });
}
