import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * Main layout component with navigation
 */
export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/trips', label: 'Trips', icon: '✈️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            ✈️ Travel Agent
          </h1>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    color:
                      location.pathname === item.path
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                    backgroundColor:
                      location.pathname === item.path
                        ? 'rgba(31, 111, 235, 0.1)'
                        : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          v1.0.0
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
