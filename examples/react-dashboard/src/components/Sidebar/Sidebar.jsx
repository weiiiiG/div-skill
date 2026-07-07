import './Sidebar.scss';

const menuItems = [
  { icon: '⌂', label: 'Overview', active: true },
  { icon: '□', label: 'Analytics' },
  { icon: '☰', label: 'Orders' },
  { icon: '★', label: 'Customers' },
];

const secondaryItems = [
  { icon: '⚙', label: 'Settings' },
  { icon: '❓', label: 'Help' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__section-title">Main Menu</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar__item${item.active ? ' sidebar__item--active' : ''}`}
          >
            <span className="sidebar__item-icon">{item.icon}</span>
            <span className="sidebar__item-label">{item.label}</span>
          </div>
        ))}
        <div className="sidebar__divider" />
        {secondaryItems.map((item) => (
          <div key={item.label} className="sidebar__item">
            <span className="sidebar__item-icon">{item.icon}</span>
            <span className="sidebar__item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
