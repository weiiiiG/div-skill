import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar/Sidebar';
import StatCard from './components/StatCard/StatCard';
import DataTable from './components/DataTable/DataTable';
import styles from './App.module.css';

const stats = [
  { label: 'Total Users', value: '24,560', change: '+12.5%', positive: true },
  { label: 'Active Sessions', value: '1,423', change: '+8.2%', positive: true },
  { label: 'Revenue', value: '$48,290', change: '-3.1%', positive: false },
  { label: 'Bounce Rate', value: '32.1%', change: '-2.4%', positive: true },
];

const columns = ['Name', 'Email', 'Role', 'Status', 'Last Active'];
const rows = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', lastActive: '15 min ago' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', lastActive: '3 days ago' },
  { name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active', lastActive: '1 hour ago' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Pending', lastActive: 'Just now' },
];

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.rootInner}>
        <NavBar />
        <div className={styles.mainOuter}>
          <div className={styles.mainInner}>
            <Sidebar />
            <div className={styles.contentOuter}>
              <div className={styles.contentInner}>
                <div className={styles.statsOuter}>
                  <div className={styles.statsInner}>
                    {stats.map((s) => (
                      <StatCard key={s.label} {...s} />
                    ))}
                  </div>
                </div>
                <DataTable columns={columns} rows={rows} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
