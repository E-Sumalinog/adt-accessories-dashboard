-- =========================================
-- CUSTOMERS TABLE
-- =========================================
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  address TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'vip')),
  join_date DATE DEFAULT CURRENT_DATE,
  last_order_date DATE,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- INDEXES
-- =========================================
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);

-- =========================================
-- SAMPLE DATA (OPTIONAL)
-- =========================================
INSERT INTO customers (name, email, phone, address, status, join_date, last_order_date, total_orders, total_spent)
VALUES 
  ('John Smith', 'john.smith@email.com', '+1 (555) 123-4567', '123 Main St, New York, NY 10001', 'vip', '2023-01-15', '2024-01-18', 12, 3450.00),
  ('Sarah Johnson', 'sarah.j@email.com', '+1 (555) 234-5678', '456 Oak Ave, Los Angeles, CA 90001', 'active', '2023-03-22', '2024-01-16', 8, 1890.50),
  ('Mike Wilson', 'mike.w@email.com', '+1 (555) 345-6789', '789 Pine Rd, Chicago, IL 60601', 'active', '2023-06-10', '2024-01-17', 5, 920.75),
  ('Emily Davis', 'emily.d@email.com', '+1 (555) 456-7890', '321 Elm St, Houston, TX 77001', 'vip', '2022-11-05', '2024-01-18', 15, 5230.00),
  ('Robert Brown', 'robert.b@email.com', '+1 (555) 567-8901', '654 Maple Dr, Phoenix, AZ 85001', 'inactive', '2023-09-18', '2024-01-14', 3, 325.00)
ON CONFLICT (email) DO NOTHING;
