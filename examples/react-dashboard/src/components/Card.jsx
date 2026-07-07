import './Card.scss';

export default function Card({ stat }) {
  const { label, value, change, trend } = stat;
  const isUp = trend === 'up';

  return (
    /* Outer: background/border ONLY */
    <article className="card">
      {/* Inner: flex column + padding + gap */}
      <div className="card__inner">
        <span className="card__label">{label}</span>
        <span className="card__value">{value}</span>
        <span
          className={
            'card__change' +
            (isUp ? ' card__change--up' : ' card__change--down')
          }
        >
          {change}
        </span>
      </div>
    </article>
  );
}
