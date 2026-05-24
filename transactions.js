// Загрузка и отображение всех транзакций
function loadAllTransactions() {
    const transactions = getTransactions();
    const container = document.getElementById('allTransactionsList');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#999;">Нет операций</p>';
        return;
    }
    
    container.innerHTML = '';
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(t => {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <div>
                <strong>${t.category}</strong><br>
                <small>${t.description || ''} • ${new Date(t.date).toLocaleDateString()}</small>
            </div>
            <div style="color: ${t.type === 'income' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                ${t.type === 'income' ? '+' : '-'} ${t.amount} ₽
            </div>
        `;
        container.appendChild(div);
    });
}

// Обработка отправки формы
const form = document.getElementById('transactionForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const type = document.querySelector('input[name="type"]:checked').value;
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        
        if (!amount || amount <= 0) {
            alert('Введите корректную сумму');
            return;
        }
        
        addTransaction(type, parseFloat(amount), category, description);
        alert('Операция добавлена!');
        form.reset();
        loadAllTransactions();
    });
}

// Загрузка при открытии страницы
if (document.getElementById('allTransactionsList')) {
    loadAllTransactions();
}