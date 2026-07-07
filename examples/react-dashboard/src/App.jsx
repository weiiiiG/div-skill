import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Sidebar from './components/Sidebar/Sidebar';
import StatCard from './components/StatCard/StatCard';
import DataTable from './components/DataTable/DataTable';

const stats = [
  { label: 'Total Revenue', value: '$54,290', change: '+12.5%', changeUp: true, icon: '↑', iconClass: 'stat-card__icon--revenue' },
  { label: 'Active Users', value: '2,847', change: '+8.2%', changeUp: true, icon: '☺', iconClass: 'stat-card__icon--users' },
  { label: 'New Orders', value: '1,432', change: '+3.1%', changeUp: true, icon: '✓', iconClass: 'stat-card__icon--orders' },
  { label: 'Growth Rate', value: '23.6%', change: '-1.4%', changeUp: false, icon: '↑', iconClass: 'stat-card__icon--growth' },
];

export default function App() {
  return (
    <div className="dashboard">
      <div className="dashboard__layout">
        <div className="dashboard__nav-cell">
          <NavBar />
        </div>
        <div className="dashboard__side-cell">
          <Sidebar />
        </div>
        <main className="dashboard__main">
          <div className="stats-grid">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <DataTable />
        </main>
      </div>
    </div>
  );
}
