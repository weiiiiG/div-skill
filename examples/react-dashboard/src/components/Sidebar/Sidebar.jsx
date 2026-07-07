import styles from './Sidebar.module.css';

const links = [
  { label: 'Dashboard', icon: '#home-icon', active: true },
  { label: 'Analytics', icon: '#chart-icon' },
  { label: 'Users', icon: '#users-icon' },
  { label: 'Settings', icon: '#gear-icon' },
];

function Sidebar() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          {links.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`${styles.link} ${link.active ? styles.linkActive : ''}`}
            >
              <span className={styles.linkText}>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
