// Bootstrap for Willow House: routing, month navigation and
// wiring every control to the store, then rendering the view.
import { loadState, saveState, monthKey, monthLabel, sampleState, shiftMonth } from './store.js';
import { renderDashboard, renderTransactions, renderBudgets } from './views.js';
import { renderGoals, renderInsights } from './views.js';
const state = loadState() || sampleState();
let route = 'dashboard';
let month = monthKey(new Date(2026, 10, 1));
const root = document.getElementById('view');
const monthName = document.getElementById('month-name');
function render() {
  monthName.textContent = monthLabel(month);
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
  if (route === 'transactions') root.innerHTML = renderTransactions(state, month);
  else if (route === 'budgets') root.innerHTML = renderBudgets(state, month);
  else if (route === 'goals') root.innerHTML = renderGoals(state, month);
  else if (route === 'insights') root.innerHTML = renderInsights(state, month);
  else root.innerHTML = renderDashboard(state, month);
  wireView();
}
function readRoute() {
  const h = location.hash.replace('#/', '');
  route = ['dashboard', 'transactions', 'budgets', 'goals', 'insights'].includes(h) ? h : 'dashboard';
}
function save() { saveState(state); render(); }
function wireView() {
  const addForm = document.getElementById('add-form');
  if (addForm) addForm.addEventListener('submit', onAddTxn);
  document.querySelectorAll('[data-del]').forEach((b) => {
    b.addEventListener('click', () => {
      state.txns = state.txns.filter((t) => t.id !== b.dataset.del);
      save();
    });
  });
  document.querySelectorAll('[data-edit]').forEach((b) => {
    b.addEventListener('click', () => fillEditForm(b.dataset.edit));
  });
  document.querySelectorAll('[data-addfunds]').forEach((b) => {
    b.addEventListener('click', () => addFunds(b.dataset.addfunds));
  });
  const goalForm = document.getElementById('goal-form');
  if (goalForm) goalForm.addEventListener('submit', onAddGoal);
  const filter = document.getElementById('txn-filter');
  if (filter) filter.addEventListener('input', () => {
    const v = filter.value;
    render();
    const again = document.getElementById('txn-filter');
    if (again) { again.focus(); again.setSelectionRange(v.length, v.length); }
  });
  document.querySelectorAll('[data-budget]').forEach((input) => {
    input.addEventListener('change', onBudgetChange);
  });
  document.querySelectorAll('.fund-form').forEach((form) => {
    form.addEventListener('submit', onFundSubmit);
  });
}
function onAddTxn(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const amount = Math.round(parseFloat(f.get('amount')) * 100) / 100;
  if (!amount || amount <= 0) return;
  const editId = f.get('editId');
  if (editId) {
    const t = state.txns.find((x) => x.id === editId);
    if (t) {
      t.desc = String(f.get('desc')).trim(); t.amount = amount;
      t.date = String(f.get('date')); t.type = String(f.get('type'));
      t.category = String(f.get('category'));
    }
  } else {
    state.txns.push({
      id: 't' + Date.now().toString(36),
      date: String(f.get('date')), desc: String(f.get('desc')).trim(),
      category: String(f.get('category')), amount, type: String(f.get('type')),
    });
  }
  save();
}
function fillEditForm(id) {
  const t = state.txns.find((x) => x.id === id);
  if (!t) return;
  const form = document.getElementById('add-form');
  if (!form) { location.hash = '#/transactions'; return; }
  form.desc.value = t.desc; form.amount.value = t.amount;
  form.date.value = t.date; form.type.value = t.type;
  form.category.value = t.category; form.editId.value = t.id;
  form.querySelector('button[type=submit]').textContent = 'Save changes';
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function onAddGoal(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const target = parseFloat(f.get('target'));
  if (!target || target <= 0) return;
  state.goals.push({
    id: 'g' + Date.now().toString(36),
    name: String(f.get('name')).trim(),
    target, saved: Math.max(parseFloat(f.get('saved')) || 0, 0),
    note: 'Added by the household.',
  });
  save();
}
function addFunds(id) {
  const form = document.querySelector('.fund-form[data-goal="' + id + '"]');
  if (!form) return;
  const input = form.querySelector('input');
  const amount = parseFloat(input.value);
  if (!amount || amount <= 0) { input.focus(); return; }
  const g = state.goals.find((x) => x.id === id);
  if (g) g.saved = Math.round((g.saved + amount) * 100) / 100;
  save();
}
function onBudgetChange(e) {
  const input = e.target.closest('[data-budget]');
  if (!input) return;
  const v = parseFloat(input.value);
  if (Number.isNaN(v) || v < 0) return;
  state.budgets[input.dataset.budget] = Math.round(v);
  saveState(state);
  render();
}
function onFundSubmit(e) {
  e.preventDefault();
  addFunds(e.target.dataset.goal);
}
function init() {
  readRoute();
  render();
  window.addEventListener('hashchange', () => { readRoute(); render(); });
  document.getElementById('month-prev').addEventListener('click', () => {
    month = shiftMonth(month, -1); render();
  });
  document.getElementById('month-next').addEventListener('click', () => {
    month = shiftMonth(month, 1); render();
  });
  document.getElementById('reset-sample').addEventListener('click', () => {
    const fresh = sampleState();
    state.txns = fresh.txns; state.budgets = fresh.budgets; state.goals = fresh.goals;
    save();
  });
  document.getElementById('clear-all').addEventListener('click', () => {
    if (!window.confirm('Clear every transaction, budget and goal?')) return;
    state.txns = []; state.budgets = {}; state.goals = [];
    save();
  });
}
saveState(state);
init();
