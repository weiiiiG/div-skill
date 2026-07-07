// composables/useAuth.js — Vue 组合式函数示例
import { ref, computed } from 'vue'

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  async function checkAuth() {
    const token = localStorage.getItem('token')
    if (!token) { loading.value = false; return }
    try {
      const res = await fetch('/api/auth/me')
      user.value = await res.json()
    } finally {
      loading.value = false
    }
  }

  return { user, loading, checkAuth }
}
