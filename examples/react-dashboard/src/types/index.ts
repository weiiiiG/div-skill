// types/index.ts — TypeScript 类型定义示例
// 按照 div-skill 规范，类型定义应提取到 types/，而非内联在组件中

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: number;
}

export interface DashboardData {
  stats: StatCard[];
  users: User[];
}
