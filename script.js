const tableContainer = document.getElementById('table-container');
const totalElement = document.getElementById('total');
let total = 0;

// Завантаження даних з localStorage
const selectedNumbers = JSON.parse(localStorage.getItem('selectedNumbers')) || [];
total = selectedNumbers.reduce((sum, num) => sum + num, 0);
totalElement.textContent = total;

// Функція для оновлення localStorage
function updateLocalStorage() {
    localStorage.setItem('selectedNumbers', JSON.stringify(selectedNumbers));
}

// Створення клітинок
for (let i = 1; i <= 365; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i;

    // Перевірка, чи це число вже виділене
    if (selectedNumbers.includes(i)) {
        cell.classList.add('selected');
    }

    // Додавання обробника подій
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('selected')) {
            cell.classList.add('selected');
            selectedNumbers.push(i);
            total += i;
        } else {
            cell.classList.remove('selected');
            const index = selectedNumbers.indexOf(i);
            if (index > -1) selectedNumbers.splice(index, 1);
            total -= i;
        }
        totalElement.textContent = total;
        updateLocalStorage();
    });

    tableContainer.appendChild(cell);
}
