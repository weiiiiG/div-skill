import './DataTable.scss';

const data = [
  { name: 'Alice Johnson', email: 'alice@example.com', amount: '$320.00', status: 'Completed' },
  { name: 'Bob Smith', email: 'bob@example.com', amount: '$150.00', status: 'Pending' },
  { name: 'Carol White', email: 'carol@example.com', amount: '$480.00', status: 'Completed' },
  { name: 'Dan Brown', email: 'dan@example.com', amount: '$210.00', status: 'Cancelled' },
  { name: 'Eve Davis', email: 'eve@example.com', amount: '$645.00', status: 'Completed' },
  { name: 'Frank Miller', email: 'frank@example.com', amount: '$95.00', status: 'Pending' },
];

export default function DataTable() {
  return (
    <div className="data-table">
      <div className="data-table__inner">
        <div className="data-table__header">
          <h3>Recent Orders</h3>
          <span className="data-table__view-all">View All</span>
        </div>
        <div className="data-table__scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.email}>
                  <td>{row.name}</td>
                  <td className="data-table__email">{row.email}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`data-table__status data-table__status--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
