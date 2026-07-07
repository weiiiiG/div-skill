import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  stats: [
    { id: 1, label: 'Total Revenue', value: '$48,250', change: '+12.5%', trend: 'up' },
    { id: 2, label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up' },
    { id: 3, label: 'Orders', value: '1,423', change: '-3.1%', trend: 'down' },
    { id: 4, label: 'Conversion Rate', value: '3.24%', change: '+1.4%', trend: 'up' },
  ],
  transactions: [
    { id: 'TRX-001', customer: 'Alice Johnson', amount: 320.0, status: 'Completed', date: '2026-07-05' },
    { id: 'TRX-002', customer: 'Bob Smith', amount: 150.5, status: 'Pending', date: '2026-07-06' },
    { id: 'TRX-003', customer: 'Carol White', amount: 890.0, status: 'Completed', date: '2026-07-04' },
    { id: 'TRX-004', customer: 'David Lee', amount: 45.99, status: 'Failed', date: '2026-07-06' },
    { id: 'TRX-005', customer: 'Eve Brown', amount: 1230.0, status: 'Completed', date: '2026-07-03' },
    { id: 'TRX-006', customer: 'Frank Miller', amount: 275.0, status: 'Pending', date: '2026-07-07' },
  ],
}));

export default useDashboardStore;
