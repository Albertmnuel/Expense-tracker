let budget = 0;
let totalExpenses = 0;

const budgetInput = document.getElementById('budgetInput');
const calBtn = document.getElementById('calBtn');
const productInput = document.getElementById('productInput');
const priceValue = document.getElementById('priceValue');
const addBtn = document.getElementById('addBtn');
const budgetNumber = document.getElementById('budgetNumber');
const expenseNumber = document.getElementById('expenseNumber');
const balNumber = document.getElementById('balNumber');
const list = document.getElementById('list');


function animateValue(el, start, end, duration) {
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = `$${(start + range * progress).toFixed(2)}`;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}


function updateDisplay() {
  animateValue(budgetNumber, parseFloat(budgetNumber.textContent.slice(1)) || 0, budget, 400);
  animateValue(expenseNumber, parseFloat(expenseNumber.textContent.slice(1)) || 0, totalExpenses, 400);
  animateValue(balNumber, parseFloat(balNumber.textContent.slice(1)) || 0, budget - totalExpenses, 400);
}


calBtn.addEventListener('click', () => {
  const val = parseFloat(budgetInput.value) || 0;
  budget = val;
  updateDisplay();
});


addBtn.addEventListener('click', () => {
  const name = productInput.value.trim();
  const amount = parseFloat(priceValue.value) || 0;

  if (name && amount > 0) {
    totalExpenses += amount;

    const emptyState = document.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML = `
      <span class="expense-name">${name}</span>
      <span>
        <span class="expense-amount">-$${amount.toFixed(2)}</span>
        <button class="delete-btn">Delete</button>
      </span>
    `;

    list.appendChild(li);

   
    li.querySelector('.delete-btn').addEventListener('click', () => {
      totalExpenses -= amount;
      li.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      li.style.opacity = '0';
      li.style.transform = 'translateX(30px)';
      setTimeout(() => {
        li.remove();
        if (list.children.length === 0) {
          list.innerHTML = '<div class="empty-state">No expenses added yet</div>';
        }
        updateDisplay();
      }, 300);
    });

    productInput.value = '';
    priceValue.value = '';
    updateDisplay();
  } else {
    alert('Please enter valid expense details.');
  }
});