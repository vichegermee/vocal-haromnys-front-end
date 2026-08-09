import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

export function Layout() {
  useScrollRestoration();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1520, margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>
      <Sidebar />
      <Footer />
    </div>
  );
}
