-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'teacher', 'staff', 'student', 'parent')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_picture_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Roles mapping
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role_id)
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name VARCHAR(50) UNIQUE NOT NULL,
  section VARCHAR(10),
  total_strength INT,
  class_teacher_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  sr_number VARCHAR(50) UNIQUE NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  blood_group VARCHAR(5),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  class_id UUID REFERENCES classes(id),
  admission_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_sr_number ON students(sr_number);
CREATE INDEX idx_students_class_id ON students(class_id);

-- Parents table
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  relation_type VARCHAR(50),
  occupation VARCHAR(100),
  aadhaar_encrypted VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student-Parent mapping
CREATE TABLE IF NOT EXISTS student_parent_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  relationship VARCHAR(50),
  is_primary BOOLEAN DEFAULT FALSE,
  UNIQUE(student_id, parent_id)
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE,
  date_of_birth DATE,
  qualification VARCHAR(255),
  biometric_id VARCHAR(50),
  assigned_subjects JSON,
  is_class_teacher BOOLEAN DEFAULT FALSE,
  class_teacher_of_id UUID REFERENCES classes(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_name VARCHAR(100) UNIQUE NOT NULL,
  subject_code VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class-Subject mapping
CREATE TABLE IF NOT EXISTS class_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, subject_id)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('Present', 'Absent', 'Leave', 'Half-Day')) DEFAULT 'Absent',
  marked_by_id UUID REFERENCES teachers(id),
  biometric_sync BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, attendance_date)
);

CREATE INDEX idx_attendance_student_date ON attendance(student_id, attendance_date);

-- Timetable
CREATE TABLE IF NOT EXISTS timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  teacher_id UUID REFERENCES teachers(id),
  day_of_week VARCHAR(10),
  start_time TIME,
  end_time TIME,
  room_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments & Homework
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id),
  class_id UUID REFERENCES classes(id),
  teacher_id UUID REFERENCES teachers(id),
  file_url TEXT,
  due_date DATE NOT NULL,
  assignment_type VARCHAR(50) CHECK (assignment_type IN ('homework', 'assignment', 'project')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notices
CREATE TABLE IF NOT EXISTS notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  visibility VARCHAR(50) CHECK (visibility IN ('school_wide', 'class_specific', 'parents_only')),
  class_id UUID REFERENCES classes(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);

-- Fee Structure
CREATE TABLE IF NOT EXISTS fee_structure (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id),
  fee_type VARCHAR(100),
  amount DECIMAL(10, 2),
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee Payments
CREATE TABLE IF NOT EXISTS fee_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  fee_structure_id UUID REFERENCES fee_structure(id),
  amount_due DECIMAL(10, 2),
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  payment_date TIMESTAMP,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) CHECK (payment_status IN ('Pending', 'Partial', 'Paid', 'Overdue')),
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Log
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255),
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSON,
  new_values JSON,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_user_timestamp ON audit_logs(user_id, timestamp);