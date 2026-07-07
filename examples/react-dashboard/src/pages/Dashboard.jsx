import useDashboardStore from '../stores/useDashboardStore';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import './Dashboard.scss';

export default function Dashboard() {
  const { stats, transactions } = useDashboardStore();

  return (
    /* Outer: just fills space, no layout props */
    <div className="dashboard">
      {/* Inner: flex column with gap */}
      <div className="dashboard__inner">
        <h1 className="dashboard__heading">Overview</h1>
        {/* Inner: grid for stat cards */}
        <div className="dashboard__cards">
          {stats.map((stat) => (
            <Card key={stat.id} stat={stat} />
          ))}
        </div>
        {/* Inner for table section */}
        <div className="dashboard__tableSection">
          <h2 className="dashboard__subheading">Recent Transactions</h2>
          <DataTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
