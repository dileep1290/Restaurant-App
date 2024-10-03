// Function to load data from localStorage
function loadData() {
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    const items = JSON.parse(localStorage.getItem('items')) || [];

    renderTables(tables);
    renderItems(items);
}

// Function to render tables in section-1
function renderTables(tables) {
    const section1 = document.getElementById('section-1');
    section1.innerHTML = ''; // Clear previous content

    tables.forEach((table, index) => {
        const tableDiv = document.createElement('div');
        tableDiv.classList.add('table');
        tableDiv.setAttribute('data-index', index); // Assign index for drop handling
        tableDiv.innerHTML = `
            <h1>Table ${table.tableNo}</h1> <!-- Fixed issue: Display "Table 1" instead of just "1" -->
            <div class="table-items"></div> <!-- Items dropped will appear here -->
            <p>Total = 0</p> <!-- Total cost will update when items are dropped -->
            <button class="clear-btn">Clear</button> <!-- Clear button -->
        `;

        // Clear button functionality
        const clearButton = tableDiv.querySelector('.clear-btn');
        clearButton.addEventListener('click', function() {
            clearTable(index); // Call clear function for the specific table
        });

        tableDiv.addEventListener('dragover', function(e) {
            e.preventDefault(); // Allow the drop
        });

        tableDiv.addEventListener('drop', function(e) {
            const itemId = e.dataTransfer.getData('text');
            handleDrop(itemId, index); // Handle item drop
        });

        section1.appendChild(tableDiv);
    });
}

// Function to render items in section-2
function renderItems(items) {
    const section2 = document.getElementById('section-2');
    section2.innerHTML = ''; // Clear previous content

    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.setAttribute('draggable', true);
        itemDiv.setAttribute('data-id', index); // Assign item id for drag

        itemDiv.innerHTML = `
            <h1>Item ${item.itemNo}</h1>
            <h3>Item Name = ${item.itemName}</h3>
            <h4>Item Cost = ${item.itemCost}</h4>
        `;

        itemDiv.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', index); // Store item index for drop handling
        });

        section2.appendChild(itemDiv);
    });
}

// Function to handle item drop into a table
function handleDrop(itemId, tableIndex) {
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    const items = JSON.parse(localStorage.getItem('items')) || [];

    const item = items[itemId];
    if (!tables[tableIndex].items) {
        tables[tableIndex].items = []; // Initialize items array if not present
    }

    // Add item to the table's items array (allowing duplicates)
    tables[tableIndex].items.push(item); // Always push the item

    // Update total cost and render items in the table
    updateTable(tableIndex, tables);

    // Save updated tables back to localStorage
    localStorage.setItem('tables', JSON.stringify(tables));
}

// Function to update a table's items and total cost
function updateTable(tableIndex, tables) {
    const tableDiv = document.querySelectorAll('.table')[tableIndex];
    const tableItemsDiv = tableDiv.querySelector('.table-items');
    tableItemsDiv.innerHTML = ''; // Clear previous items before re-rendering

    let totalCost = 0;

    tables[tableIndex].items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h1>Item ${item.itemNo}</h1>
            <h3>Item Name = ${item.itemName}</h3>
            <h4>Item Cost = ${item.itemCost}</h4>
        `;

        tableItemsDiv.appendChild(itemDiv);

        // Add the item cost to the total
        totalCost += Number(item.itemCost); // Ensure the cost is treated as a number
        // console.log(totalCost);
    });

    // Update total cost in the table div
    const totalParagraph = tableDiv.querySelector('p');
    totalParagraph.innerHTML = `Total = ${totalCost}`; // Display the total
}

// Function to clear items from a specific table
function clearTable(tableIndex) {
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables[tableIndex].items = []; // Clear the items array for that table

    // Update the table display and localStorage
    updateTable(tableIndex, tables);
    localStorage.setItem('tables', JSON.stringify(tables));
}

// Load data on page load
window.addEventListener('load', function() {
    loadData();
});