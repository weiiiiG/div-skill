import './NavBar.scss';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">DivSkill</div>
        <ul className="navbar__links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
        <div className="navbar__user">
          <span>Jane Doe</span>
          <div className="navbar__avatar">JD</div>
        </div>
      </div>
    </nav>
  );
}
