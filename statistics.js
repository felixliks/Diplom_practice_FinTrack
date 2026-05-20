function getExpensesByCategory() {
    const transactions = getTransactions();
    const expenses = transactions.filter(t => t.type === 'expense');
    const byCategory = {};
    
    expenses.forEach(expense => {
        if (!byCategory[expense.category]) {
            byCategory[expense.category] = 0;
        }
        byCategory[expense.category] += expense.amount;
    });
    
    return byCategory;
}

function renderChart() {
    const byCategory = getExpensesByCategory();
    const categories = Object.keys(byCategory);
    const amounts = Object.values(byCategory);
    
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

function renderBreakdown() {
    const byCategory = getExpensesByCategory();
    const container = document.getElementById('categoryBreakdown');
    
    container.innerHTML = '';
    for (const [category, amount] of Object.entries(byCategory)) {
        const div = document.createElement('div');
        div.className = 'transaction-item';
        div.innerHTML = `
            <span>${category}</span>
            <span style="color: #e74c3c; font-weight: bold;">${amount} ₽</span>
        `;
        container.appendChild(div);
    }
}

if (document.getElementById('expenseChart')) {
    renderChart();
    renderBreakdown();
}