import styles from './NavBar.module.css';

const avatarUrl = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#3b82f6"/><text x="16" y="21" text-anchor="middle" fill="white" font-size="14" font-family="Arial" font-weight="bold">A</text></svg>'
);

function NavBar() {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#3b82f6" />
            <path d="M8 20V10L14 16L20 10V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={styles.title}>DivSkill</span>
        </div>
        <div className={styles.avatarOuter}>
          <img className={styles.avatar} src={avatarUrl} alt="User avatar" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
