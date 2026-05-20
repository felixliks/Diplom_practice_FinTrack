// Ключ для хранения в localStorage
const STORAGE_KEY = 'fintrack_transactions';

// Получение всех транзакций
function getTransactions() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Сохранение транзакций
function saveTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// Добавление новой транзакции
function addTransaction(type, amount, category, description) {
    const transactions = getTransactions();
    const newTransaction = {
        id: Date.now(),
        type: type, // 'income' или 'expense'
        amount: parseFloat(amount),
        category: category,
        description: description,
        date: new Date().toISOString()
    };
    transactions.push(newTransaction);
    saveTransactions(transactions);
    return newTransaction;
}

// Получение последних N транзакций
function getRecentTransactions(limit = 5) {
    const transactions = getTransactions();
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}

// Подсчет общей суммы доходов
function getTotalIncome() {
    const transactions = getTransactions();
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
}

// Подсчет общей суммы расходов
function getTotalExpense() {
    const transactions = getTransactions();
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
}

// Получение баланса
function getBalance() {
    return getTotalIncome() - getTotalExpense();
}

// Обновление данных на главной странице
function updateDashboard() {
    const balanceElem = document.getElementById('balance');
    const incomeElem = document.getElementById('totalIncome');
    const expenseElem = document.getElementById('totalExpense');
    const recentList = document.getElementById('recentList');
    
    if (balanceElem) balanceElem.textContent = getBalance() + ' ₽';
    if (incomeElem) incomeElem.textContent = getTotalIncome() + ' ₽';
    if (expenseElem) expenseElem.textContent = getTotalExpense() + ' ₽';
    
    if (recentList) {
        const recent = getRecentTransactions(5);
        recentList.innerHTML = '';
        
        if (recent.length === 0) {
            recentList.innerHTML = '<p style="text-align:center; color:#999;">Нет операций</p>';
        } else {
            recent.forEach(t => {
                const div = document.createElement('div');
                div.className = 'transaction-item';
                div.innerHTML = `
                    <span>${t.description || t.category}</span>
                    <span style="color: ${t.type === 'income' ? '#27ae60' : '#e74c3c'}">
                        ${t.type === 'income' ? '+' : '-'} ${t.amount} ₽
                    </span>
                `;
                recentList.appendChild(div);
            });
        }
    }
}

// Загрузка при открытии страницы
if (document.getElementById('balance')) {
    updateDashboard();
}