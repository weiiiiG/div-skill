import { useState } from 'react';
import './Sidebar.scss';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '\u{1F4CA}' },
  { id: 'analytics', label: 'Analytics', icon: '\u{1F4C8}' },
  { id: 'users', label: 'Users', icon: '\u{1F465}' },
  { id: 'orders', label: 'Orders', icon: '\u{1F4E6}' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const [active, setActive] = useState('dashboard');

  return (
    /* Outer: background/border ONLY */
    <aside className="sidebar">
      {/* Inner: flex column */}
      <div className="sidebar__inner">
        <div className="sidebar__brand">
          <span className="sidebar__logo">DS</span>
          <span className="sidebar__brandName">DashStack</span>
        </div>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={
                'sidebar__item' +
                (active === item.id ? ' sidebar__item--active' : '')
              }
              onClick={() => setActive(item.id)}
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
