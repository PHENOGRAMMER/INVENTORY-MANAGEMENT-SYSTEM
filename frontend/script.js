const API_URL = 'http://localhost:5000/api/items';


// Fetch Items and Display in Table
async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        items.forEach(item => addToTable(item));
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Add New Item
document.getElementById('add-item-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('item-name').value;
    const quantity = document.getElementById('item-quantity').value;
    const category = document.getElementById('item-category').value;
    const date = document.getElementById('date').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity, category }),
        });

        if (response.ok) {
            alert('Item added successfully!');
            fetchItems(); // Refresh the table
        } else {
            console.log('Failed to add item');
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
});


// PASSWORD HIDE-VISIBLE
function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeIconHidden = document.getElementById('eye-icon-hidden');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.style.display = 'none';
        eyeIconHidden.style.display = 'inline';
    } else {
        passwordField.type = 'password';
        eyeIcon.style.display = 'inline';
        eyeIconHidden.style.display = 'none';
    }
}


// Function to fetch existing items and display them in the table
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:5000/api/items');
        if (response.ok) {
            const items = await response.json();
            items.forEach(item => addToTable(item)); // Populate the table with existing items
        } else {
            console.error('Failed to fetch items:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Handle Add Item Modal
const addItemBtn = document.getElementById("add-item");
const addModal = document.getElementById("add-modal");
const addCloseBtn = document.querySelector("#add-modal .add-close");
const addItemForm = document.getElementById("add-item-form");

// Open Add Item Modal
addItemBtn.addEventListener("click", () => {
    addModal.style.display = "block";
});

// Close Add Item Modal
addCloseBtn.addEventListener("click", () => {
    addModal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }
});

// Handle Add Item Form Submission
addItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();  // Prevent page reload

    const itemName = document.getElementById("item-name").value;
    const itemQuantity = document.getElementById("item-quantity").value;
    const itemCategory = document.getElementById("item-category").value;
    const floorNumber = document.getElementById("floor-number").value;
    const roomNumber = document.getElementById("room-number").value;
    const tdate = document.getElementById('date').value;

    const itemData = {
        name: itemName,
        category: itemCategory,
        quantity: parseInt(itemQuantity),
        location: { floor: floorNumber, room: roomNumber },
        date: tdate
    };

    try {
        const response = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Item added successfully!');
            addToTable(data.item); // Add the item to the table
            addItemForm.reset();  // Clear form fields
            addModal.style.display = "none";  // Close the modal
        } else {
            const errorData = await response.json();
            alert(`Error adding item: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to add item. Please try again.');  // General error message
    }
});


// Function to add new item to the inventory table
function addToTable(item) {
    const itemsTbody = document.getElementById("items-tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${item._id}</td> <!-- Assuming your backend returns the item ID -->
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>${item.location.room}</td>
        <td>${item.date.slice(0,10)}</td>
        <td>
            <button class="delete" onclick="deleteItem('${item._id}')">Delete</button>
        </td>
    `;

    itemsTbody.appendChild(newRow);
}

// Handle Move Item Modal
const moveItemBtn = document.getElementById("move-item");
const moveModal = document.getElementById("move-item-modal");
const closeModalBtn = document.getElementById("close-modal");
const cancelBtn = document.getElementById("cancel-btn");

// Open Move Item Modal
moveItemBtn.addEventListener("click", () => {
    moveModal.style.display = "block";
});

// Close Move Item Modal
closeModalBtn.addEventListener("click", () => {
    moveModal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
    moveModal.style.display = "none";
});

// Handle Move Item Logic
document.getElementById("move-item-btn").addEventListener("click", async () => {
    const itemId = document.getElementById("item-id").value;
    const units = parseInt(document.getElementById("units").value);
    const fromRoom = document.getElementById("from-room").value;
    const toRoom = document.getElementById("to-room").value;

    const moveData = {
        units,
        fromRoom,
        toRoom,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/items/${itemId}/move`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(moveData)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Item moved successfully!');
            console.log('Moved Item:', data.movedItem);
        } else {
            const errorData = await response.json();
            alert(`Error moving item: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while moving the item.');
    }
});

// Function to delete item (to be implemented)
async function deleteItem(itemId) {
    try {
        const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Item deleted successfully!');
            // Remove the row from the table
            const row = document.querySelector(`tr[data-id='${itemId}']`);
            if (row) {
                row.remove();
            }
        } else {
            const errorData = await response.json();
            alert(`Error deleting item: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the item.');
    }
}

// Fetch existing items when the page loads
document.addEventListener('DOMContentLoaded', fetchItems);
document.addEventListener("DOMContentLoaded", () => {
    const reportTable = document.getElementById("report-table").querySelector("tbody");
    const totalReports = document.getElementById("total-reports");
    const purchasedThisMonth = document.getElementById("purchased-this-month");
    const purchasedThisYear = document.getElementById("purchased-this-year");
    const filterForm = document.getElementById("filter-form");

    // Fetch initial report data on page load
    fetchReportData();

    // Handle filter form submission
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        fetchReportData(year, month);
    });

    async function fetchReportData(year = "", month = "") {
        try {
            const response = await fetch(`http://localhost:5000/api/reports?year=${year}&month=${month}`);
            if (!response.ok) throw new Error("Failed to fetch report data");

            const data = await response.json();
            populateTable(data);
            updateSummary(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }

    function populateTable(data) {
        reportTable.innerHTML = ""; // Clear previous data

        data.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.totalQuantity}</td>
                <td>${item.monthlyPurchase}</td>
                <td>${item.yearlyPurchase}</td>
            `;
            reportTable.appendChild(row);
        });
    }

    function updateSummary(data) {
        const totalProducts = data.length;
        const totalThisMonth = data.reduce((sum, item) => sum + item.monthlyPurchase, 0);
        const totalThisYear = data.reduce((sum, item) => sum + item.yearlyPurchase, 0);

        totalReports.textContent = `Total Products: ${totalProducts}`;
        purchasedThisMonth.textContent = `Products Purchased This Month: ${totalThisMonth}`;
        purchasedThisYear.textContent = `Products Purchased This Year: ${totalThisYear}`;
    }
});

