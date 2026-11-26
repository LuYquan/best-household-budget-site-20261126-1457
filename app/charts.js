// Hand-drawn SVG charts for Willow House. No chart library,
// no network: every chart is built from the numbers in the store.
export function money(n) {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  return sign + '$' + abs.toLocaleString('en-US',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function donut(parts, size) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  const r = 62, cx = 90, cy = 90;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  let arcs = '';
  for (const p of parts) {
    const frac = p.value / total;
    const len = Math.max(frac * circ - 2, 0);
    arcs += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + p.color + '" stroke-width="26" stroke-dasharray="' + len.toFixed(1) + ' ' + circ.toFixed(1) + '" stroke-dashoffset="' + (-offset).toFixed(1) + '" transform="rotate(-90 ' + cx + ' ' + cy + ')"/>';
    offset += frac * circ;
  }
  return '<svg class="donut" viewBox="0 0 180 180" width="' + size + '" height="' + size + '" role="img" aria-label="Spending by category">' + arcs + '<text x="90" y="84" text-anchor="middle" class="donut-total">' + money(total) + '</text><text x="90" y="104" text-anchor="middle" class="donut-cap">spent</text></svg>';
}
export function categoryBars(rows, maxValue) {
  let html = '<div class="bars">';
  for (const r of rows) {
    const pct = maxValue > 0 ? Math.round((r.value / maxValue) * 100) : 0;
    html += '<div class="bar-row"><span class="bar-label">' + r.label + '</span>'
      + '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%;background:' + r.color + '"></span></span>'
      + '<span class="bar-value">' + money(r.value) + '</span></div>';
  }
  return html + '</div>';
}
export function budgetBar(spent, limit) {
  const pct = limit > 0 ? Math.min(Math.round((spent / limit) * 100), 100) : 0;
  const over = limit > 0 && spent > limit;
  const cls = over ? 'bar-fill over' : 'bar-fill';
  const color = over ? '#b3402e' : (pct > 80 ? '#d9a441' : '#1f6f4a');
  return '<span class="bar-track wide"><span class="' + cls + '" style="width:' + pct + '%;background:' + color + '"></span></span>';
}
