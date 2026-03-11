document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle
    const toggleBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Chart.js Setup
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    // Gradient for chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Revenue (USD)',
                data: [65000, 78000, 95000, 110000, 105000, 125000, 145000],
                borderColor: '#00f0ff',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: '#bf00ff',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00f0ff',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255,255,255,0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a0a0b0'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a0a0b0'
                    }
                }
            }
        }
    });

    // Mock Recent Orders table
    const mockOrders = [
        { id: 'AG-8V7B', name: 'J. Shepard', status: 'Shipped', amount: 899.99 },
        { id: 'AG-9M2X', name: 'S. Aran', status: 'Processing', amount: 149.99 },
        { id: 'AG-4F1L', name: 'M. Chief', status: 'Shipped', amount: 1299.99 },
        { id: 'AG-2P9K', name: 'G. Freeman', status: 'Processing', amount: 499.99 },
        { id: 'AG-7R3T', name: 'C. Redfield', status: 'Processing', amount: 299.99 }
    ];

    const tbody = document.getElementById('orders-tbody');
    let tableHtml = '';
    
    mockOrders.forEach(order => {
        const badgeClass = order.status === 'Shipped' ? 'status-shipped' : 'status-processing';
        tableHtml += `
            <tr>
                <td style="color: var(--primary-color)">${order.id}</td>
                <td>${order.name}</td>
                <td><span class="status-badge ${badgeClass}">${order.status}</span></td>
                <td style="font-weight: bold;">$${order.amount}</td>
            </tr>
        `;
    });

    tbody.innerHTML = tableHtml;
});
