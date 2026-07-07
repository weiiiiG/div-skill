import styles from './DataTable.module.css';

function StatusBadge({ status }) {
  const cls =
    status === 'Active'
      ? styles.badgeActive
      : status === 'Inactive'
      ? styles.badgeInactive
      : styles.badgePending;
  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}

function DataTable({ columns, rows }) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Recent Users</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} className={styles.th}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>{row.name}</td>
                  <td className={styles.td}>{row.email}</td>
                  <td className={styles.td}>{row.role}</td>
                  <td className={styles.td}><StatusBadge status={row.status} /></td>
                  <td className={styles.td}>{row.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
