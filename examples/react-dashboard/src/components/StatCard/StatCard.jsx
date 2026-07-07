import styles from './StatCard.module.css';

function StatCard({ label, value, change, positive }) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        <span className={`${styles.change} ${positive ? styles.positive : styles.negative}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

export default StatCard;
