// utils/format.js — 工具函数示例
export function formatCurrency(amount) {
  return `¥${amount.toLocaleString()}`
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
