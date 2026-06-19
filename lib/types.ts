/**
 * User role types
 */
export type UserRole = 'admin' | 'teacher' | 'staff' | 'student' | 'parent';

/**
 * Base user interface
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  profilePictureUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Student interface
 */
export interface Student extends User {
  srNumber: string;
  dateOfBirth: Date;
  gender: 'M' | 'F' | 'Other';
  bloodGroup?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  classId: string;
  admissionDate: Date;
}

/**
 * Teacher interface
 */
export interface Teacher extends User {
  employeeId: string;
  dateOfBirth: Date;
  qualification: string;
  biometricId?: string;
  assignedSubjects: string[];
  isClassTeacher: boolean;
  classTeacherId?: string;
}

/**
 * Parent interface
 */
export interface Parent extends User {
  relationshipType: 'Father' | 'Mother' | 'Guardian';
  occupation?: string;
  aadhaarEncrypted: string;
  childrenIds: string[];
}

/**
 * Permission interface
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
}

/**
 * Role interface
 */
export interface Role {
  id: string;
  roleName: UserRole;
  description: string;
  permissions: Permission[];
}

/**
 * Class interface
 */
export interface Class {
  id: string;
  className: string;
  section: string;
  totalStrength: number;
  classTeacherId?: string;
  createdAt: Date;
}

/**
 * Subject interface
 */
export interface Subject {
  id: string;
  subjectName: string;
  subjectCode: string;
  description?: string;
}

/**
 * Attendance interface
 */
export interface Attendance {
  id: string;
  studentId: string;
  attendanceDate: Date;
  status: 'Present' | 'Absent' | 'Leave' | 'Half-Day';
  markedById?: string;
  biometricSync: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Assignment interface
 */
export interface Assignment {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  fileUrl?: string;
  dueDate: Date;
  assignmentType: 'homework' | 'assignment' | 'project';
  createdAt: Date;
}

/**
 * Notice interface
 */
export interface Notice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  visibility: 'school_wide' | 'class_specific' | 'parents_only';
  classId?: string;
  createdAt: Date;
  expiresAt?: Date;
}

/**
 * Fee structure interface
 */
export interface FeeStructure {
  id: string;
  classId: string;
  feeType: string;
  amount: number;
  dueDate: Date;
  createdAt: Date;
}

/**
 * Fee payment interface
 */
export interface FeePayment {
  id: string;
  studentId: string;
  feeStructureId: string;
  amountDue: number;
  amountPaid: number;
  paymentDate?: Date;
  paymentMethod?: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Overdue';
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  statusCode: number;
}

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}