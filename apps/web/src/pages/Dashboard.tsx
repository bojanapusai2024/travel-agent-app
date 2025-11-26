import { Card, CardHeader, CardBody, Button } from '@travel-agent/ui';

/**
 * Dashboard page component
 */
export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Trips', value: '3', icon: '✈️' },
    { label: 'Total Expenses', value: '$2,450', icon: '💰' },
    { label: 'Team Members', value: '12', icon: '👥' },
    { label: 'Upcoming Events', value: '5', icon: '📅' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.875rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Welcome back! Here&apos;s an overview of your travel activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
                <div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader
          title="Quick Actions"
          subtitle="Start planning your next adventure"
        />
        <CardBody>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Create New Trip</Button>
            <Button variant="secondary">Add Expense</Button>
            <Button variant="outline">Invite Team Member</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
