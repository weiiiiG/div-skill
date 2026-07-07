import { ref, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

export function useDashboard() {
  const store = useDashboardStore()
  const loading = ref(true)

  onMounted(async () => {
    // Simulate fetch delay
    await new Promise((r) => setTimeout(r, 300))
    loading.value = false
  })

  return { store, loading }
}
