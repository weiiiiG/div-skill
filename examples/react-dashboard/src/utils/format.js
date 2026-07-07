// utils/format.js — 工具函数示例
// 按照 div-skill 规范，纯函数应放在 utils/，而非 hooks/ 或组件内

export function formatCurrency(amount) {
  return `$${amount.toLocaleString()}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('zh-CN');
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
