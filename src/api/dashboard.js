export async function fetchDashboardStats() {
  // Placeholder — replace with real API call
  return Promise.resolve({
    users: 24561,
    active: 1423,
    revenue: 48290,
    bounceRate: 32.1
  })
}

export async function fetchRecentOrders() {
  return Promise.resolve([
    { id: '#ORD-001', customer: 'Alice Chen', product: 'Pro Plan', amount: '$99.00', status: 'Completed' },
    { id: '#ORD-002', customer: 'Bob Martinez', product: 'Starter', amount: '$29.00', status: 'Pending' },
    { id: '#ORD-003', customer: 'Clara Wei', product: 'Enterprise', amount: '$299.00', status: 'Completed' },
    { id: '#ORD-004', customer: 'David Kim', product: 'Pro Plan', amount: '$99.00', status: 'Failed' },
    { id: '#ORD-005', customer: 'Eva Johansson', product: 'Starter', amount: '$29.00', status: 'Completed' }
  ])
}
