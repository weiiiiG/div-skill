import './DataTable.scss';

export default function DataTable({ transactions }) {
  return (
    /* Outer: background/border ONLY */
    <div className="datatable">
      {/* Inner: scroll wrapper */}
      <div className="datatable__inner">
        <table className="datatable__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="datatable__cell--id">{tx.id}</td>
                <td>{tx.customer}</td>
                <td className="datatable__cell--amount">
                  ${tx.amount.toFixed(2)}
                </td>
                <td>
                  <span
                    className={
                      'datatable__status datatable__status--' +
                      tx.status.toLowerCase()
                    }
                  >
                    {tx.status}
                  </span>
                </td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
