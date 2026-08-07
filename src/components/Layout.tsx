import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', maxWidth: 1520, margin: '0 auto', width: '100%' }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
