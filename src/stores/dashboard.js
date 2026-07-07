import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref([
    { label: 'Total Users', value: '24,561', change: '+12.5%' },
    { label: 'Active Now', value: '1,423', change: '+3.2%' },
    { label: 'Revenue', value: '$48,290', change: '+8.7%' },
    { label: 'Bounce Rate', value: '32.1%', change: '-2.4%' }
  ])

  const recentOrders = ref([
    { id: '#ORD-001', customer: 'Alice Chen', product: 'Pro Plan', amount: '$99.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Bob Martinez', product: 'Starter', amount: '$29.00', status: 'Pending' },
    { id: '#ORD-003', customer: 'Clara Wei', product: 'Enterprise', amount: '$299.00', status: 'Completed' },
    { id: '#ORD-004', customer: 'David Kim', product: 'Pro Plan', amount: '$99.00', status: 'Failed' },
    { id: '#ORD-005', customer: 'Eva Johansson', product: 'Starter', amount: '$29.00', status: 'Completed' }
  ])

  return { stats, recentOrders }
})
