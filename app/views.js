// Views for Willow House: render each section from the store.
import { CATEGORIES, INCOME_CATEGORIES } from './data.js';
import { money, donut, categoryBars, budgetBar } from './charts.js';
import { monthLabel, shiftMonth, summarise } from './store.js';
export function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
export function categoryLabel(id) {
  const c = CATEGORIES.find((x) => x.id === id)
    || INCOME_CATEGORIES.find((x) => x.id === id);
  return c ? c.label : 'Other';
}
export function categoryColor(id) {
  const c = CATEGORIES.find((x) => x.id === id);
  return c ? c.color : '#8a8a7a';
}
export function txnRow(t, showDate) {
  const sign = t.type === 'income' ? '+' : '−';
  const cls = t.type === 'income' ? 'amt in' : 'amt out';
  const date = showDate ? '<td>' + esc(t.date.slice(5)) + '</td>' : '';
  return '<tr><td>' + esc(t.desc) + '</td>' + date
    + '<td><span class="chip" style="--chip:' + categoryColor(t.category) + '">' + esc(categoryLabel(t.category)) + '</span></td>'
    + '<td class="' + cls + '">' + sign + money(t.amount).slice(0) + '</td>'
    + '<td class="row-actions"><button type="button" data-edit="' + t.id + '">Edit</button>'
    + '<button type="button" data-del="' + t.id + '">Delete</button></td></tr>';
}
export function summaryCards(summary) {
  return '<section class="cards">'
    + '<div class="card income"><span>Money in</span><strong class="num">' + money(summary.income) + '</strong><small>' + summary.incomeCount + ' payments</small></div>'
    + '<div class="card spent"><span>Money out</span><strong class="num">' + money(summary.spent) + '</strong><small>' + summary.expenseCount + ' purchases</small></div>'
    + '<div class="card balance"><span>Left over</span><strong class="num">' + money(summary.balance) + '</strong><small>' + summary.savedPct + '% of income kept</small></div>'
    + '</section>';
}
export function renderDashboard(state, month) {
  const s = summarise(state, month);
  const rows = Object.entries(s.byCat)
    .map(([id, value]) => ({ label: categoryLabel(id), value, color: categoryColor(id) }))
    .sort((a, b) => b.value - a.value);
  const max = rows.length ? rows[0].value : 0;
  const top = rows.slice(0, 6);
  const recent = s.list.slice(0, 6);
  let recentHtml = '';
  for (const t of recent) recentHtml += txnRow(t, true);
  const goal = state.goals[0];
  const goalPct = goal ? Math.min(Math.round((goal.saved / goal.target) * 100), 100) : 0;
  return summaryCards(s)
    + '<section class="grid2"><div class="panel"><h2>Where ' + esc(monthLabel(month)) + '’s money went</h2>'
    + donut(rows, 180) + categoryBars(top, max) + '</div>'
    + '<div class="panel"><h2>Latest spending</h2>'
    + '<table class="txns"><tbody>' + recentHtml + '</tbody></table>'
    + '<p><a href="#/transactions">See all transactions →</a></p>'
    + (goal ? '<h2>Top savings goal</h2><p><strong>' + esc(goal.name) + '</strong> — ' + money(goal.saved) + ' of ' + money(goal.target) + '</p>' + budgetBar(goal.saved, goal.target) + '<p>' + goalPct + '% there · <a href="#/goals">All goals →</a></p>' : '')
    + '</div></section>';
}
export function renderTransactions(state, month) {
  const s = summarise(state, month);
  const q = (document.getElementById('txn-filter') || {}).value || '';
  const rows = s.list.filter((t) => {
    if (!q) return true;
    return (t.desc + ' ' + categoryLabel(t.category)).toLowerCase().includes(q.toLowerCase());
  });
  let body = '';
  for (const t of rows) body += txnRow(t, true);
  if (!rows.length) body = '<tr><td colspan="5">No transactions match. Try another search, or add one below.</td></tr>';
  return summaryCards(s)
    + '<section class="panel"><h2>Transactions — ' + esc(monthLabel(month)) + '</h2>'
    + '<label class="filter">Search <input id="txn-filter" type="search" placeholder="e.g. GreenMart or groceries" value="' + esc(q) + '"></label>'
    + '<table class="txns"><thead><tr><th>What</th><th>Date</th><th>Category</th><th>Amount</th><th></th></tr></thead><tbody>' + body + '</tbody></table></section>'
    + addFormHtml(month);
}
export function addFormHtml(month) {
  let opts = '';
  for (const c of CATEGORIES) opts += '<option value="' + c.id + '">' + c.label + '</option>';
  return '<section class="panel"><h2>Add a transaction</h2>'
    + '<form id="add-form"><label>Description <input name="desc" required maxlength="80" placeholder="e.g. GreenMart weekly shop"></label>'
    + '<label>Amount ($) <input name="amount" type="number" min="0.01" step="0.01" required placeholder="0.00"></label>'
    + '<label>Date <input name="date" type="date" required value="' + month + '-15"></label>'
    + '<label>Type <select name="type"><option value="expense">Spending</option><option value="income">Income</option></select></label>'
    + '<label>Category <select name="category">' + opts + '</select></label>'
    + '<input type="hidden" name="editId" value="">'
    + '<button class="primary" type="submit">Add transaction</button>'
    + '<p class="hint">Totals, charts and budget bars update the moment you save.</p></form></section>';
}
export function renderBudgets(state, month) {
  const s = summarise(state, month);
  let rows = '';
  let totalLimit = 0, totalSpent = 0;
  for (const c of CATEGORIES) {
    const limit = state.budgets[c.id] || 0;
    const spent = s.byCat[c.id] || 0;
    totalLimit += limit; totalSpent += spent;
    const left = limit - spent;
    const status = limit === 0 ? 'No limit set' : (left < 0 ? money(-left) + ' over' : money(left) + ' left');
    rows += '<div class="budget-row"><div class="budget-head"><strong>' + c.label + '</strong>'
      + '<span>' + money(spent) + ' of ' + money(limit) + ' · ' + status + '</span></div>'
      + budgetBar(spent, limit)
      + '<label>Monthly limit ($) <input type="number" min="0" step="10" value="' + limit + '" data-budget="' + c.id + '"></label></div>';
  }
  return summaryCards(s)
    + '<section class="panel"><h2>Category budgets — ' + esc(monthLabel(month)) + '</h2>'
    + '<p>Your limits add up to <strong>' + money(totalLimit) + '</strong> a month; you have spent <strong>' + money(totalSpent) + '</strong> so far. Change a limit and it saves at once.</p>'
    + rows + '</section>';
}
export function renderGoals(state, month) {
  let cards = '';
  for (const g of state.goals) {
    const pct = Math.min(Math.round((g.saved / g.target) * 100), 100);
    const left = Math.max(g.target - g.saved, 0);
    cards += '<div class="panel goal"><h2>' + esc(g.name) + '</h2><p>' + esc(g.note) + '</p>'
      + '<p class="goal-nums"><strong class="num">' + money(g.saved) + '</strong> of ' + money(g.target) + ' · ' + pct + '%</p>'
      + budgetBar(g.saved, g.target)
      + '<p>' + money(left) + ' to go</p>'
      + '<form class="fund-form" data-goal="' + g.id + '"><label>Add funds ($) <input type="number" min="1" step="1" required placeholder="50"></label><button type="submit">Add to goal</button></form></div>';
  }
  return '<section class="grid2">' + cards + '</section>'
    + '<section class="panel"><h2>Start a new savings goal</h2>'
    + '<form id="goal-form"><label>Goal name <input name="name" required maxlength="60" placeholder="e.g. New bike for Leo"></label>'
    + '<label>Target ($) <input name="target" type="number" min="1" step="1" required placeholder="500"></label>'
    + '<label>Already saved ($) <input name="saved" type="number" min="0" step="1" value="0"></label>'
    + '<button class="primary" type="submit">Create goal</button></form></section>';
}
export function renderInsights(state, month) {
  const now = summarise(state, month);
  const prev = summarise(state, shiftMonth(month, -1));
  const diff = now.spent - prev.spent;
  const diffText = diff > 0 ? money(diff) + ' more than last month' : money(-diff) + ' less than last month';
  const topCat = Object.entries(now.byCat).sort((a, b) => b[1] - a[1])[0];
  const daily = now.spent / 26;
  const tips = [];
  if (topCat) tips.push('<li><strong>' + esc(categoryLabel(topCat[0])) + '</strong> is your biggest spend at ' + money(topCat[1]) + ' — check the <a href="#/budgets">budget for it</a> first when money feels tight.</li>');
  tips.push('<li>You are spending about <strong>' + money(daily) + ' a day</strong> this month. A $5 daily saving keeps ' + money(5 * 30) + ' a month in the household.</li>');
  if (now.savedPct >= 20) tips.push('<li>You kept <strong>' + now.savedPct + '%</strong> of ' + esc(monthLabel(month)) + '’s income — above the 20% rule of thumb. Nice work; move the surplus to your emergency fund.</li>');
  else tips.push('<li>You kept <strong>' + now.savedPct + '%</strong> of income. The usual rule of thumb is 20% — your <a href="#/budgets">category budgets</a> show where the gap is.</li>');
  tips.push('<li>Groceries run about ' + money(now.byCat.groceries || 0) + ' this month across ' + state.txns.filter((t) => t.category === 'groceries' && t.date.slice(0, 7) === month).length + ' shops — one planned weekly shop beats five small ones.</li>');
  return summaryCards(now)
    + '<section class="grid2"><div class="panel"><h2>This month vs last month</h2>'
    + '<p class="big">' + money(now.spent) + ' <small>spent in ' + esc(monthLabel(month)) + '</small></p>'
    + '<p class="big">' + money(prev.spent) + ' <small>spent last month</small></p>'
    + '<p>You spent <strong>' + diffText + '</strong>.</p>'
    + '<p>Income was ' + money(now.income) + ' against ' + money(prev.income) + ' last month.</p></div>'
    + '<div class="panel"><h2>What to do next</h2><ul class="tips">' + tips.join('') + '</ul></div></section>'
    + '<section class="panel"><h2>How insights are worked out</h2><p>Everything on this page comes from the transactions you see in <a href="#/transactions">Transactions</a> — no outside data, no guesses. Change a transaction and these figures change too. “Last month” means the month before the one shown above; the sample household has October and November 2026 filled in.</p></section>';
}
