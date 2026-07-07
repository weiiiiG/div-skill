import { BrowserRouter } from 'react-router-dom';
import AppShell from './layout/AppShell';
import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      {/* Outer: background/border ONLY — no display:flex/grid, no padding/gap */}
      <div className="app-root">
        <AppShell />
      </div>
    </BrowserRouter>
  );
}
