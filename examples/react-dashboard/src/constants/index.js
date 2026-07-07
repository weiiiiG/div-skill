// constants/index.js — 常量配置示例
// 按照 div-skill 规范，应用级常量应集中在 constants/

export const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const ROUTES = {
  DASHBOARD: '/',
  USERS: '/users',
  SETTINGS: '/settings',
  LOGIN: '/login',
};

export const STATUS_LABELS = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
};
