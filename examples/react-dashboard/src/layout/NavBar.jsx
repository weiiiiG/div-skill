import './NavBar.scss';

export default function NavBar() {
  return (
    /* Outer: background/border ONLY */
    <header className="navbar">
      {/* Inner: flex row with padding + gap */}
      <div className="navbar__inner">
        <div className="navbar__left">
          <h2 className="navbar__title">Dashboard</h2>
        </div>
        <div className="navbar__right">
          <input type="text" className="navbar__search" placeholder="Search..." />
          <div className="navbar__avatar">JD</div>
        </div>
      </div>
    </header>
  );
}
