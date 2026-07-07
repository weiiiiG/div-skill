// api/users.js — API 请求层示例
// 按照 div-skill 规范，所有后端 API 调用应集中在 api/ 目录

const BASE_URL = '/api';

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${BASE_URL}/dashboard/stats`);
  return res.json();
}
