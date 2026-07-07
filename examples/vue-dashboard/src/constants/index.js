// constants/index.js — 常量配置示例
export const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export const ROUTES = {
  DASHBOARD: '/',
  USERS: '/users',
  SETTINGS: '/settings',
}

export const STATUS_LABELS = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
}
