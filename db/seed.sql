-- Insert default roles
INSERT INTO roles (role_name, description, permissions) VALUES
('admin', 'Administrator with full access', '["manage_users", "manage_admissions", "manage_finances", "view_reports", "manage_timetable", "manage_attendance"]'),
('teacher', 'Teacher with classroom management', '["view_class", "mark_attendance", "upload_assignments", "post_notices", "view_timetable"]'),
('staff', 'Staff member with limited access', '["view_dashboard", "manage_general_data"]'),
('student', 'Student with limited access', '["view_attendance", "view_homework", "view_notices", "view_fees"]'),
('parent', 'Parent with limited access', '["view_child_attendance", "view_child_homework", "view_child_fees", "view_notices"]')
ON CONFLICT (role_name) DO NOTHING;

-- Insert default subjects
INSERT INTO subjects (subject_name, subject_code, description) VALUES
('English', 'EN', 'English Language and Literature'),
('Mathematics', 'MA', 'Mathematics'),
('Science', 'SC', 'Science'),
('Social Studies', 'SS', 'Social Studies'),
('Computer Science', 'CS', 'Computer Science'),
('Physical Education', 'PE', 'Physical Education'),
('Art', 'AR', 'Art and Drawing'),
('Music', 'MU', 'Music')
ON CONFLICT (subject_name) DO NOTHING;

-- Insert sample classes
INSERT INTO classes (class_name, section, total_strength) VALUES
('10', 'A', 40),
('10', 'B', 38),
('12', 'A', 35),
('12', 'B', 36)
ON CONFLICT (class_name) DO NOTHING;
