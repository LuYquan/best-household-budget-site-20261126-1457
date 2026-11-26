// Sample household data for Willow House.
// Every figure is realistic demo data, clearly labelled in the
// interface as sample data the household can clear or replace.
export const CATEGORIES = [
{ id: 'housing', label: 'Housing', color: '#1f6f4a' },
{ id: 'groceries', label: 'Groceries', color: '#d9a441' },
{ id: 'transport', label: 'Transport', color: '#2e6f8e' },
{ id: 'dining', label: 'Dining out', color: '#b3402e' },
{ id: 'utilities', label: 'Utilities', color: '#7a6aa8' },
{ id: 'health', label: 'Health', color: '#3d8b6f' },
{ id: 'kids', label: 'Kids & school', color: '#c26a8a' },
{ id: 'fun', label: 'Fun & leisure', color: '#8a6d3b' },
{ id: 'shopping', label: 'Shopping', color: '#5b7a99' },
{ id: 'other', label: 'Other', color: '#8a8a7a' },
];
export const INCOME_CATEGORIES = [
{ id: 'salary', label: 'Salary' },
{ id: 'freelance', label: 'Freelance' },
{ id: 'other-income', label: 'Other income' },
];
export const DEFAULT_BUDGETS = {
housing: 1850, groceries: 720, transport: 340, dining: 260,
utilities: 310, health: 180, kids: 220, fun: 200, shopping: 240,
other: 120,
};
export const SAMPLE_GOALS = [
{ id: 'g1', name: 'Emergency fund', target: 6000, saved: 4250,
  note: 'Six months of essentials, one deposit at a time.' },
{ id: 'g2', name: 'Summer road trip', target: 1800, saved: 940,
  note: 'Gas, cabins and ice cream for four.' },
{ id: 'g3', name: 'New washing machine', target: 950, saved: 620,
  note: 'The old one rattles on spin cycle.' },
];
// November 2026: a full believable month for a family of four.
export const SAMPLE_TXNS = [
{ id: 'n01', date: '2026-11-01', desc: 'Maya — salary, City Library', category: 'salary', amount: 3420, type: 'income' },
{ id: 'n02', date: '2026-11-01', desc: 'Rent — Willow Court Apt 4B', category: 'housing', amount: 1850, type: 'expense' },
{ id: 'n03', date: '2026-11-02', desc: 'GreenMart weekly shop', category: 'groceries', amount: 148.60, type: 'expense' },
{ id: 'n04', date: '2026-11-03', desc: 'Electricity — City Power', category: 'utilities', amount: 96.40, type: 'expense' },
{ id: 'n05', date: '2026-11-04', desc: 'School lunches — Leo & June', category: 'kids', amount: 64, type: 'expense' },
{ id: 'n06', date: '2026-11-05', desc: 'Bus passes (2 adult)', category: 'transport', amount: 112, type: 'expense' },
{ id: 'n07', date: '2026-11-06', desc: 'Pizza night — Tony’s', category: 'dining', amount: 42.80, type: 'expense' },
{ id: 'n08', date: '2026-11-07', desc: 'GreenMart weekly shop', category: 'groceries', amount: 161.25, type: 'expense' },
{ id: 'n09', date: '2026-11-08', desc: 'Dentist check-up — June', category: 'health', amount: 85, type: 'expense' },
{ id: 'n10', date: '2026-11-09', desc: 'Tom — salary, Northside Garage', category: 'salary', amount: 2980, type: 'income' },
{ id: 'n11', date: '2026-11-10', desc: 'Petrol — Shell Northside', category: 'transport', amount: 58.20, type: 'expense' },
{ id: 'n12', date: '2026-11-11', desc: 'Water & sewer', category: 'utilities', amount: 74.10, type: 'expense' },
{ id: 'n13', date: '2026-11-12', desc: 'GreenMart weekly shop', category: 'groceries', amount: 139.90, type: 'expense' },
{ id: 'n14', date: '2026-11-13', desc: 'Cinema — Leo’s birthday treat', category: 'fun', amount: 56, type: 'expense' },
{ id: 'n15', date: '2026-11-14', desc: 'Pharmacy — prescriptions', category: 'health', amount: 32.50, type: 'expense' },
{ id: 'n16', date: '2026-11-15', desc: 'Tom — weekend overtime', category: 'freelance', amount: 420, type: 'income' },
{ id: 'n17', date: '2026-11-16', desc: 'Internet — Fiber 200', category: 'utilities', amount: 59, type: 'expense' },
{ id: 'n18', date: '2026-11-17', desc: 'GreenMart weekly shop', category: 'groceries', amount: 172.40, type: 'expense' },
{ id: 'n19', date: '2026-11-18', desc: 'New school shoes — June', category: 'kids', amount: 68, type: 'expense' },
{ id: 'n20', date: '2026-11-19', desc: 'Takeaway — noodle bar', category: 'dining', amount: 38.50, type: 'expense' },
{ id: 'n21', date: '2026-11-20', desc: 'Winter coats — Leo & June', category: 'shopping', amount: 124, type: 'expense' },
{ id: 'n22', date: '2026-11-21', desc: 'GreenMart weekly shop', category: 'groceries', amount: 155.75, type: 'expense' },
{ id: 'n23', date: '2026-11-22', desc: 'Car service — oil & brakes', category: 'transport', amount: 186, type: 'expense' },
{ id: 'n24', date: '2026-11-23', desc: 'Mobile plans (2 lines)', category: 'utilities', amount: 68, type: 'expense' },
{ id: 'n25', date: '2026-11-24', desc: 'Library book sale — Maya', category: 'freelance', amount: 45, type: 'income' },
{ id: 'n26', date: '2026-11-25', desc: 'Thanksgiving groceries', category: 'groceries', amount: 96.30, type: 'expense' },
{ id: 'n27', date: '2026-11-26', desc: 'Board games night', category: 'fun', amount: 34.99, type: 'expense' },
];
// October 2026, for month-to-month comparison.
export const SAMPLE_TXNS_OCT = [
{ id: 'o01', date: '2026-10-01', desc: 'Maya — salary, City Library', category: 'salary', amount: 3420, type: 'income' },
{ id: 'o02', date: '2026-10-01', desc: 'Rent — Willow Court Apt 4B', category: 'housing', amount: 1850, type: 'expense' },
{ id: 'o03', date: '2026-10-03', desc: 'GreenMart weekly shop', category: 'groceries', amount: 152.10, type: 'expense' },
{ id: 'o04', date: '2026-10-06', desc: 'Electricity — City Power', category: 'utilities', amount: 88.20, type: 'expense' },
{ id: 'o05', date: '2026-10-09', desc: 'Tom — salary, Northside Garage', category: 'salary', amount: 2980, type: 'income' },
{ id: 'o06', date: '2026-10-10', desc: 'GreenMart weekly shop', category: 'groceries', amount: 144.80, type: 'expense' },
{ id: 'o07', date: '2026-10-12', desc: 'Petrol — Shell Northside', category: 'transport', amount: 61.40, type: 'expense' },
{ id: 'o08', date: '2026-10-15', desc: 'Dinner out — anniversary', category: 'dining', amount: 86, type: 'expense' },
{ id: 'o09', date: '2026-10-17', desc: 'GreenMart weekly shop', category: 'groceries', amount: 158.30, type: 'expense' },
{ id: 'o10', date: '2026-10-20', desc: 'Kids’ winter boots', category: 'kids', amount: 92, type: 'expense' },
{ id: 'o11', date: '2026-10-22', desc: 'Internet — Fiber 200', category: 'utilities', amount: 59, type: 'expense' },
{ id: 'o12', date: '2026-10-24', desc: 'GreenMart weekly shop', category: 'groceries', amount: 149.60, type: 'expense' },
{ id: 'o13', date: '2026-10-26', desc: 'Cinema & popcorn', category: 'fun', amount: 48, type: 'expense' },
{ id: 'o14', date: '2026-10-28', desc: 'Pharmacy — flu jabs (2)', category: 'health', amount: 56, type: 'expense' },
{ id: 'o15', date: '2026-10-30', desc: 'Halloween costumes', category: 'shopping', amount: 74, type: 'expense' },
];
SAMPLE_TXNS.push(...SAMPLE_TXNS_OCT);
