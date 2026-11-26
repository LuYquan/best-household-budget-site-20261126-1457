// State for Willow House: load, save, filter and summarise.
// All data lives in localStorage; nothing leaves the browser.
import { CATEGORIES, SAMPLE_TXNS, SAMPLE_GOALS, DEFAULT_BUDGETS } from './data.js';
export const STORAGE_KEY = 'willow-house-budget-v1';
export function monthKey(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
}
export function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  const name = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'][m - 1];
  return name + ' ' + y;
}
export function shiftMonth(key, delta) {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return monthKey(d);
}
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.txns)) return parsed;
    }
  } catch (e) { /* corrupted storage: fall through to sample */ }
  return null;
}
export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
export function sampleState() {
  return {
    txns: SAMPLE_TXNS.map((t) => ({ ...t })),
    budgets: { ...DEFAULT_BUDGETS },
    goals: SAMPLE_GOALS.map((g) => ({ ...g })),
  };
}
export function txnsForMonth(state, key) {
  return state.txns.filter((t) => t.date.slice(0, 7) === key)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function summarise(state, key) {
  const list = txnsForMonth(state, key);
  let income = 0, spent = 0, incomeCount = 0, expenseCount = 0;
  const byCat = {};
  for (const t of list) {
    if (t.type === 'income') { income += t.amount; incomeCount++; }
    else {
      spent += t.amount; expenseCount++;
      byCat[t.category] = (byCat[t.category] || 0) + t.amount;
    }
  }
  const balance = income - spent;
  const savedPct = income > 0 ? Math.round((balance / income) * 100) : 0;
  return { income, spent, balance, incomeCount, expenseCount, savedPct, byCat, list };
}
export function budgetFor(state, catId) {
  return state.budgets[catId];
}
export function spentInCategory(state, key, catId) {
  const s = summarise(state, key);
  return s.byCat[catId] || 0;
}
export function addTxn(state, txn) {
  state.txns.push(txn);
  saveState(state);
}
export function nextId(state) {
  return 't' + Date.now().toString(36) + Math.floor(Math.random() * 1000);
}
