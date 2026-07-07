import { useRoutes } from 'react-router-dom';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import routes from '../routes';
import './AppShell.scss';

export default function AppShell() {
  const element = useRoutes(routes);

  return (
    /* Outer: background/border ONLY */
    <div className="shell">
      {/* Inner: flex row, full height */}
      <div className="shell__inner">
        <Sidebar />
        {/* Inner: flex column for navbar + content */}
        <div className="shell__main">
          <NavBar />
          {/* Child: overflow:auto, no margin */}
          <main className="shell__content">
            {element}
          </main>
        </div>
      </div>
    </div>
  );
}
