// types/index.ts — TypeScript 类型定义示例
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
}

export interface StatCard {
  label: string
  value: string | number
  change?: number
}
