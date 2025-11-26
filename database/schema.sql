-- Travel Agent Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(200),
    avatar_url TEXT,
    phone_number VARCHAR(20),
    auth_provider VARCHAR(20) NOT NULL DEFAULT 'email',
    auth_provider_id VARCHAR(255),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_provider ON users(auth_provider);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    device_id VARCHAR(255),
    device_name VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);

-- User preferences
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    currency VARCHAR(3) DEFAULT 'USD',
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    theme VARCHAR(10) DEFAULT 'system',
    notification_email BOOLEAN DEFAULT TRUE,
    notification_push BOOLEAN DEFAULT TRUE,
    notification_trip_reminders BOOLEAN DEFAULT TRUE,
    notification_expense_updates BOOLEAN DEFAULT TRUE,
    notification_payment_reminders BOOLEAN DEFAULT TRUE,
    notification_location_sharing BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SUBSCRIPTIONS
-- =====================================================

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier VARCHAR(20) NOT NULL DEFAULT 'free',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    razorpay_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- =====================================================
-- TRIPS
-- =====================================================

CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'planning',
    is_archived BOOLEAN DEFAULT FALSE,
    created_by_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_trips_created_by ON trips(created_by_id);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_dates ON trips(start_date, end_date);

-- Trip members
CREATE TABLE trip_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(trip_id, user_id)
);

CREATE INDEX idx_trip_members_trip ON trip_members(trip_id);
CREATE INDEX idx_trip_members_user ON trip_members(user_id);

-- Departments (teams within a trip)
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#1f6feb',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_trip ON departments(trip_id);

-- Team members within departments
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_lead BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(department_id, user_id)
);

CREATE INDEX idx_team_members_department ON team_members(department_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);

-- =====================================================
-- LOCATIONS & TRAVEL
-- =====================================================

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    place_id VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    type VARCHAR(20) NOT NULL DEFAULT 'destination',
    arrival_date TIMESTAMP WITH TIME ZONE,
    departure_date TIMESTAMP WITH TIME ZONE,
    location_order INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_locations_trip ON locations(trip_id);
CREATE INDEX idx_locations_type ON locations(type);
CREATE INDEX idx_locations_order ON locations(trip_id, location_order);

-- Travel segments (flights, trains, etc.)
CREATE TABLE travel_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    departure_location_id UUID REFERENCES locations(id),
    arrival_location_id UUID REFERENCES locations(id),
    departure_time TIMESTAMP WITH TIME ZONE,
    arrival_time TIMESTAMP WITH TIME ZONE,
    carrier VARCHAR(255),
    booking_reference VARCHAR(100),
    cost DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_travel_segments_trip ON travel_segments(trip_id);
CREATE INDEX idx_travel_segments_type ON travel_segments(type);

-- Accommodations
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id),
    type VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    check_in TIMESTAMP WITH TIME ZONE,
    check_out TIMESTAMP WITH TIME ZONE,
    booking_reference VARCHAR(100),
    cost DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_accommodations_trip ON accommodations(trip_id);
CREATE INDEX idx_accommodations_location ON accommodations(location_id);

-- =====================================================
-- BUDGET & EXPENSES
-- =====================================================

CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE UNIQUE,
    total_budget DECIMAL(12, 2) DEFAULT 0,
    spent_amount DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'under_budget',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_budgets_trip ON budgets(trip_id);

-- Category budgets
CREATE TABLE category_budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    allocated_amount DECIMAL(12, 2) DEFAULT 0,
    spent_amount DECIMAL(12, 2) DEFAULT 0,
    UNIQUE(budget_id, category)
);

CREATE INDEX idx_category_budgets_budget ON category_budgets(budget_id);

-- Expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    paid_by_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    receipt_url TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    expense_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_expenses_trip ON expenses(trip_id);
CREATE INDEX idx_expenses_paid_by ON expenses(paid_by_id);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_status ON expenses(status);

-- Expense splits
CREATE TABLE expense_splits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_id UUID NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(12, 2) NOT NULL,
    percentage DECIMAL(5, 2),
    split_type VARCHAR(20) NOT NULL DEFAULT 'equal',
    is_paid BOOLEAN DEFAULT FALSE,
    UNIQUE(expense_id, user_id)
);

CREATE INDEX idx_expense_splits_expense ON expense_splits(expense_id);
CREATE INDEX idx_expense_splits_user ON expense_splits(user_id);

-- Repayments
CREATE TABLE repayments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    from_user_id UUID NOT NULL REFERENCES users(id),
    to_user_id UUID NOT NULL REFERENCES users(id),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(20),
    transaction_id VARCHAR(255),
    notes TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_repayments_trip ON repayments(trip_id);
CREATE INDEX idx_repayments_from ON repayments(from_user_id);
CREATE INDEX idx_repayments_to ON repayments(to_user_id);
CREATE INDEX idx_repayments_status ON repayments(status);

-- =====================================================
-- LOCATION TRACKING
-- =====================================================

CREATE TABLE location_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(8, 2),
    altitude DECIMAL(8, 2),
    speed DECIMAL(8, 2),
    heading DECIMAL(5, 2),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_location_updates_user ON location_updates(user_id);
CREATE INDEX idx_location_updates_trip ON location_updates(trip_id);
CREATE INDEX idx_location_updates_timestamp ON location_updates(timestamp);

-- Location sharing settings
CREATE TABLE location_sharing_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'stopped',
    share_with_department BOOLEAN DEFAULT FALSE,
    share_with_trip BOOLEAN DEFAULT FALSE,
    update_interval INTEGER DEFAULT 300000,
    battery_optimization BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, trip_id)
);

CREATE INDEX idx_location_sharing_user ON location_sharing_settings(user_id);
CREATE INDEX idx_location_sharing_trip ON location_sharing_settings(trip_id);

-- =====================================================
-- LUGGAGE
-- =====================================================

CREATE TABLE luggage_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER DEFAULT 1,
    status VARCHAR(20) DEFAULT 'unpacked',
    is_essential BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_luggage_items_user ON luggage_items(user_id);
CREATE INDEX idx_luggage_items_trip ON luggage_items(trip_id);
CREATE INDEX idx_luggage_items_status ON luggage_items(status);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Update updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON trips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travel_segments_updated_at BEFORE UPDATE ON travel_segments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON accommodations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at BEFORE UPDATE ON expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_repayments_updated_at BEFORE UPDATE ON repayments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_luggage_items_updated_at BEFORE UPDATE ON luggage_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_sharing_settings_updated_at BEFORE UPDATE ON location_sharing_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
