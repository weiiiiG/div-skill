// hooks/useAuth.js — 认证逻辑示例
// 按照 div-skill 规范，认证逻辑应提取到 hooks/ 中

import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me')
        .then(r => r.json())
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { user, loading, login: (t) => { localStorage.setItem('token', t); }, logout: () => { localStorage.removeItem('token'); setUser(null); } };
}
