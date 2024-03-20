const { ipcRenderer } = require('electron');

// Example equipment data (replace with actual data)
const equipmentData = [
    { id: 1, name: 'Fire Extinguisher', location: 'Building A', status: 'Good' },
    { id: 2, name: 'Safety Helmet', location: 'Warehouse', status: 'Needs Inspection' }
];

// Function to render equipment list
function renderEquipmentList() {
    const equipmentListElement = document.getElementById('equipment-list');
    equipmentListElement.innerHTML = ''; // Clear previous list

    equipmentData.forEach(equipment => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div>ID: ${equipment.id}</div>
            <div>Name: ${equipment.name}</div>
            <div>Location: ${equipment.location}</div>
            <div>Status: ${equipment.status}</div>
            <hr>
        `;
        equipmentListElement.appendChild(itemElement);
    });
}

// Render initial equipment list
renderEquipmentList();

// Example event listener for adding equipment
const addEquipmentBtn = document.getElementById('add-equipment-btn');
addEquipmentBtn.addEventListener('click', () => {
    // Send a message to main process to open a new window for adding equipment
    ipcRenderer.send('open-add-equipment-window');
});

// Example event listener for receiving new equipment data from main process
ipcRenderer.on('new-equipment-added', (event, newEquipment) => {
    // Add the new equipment to the data array
    equipmentData.push(newEquipment);
    // Re-render the equipment list
    renderEquipmentList();
});
