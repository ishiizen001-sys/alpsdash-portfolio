const yen = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 });
const num = new Intl.NumberFormat('ja-JP');

fetch('./demo-data/dashboard.json')
  .then((response) => response.json())
  .then(render)
  .catch((error) => {
    document.body.insertAdjacentHTML('beforeend', `<p style="padding:24px">Demo data could not be loaded: ${error.message}</p>`);
  });

function render(data) {
  const summary = [
    ['売上', yen.format(data.summary.sales), `対象期間 ${data.period}`],
    ['客数', `${num.format(data.summary.customers)}人`, '購買客数'],
    ['客単価', yen.format(data.summary.avgSpend), '売上 ÷ 客数'],
    ['目標達成率', `${data.summary.targetAchievement.toFixed(1)}%`, data.summary.targetAchievement >= 100 ? '目標達成' : '目標未達'],
  ];
  document.querySelector('#summary').innerHTML = summary.map(([label, value, sub]) => `
    <article class="metric"><div class="metric-label">${label}</div><div class="metric-value">${value}</div><div class="metric-sub">${sub}</div></article>
  `).join('');

  document.querySelector('#stores').innerHTML = data.stores.map((store) => {
    const statusLabel = store.targetAchievement >= 103 ? 'ON TRACK' : store.targetAchievement >= 100 ? 'WATCH' : 'ACTION';
    const statusClass = store.targetAchievement >= 103 ? 'good' : store.targetAchievement >= 100 ? 'warn' : 'bad';
    return `
      <article class="store-card">
        <div class="store-top"><div class="store-name">${store.name}</div><span class="status ${statusClass}">${statusLabel}</span></div>
        <div class="store-kpis">
          <div class="mini"><span>売上</span><strong>${yen.format(store.sales)}</strong></div>
          <div class="mini"><span>客数</span><strong>${num.format(store.customers)}</strong></div>
          <div class="mini"><span>客単価</span><strong>${yen.format(store.avgSpend)}</strong></div>
        </div>
        <div class="mini" style="margin-top:12px"><span>目標達成率</span><strong>${store.targetAchievement.toFixed(1)}%</strong></div>
      </article>`;
  }).join('');

  document.querySelector('#products').innerHTML = data.products.map((product, index) => `
    <div class="product-row"><div class="rank">${String(index + 1).padStart(2, '0')}</div><div class="product-name">${product.name}</div><div class="product-sales">${yen.format(product.sales)}</div></div>
  `).join('');

  document.querySelector('#insights').innerHTML = data.insights.map((insight) => `
    <div class="insight"><div class="insight-title">${insight.title}</div><p>${insight.body}</p></div>
  `).join('');

  document.querySelector('#quality').innerHTML = data.quality.map((item) => `
    <div class="quality-row"><strong>${item.label}</strong><div class="bar"><span style="width:${item.score}%"></span></div><div>${item.score}%</div></div>
  `).join('');
}
