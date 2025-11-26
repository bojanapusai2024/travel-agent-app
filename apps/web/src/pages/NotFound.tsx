import { Link } from 'react-router-dom';

import { Button } from '@travel-agent/ui';

/**
 * 404 Not Found page component
 */
export const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          marginBottom: '1rem',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          maxWidth: '400px',
        }}
      >
        The page you are looking for might have been removed, had its name changed, or
        is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
