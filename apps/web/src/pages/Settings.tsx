import { Card, CardHeader, CardBody, Button, Input } from '@travel-agent/ui';

/**
 * Settings page component
 */
export const Settings: React.FC = () => {
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
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your account and preferences.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '600px',
        }}
      >
        {/* Profile Settings */}
        <Card>
          <CardHeader
            title="Profile"
            subtitle="Update your personal information"
          />
          <CardBody>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <Input
                  label="First Name"
                  placeholder="John"
                  defaultValue="John"
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  defaultValue="Doe"
                />
              </div>
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                defaultValue="john@example.com"
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="+1 234 567 8900"
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '0.5rem',
                }}
              >
                <Button variant="primary">Save Changes</Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader
            title="Preferences"
            subtitle="Customize your experience"
          />
          <CardBody>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Dark Mode
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Use dark theme across the application
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Toggle
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Email Notifications
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Receive email updates about your trips
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    Currency
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Set your default currency
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  USD ($)
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Danger Zone */}
        <Card>
          <CardHeader
            title="Danger Zone"
            subtitle="Irreversible actions"
          />
          <CardBody>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: 500,
                    color: 'var(--accent-danger)',
                  }}
                >
                  Delete Account
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="danger">Delete</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
