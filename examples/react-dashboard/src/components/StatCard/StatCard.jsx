import './StatCard.scss';

export default function StatCard({ label, value, change, changeUp, icon, iconClass }) {
  return (
    <div className="stat-card">
      <div className="stat-card__inner">
        <div className="stat-card__top">
          <div className="stat-card__info">
            <div className="stat-card__label">{label}</div>
            <div className="stat-card__value">{value}</div>
          </div>
          <div className={`stat-card__icon ${iconClass}`}>{icon}</div>
        </div>
        <div className={`stat-card__change ${changeUp ? 'stat-card__change--up' : 'stat-card__change--down'}`}>
          {change}
        </div>
      </div>
    </div>
  );
}
