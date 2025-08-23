document.addEventListener('DOMContentLoaded', function() {
  flatpickr("#expense-date", {
    dateFormat: "Y-m-d",
    defaultDate: "today"
  });
  const budgetModal = new bootstrap.Modal(document.getElementById('budget-modal'));
  document.getElementById('add-budget-btn').addEventListener('click', function() {
    document.getElementById('budget-modal-title').textContent = 'Add Budget';
    document.getElementById('budget-form').reset();
    budgetModal.show();
  });
  const periodButtons = document.querySelectorAll('.period-toggle .btn');
  periodButtons.forEach(button => {
    button.addEventListener('click', function() {
      periodButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      updateSummary(this.getAttribute('data-period'));
    });
  });
  function updateSummary(period) {
    let totalAmount, highest, frequent, average;
    switch(period) {
      case 'week':
        totalAmount = '$325.45';
        highest = 'Food <span class="text-muted">$85.40</span>';
        frequent = 'Food <span class="text-muted">4 times</span>';
        average = '$46.49';
        document.querySelector('.summary-box small').textContent = 'Current week';
        break;
      case 'month':
        totalAmount = '$1,245.67';
        highest = 'Housing <span class="text-muted">$500.00</span>';
        frequent = 'Food <span class="text-muted">12 times</span>';
        average = '$41.52';
        document.querySelector('.summary-box small').textContent = 'Current month';
        break;
      case 'year':
        totalAmount = '$12,685.34';
        highest = 'Housing <span class="text-muted">$6,000.00</span>';
        frequent = 'Food <span class="text-muted">145 times</span>';
        average = '$34.75';
        document.querySelector('.summary-box small').textContent = 'Current year';
        break;
    }
    document.querySelector('.summary-box h3').textContent = totalAmount;
    document.querySelectorAll('.d-flex.justify-content-between h6')[0].innerHTML = highest;
    document.querySelectorAll('.d-flex.justify-content-between h6')[1].innerHTML = frequent;
    document.querySelector('div > p.mb-1.text-muted + h6').textContent = average;
  }
  initializeCharts();
  function initializeCharts() {
    const lineCtx = document.getElementById('line-chart').getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'],
        datasets: [{
          label: 'Daily Expenses',
          data: [65, 45, 75, 35, 60, 80, 40],
          borderColor: '#6366f1',
          tension: 0.4,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
    const barCtx = document.getElementById('bar-chart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Shopping'],
        datasets: [{
          label: 'Monthly Expenses by Category',
          data: [320, 120, 500, 145, 180, 250],
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(14, 165, 233, 0.7)'
          ]
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    const pieCtx = document.getElementById('pie-chart').getContext('2d');
    new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Food', 'Transport', 'Housing', 'Utilities', 'Entertainment', 'Shopping'],
        datasets: [{
          data: [320, 120, 500, 145, 180, 250],
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(14, 165, 233, 0.7)'
          ],
          hoverOffset: 4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    const areaCtx = document.getElementById('area-chart').getContext('2d');
    new Chart(areaCtx, {
      type: 'line',
      data: {
        labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'],
        datasets: [{
          label: 'Cumulative Spending',
          data: [100, 300, 550, 700, 900, 1100, 1245],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.3)',
          fill: true,
          tension: 0.2
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Expense form submit
  document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Expense added successfully! (prototype only)');
    this.reset();
    flatpickr("#expense-date", { dateFormat: "Y-m-d", defaultDate: "today" });
  });
  document.getElementById('save-budget-btn').addEventListener('click', function() {
    const form = document.getElementById('budget-form');
    if (form.checkValidity()) {
      alert('Budget saved successfully! (prototype only)');
      budgetModal.hide();
    } else {
      form.reportValidity();
    }
  });
});
