// Function to load tables from local storage and render them
function loadTables() {
  const savedTables = JSON.parse(localStorage.getItem('tables')) || []; // Load tables or default to an empty array
  const section1 = document.getElementById('section-1');
  section1.innerHTML = ''; // Clear the section before rendering

  savedTables.forEach((table, index) => {
      // Create a new div for each table
      const newDiv = document.createElement('div');
      newDiv.classList.add('table');
      newDiv.innerHTML = `
          <h1>Table ${table.tableNo}</h1>
          <button class="remove-table-btn" data-index="${index}">Remove</button>
      `;

      // Append the new table div to section-1
      section1.appendChild(newDiv);

      // Add event listener for the remove button
      newDiv.querySelector('.remove-table-btn').addEventListener('click', function() {
          removeTable(index); // Call function to remove table
      });
  });
}

// Function to save tables to local storage
function saveTables(tables) {
  localStorage.setItem('tables', JSON.stringify(tables)); // Save the updated table list to local storage
}

// Function to find the next table number based on existing tables
function getNextTableNumber(tables) {
  if (tables.length === 0) return 1; // If no tables, start from 1
  const tableNumbers = tables.map(table => table.tableNo); // Extract table numbers
  return Math.max(...tableNumbers) + 1; // Return the next table number
}

// Function to add a new table
document.getElementById('add-table-btn').addEventListener('click', function() {
  const tables = JSON.parse(localStorage.getItem('tables')) || []; // Load tables or default to an empty array
  const newTableNumber = getNextTableNumber(tables); // Calculate the next table number
  tables.push({ tableNo: newTableNumber }); // Add the new table with correct number
  saveTables(tables); // Save updated tables to local storage
  loadTables(); // Re-render the tables
});

// Function to remove a table from local storage and the UI
function removeTable(index) {
  let tables = JSON.parse(localStorage.getItem('tables')) || []; // Load tables or default to an empty array
  tables.splice(index, 1); // Remove the table at the given index
  saveTables(tables); // Save updated tables to local storage
  loadTables(); // Re-render the tables
}

// Load tables when the page is loaded
window.addEventListener('load', function() {
  loadTables(); // Load and render tables from local storage
});


// Item section is started here

// Function to save items to local storage
function saveItems(items) {
  localStorage.setItem('items', JSON.stringify(items)); // Save the items array to local storage
}

// Function to load and render items from local storage in Section 2
function loadItems() {
  const savedItems = JSON.parse(localStorage.getItem('items')) || []; // Load items from local storage or default to empty array
  const section2 = document.getElementById('section-2');
  section2.innerHTML = ''; // Clear section before re-rendering items

  savedItems.forEach((item) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
          <h1>Item No = ${item.itemNo}</h1>
          <h3>Item Name = ${item.itemName}</h3>
          <h4>Item Cost = Rs ${item.itemCost}</h4>
          <button class="remove-item-btn">Remove Item</button>
      `;
      // Append the item to section 3
      section2.appendChild(itemDiv);

      // Add event listener for the remove button
      itemDiv.querySelector('.remove-item-btn').addEventListener('click', function() {
          removeItem(item.itemNo); // Call remove function
      });
  });
}

// Function to remove an item from the local storage and re-render items
function removeItem(itemNo) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  // Remove the item with the matching itemNo
  items = items.filter(item => item.itemNo !== itemNo);
  saveItems(items); // Save updated items to local storage
  loadItems(); // Re-render items
}

// Function to add an item to the local storage
document.getElementById('add-item-btn').addEventListener('click', function() {
  const itemName = document.getElementById('item-name').value;
  const itemCost = document.getElementById('item-cost').value;

  if (itemName && itemCost) {  // Ensure both fields are filled
      let items = JSON.parse(localStorage.getItem('items')) || [];
      const newItemNo = items.length ? Math.max(...items.map(item => item.itemNo)) + 1 : 1; // Determine the next item number

      const newItem = {
          itemNo: newItemNo,
          itemName: itemName,
          itemCost: itemCost
      };

      items.push(newItem); // Add the new item to the array
      saveItems(items); // Save the updated items to local storage
      loadItems(); // Re-render items
      document.getElementById('item-name').value = ''; // Clear input fields
      document.getElementById('item-cost').value = '';
  } else {
      alert("Please enter both Item Name and Item Cost.");
  }
});

// Load items when the page loads
window.addEventListener('load', loadItems);





