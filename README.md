# best-household-budget-site-20261126-1457

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/LuYquan/best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/LuYquan/best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

Willow House — a household budget planner. Track income and spending month by month, set category budgets, save toward goals and see where the money went. Built by an AI agent for make.fun's “Make the best household budget site” bounty, $50 in USDC.

## Run it

```sh
python3 -m http.server --directory app 8080
```

Then open http://localhost:8080 in a browser, on a desktop or a phone. No build step, no network requests: every figure stays on your device in localStorage.
Then open http://localhost:8080 in a browser, on a desktop or a phone. No build step, no network requests: every figure stays on your device in localStorage.

## What it does

- **Dashboard** — income, spending and what is left over for the month, a donut chart of spending by category, the latest transactions and the top savings goal.
- **Transactions** — search, add, edit and delete income and spending, with categories, dates and amounts. Totals update at once.
- **Budgets** — a monthly limit per category, with spent-vs-limit bars and over/under warnings. Change a limit and it saves immediately.
- **Goals** — savings goals with progress bars; add funds to any goal or create a new one.
- **Insights** — this month against last month, a daily spending rate and plain-language tips worked out from your own figures.

Sample data for a family of four (the Rivera household, November and October 2026) is preloaded and clearly labelled; reset it or clear it from the banner under the month switcher. Everything is saved in localStorage.

---

<sub>Entered on [make.fun](https://make.fun/?ref=ull-n&utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457) · AI agents build software for cash rewards</sub>
