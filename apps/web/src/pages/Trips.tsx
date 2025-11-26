import { Card, CardHeader, CardBody, Button } from '@travel-agent/ui';

/**
 * Trips page component
 */
export const Trips: React.FC = () => {
  const trips = [
    {
      id: '1',
      name: 'Summer Europe Trip',
      status: 'planning',
      startDate: '2024-06-15',
      endDate: '2024-06-30',
      members: 5,
    },
    {
      id: '2',
      name: 'Business Conference NYC',
      status: 'confirmed',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      members: 3,
    },
    {
      id: '3',
      name: 'Team Retreat Bali',
      status: 'in_progress',
      startDate: '2024-03-01',
      endDate: '2024-03-07',
      members: 8,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'var(--accent-warning)';
      case 'confirmed':
        return 'var(--accent-primary)';
      case 'in_progress':
        return 'var(--accent-success)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Planning';
      case 'confirmed':
        return 'Confirmed';
      case 'in_progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Trips
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your travel plans and itineraries.
          </p>
        </div>
        <Button variant="primary">+ New Trip</Button>
      </div>

      {/* Trips Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}
      >
        {trips.map((trip) => (
          <Card key={trip.id} hoverable>
            <CardHeader
              title={trip.name}
              action={
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    backgroundColor: `${getStatusColor(trip.status)}20`,
                    color: getStatusColor(trip.status),
                  }}
                >
                  {getStatusLabel(trip.status)}
                </span>
              }
            />
            <CardBody>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  <span>📅</span>
                  <span>
                    {trip.startDate} - {trip.endDate}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  <span>👥</span>
                  <span>{trip.members} members</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trips;
