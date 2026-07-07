import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref([
    { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
    { title: 'Subscriptions', value: '2,350', change: '+180.1%', trend: 'up' },
    { title: 'Sales', value: '12,234', change: '+19%', trend: 'up' },
    { title: 'Active Now', value: '573', change: '+201', trend: 'up' },
  ])

  const tableData = ref([
    { id: 1, name: 'Liam Johnson', email: 'liam@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Olivia Smith', email: 'olivia@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Noah Williams', email: 'noah@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Emma Brown', email: 'emma@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'James Davis', email: 'james@example.com', role: 'Admin', status: 'Active' },
  ])

  const sidebarLinks = ref([
    { label: 'Dashboard', icon: '\u{1F4CA}', route: '/dashboard' },
    { label: 'Analytics', icon: '\u{1F4C8}', route: '/analytics' },
    { label: 'Settings', icon: '⚙️', route: '/settings' },
  ])

  return { stats, tableData, sidebarLinks }
})
