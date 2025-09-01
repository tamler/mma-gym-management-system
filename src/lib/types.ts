export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'student' | 'trainer' | 'coach' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  // Coach profile fields
  bio?: string;
  philosophy?: string;
  specialties?: string[];
  experience?: string;
  certifications?: string[];
  profileImage?: string;
  phone?: string;
}

export interface Student extends User {
  role: 'student';
  belt?: string;
  rank?: number;
  joinDate: Date;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalInfo?: {
    allergies?: string;
    medications?: string;
    conditions?: string;
  };
}

export interface Trainer extends User {
  role: 'trainer';
  specializations: string[];
  bio?: string;
  certifications: string[];
  experience?: string;
}

export interface Coach extends User {
  role: 'coach';
  specializations: string[];
  bio?: string;
  certifications: string[];
  experience?: string;
  profile?: {
    specialties?: string[];
    experience?: string;
  };
}

export interface GymClass {
  id: string;
  name: string;
  description: string;
  type: 'technique' | 'sparring' | 'conditioning' | 'competition';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  trainerId: string;
  schedule: {
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:MM format
    endTime: string;
  }[];
  capacity: number;
  duration: number; // in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassBooking {
  id: string;
  classId: string;
  userId: string;
  date: Date;
  status: 'booked' | 'attended' | 'missed' | 'cancelled';
  bookedAt: Date;
}

export interface WaitlistEntry {
  id: string;
  classId: string;
  userId: string;
  date: Date;
  status: 'waiting' | 'promoted' | 'cancelled';
  addedAt: Date;
  position?: number;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  checkedInAt?: Date;
  notes?: string;
}

export interface ProgressRecord {
  id: string;
  userId: string;
  type: 'belt_promotion' | 'skill_assessment' | 'goal_achievement';
  title: string;
  description?: string;
  date: Date;
  trainerId: string;
  data: {
    previousBelt?: string;
    newBelt?: string;
    skillsAssessed?: string[];
    rating?: number; // 1-10
    notes?: string;
  };
}

export interface GymSettings {
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: {
    [key: string]: { open: string; close: string } | null; // null for closed days
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  settings: {
    allowOnlineBooking: boolean;
    bookingAdvanceDays: number;
    cancellationHours: number;
    waitlistEnabled: boolean;
  };
}

export interface Session {
  id: string;
  userId: string;
  email: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface Notification {
  id: string
  type: 'class_cancelled' | 'class_rescheduled' | 'system_alert' | 'general'
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  updatedAt?: string
  createdBy: string
  targetAudience: 'all' | 'students' | 'trainers' | 'admins'
  metadata?: {
    classId?: string
    className?: string
    originalDateTime?: string
    newDateTime?: string
    instructor?: string
    affectedUsers?: string[]
    emailSent?: boolean
    displayOnHomepage?: boolean
    displayUntil?: string
  }
  status: 'active' | 'dismissed' | 'expired'
  readBy?: string[] // User IDs who have read this notification
}

export interface ClassCancellation {
  id: string
  classId: string
  className: string
  instructor: string
  originalDateTime: string
  reason: string
  cancellationType: 'single_session' | 'entire_class' | 'temporary_suspension'
  notificationId: string
  createdAt: string
  createdBy: string
  affectedSessions?: {
    date: string
    time: string
    endTime: string
  }[]
  emailsSent: boolean
  alternativeOptions?: string
}

// Notification scheduling types
export interface NotificationSchedule {
  id: string
  userId: string
  type: 'class_reminder_24h' | 'class_reminder_2h' | 'waitlist_promotion' | 'streak_celebration'
  scheduledFor: Date
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  data: {
    bookingId?: string
    classId?: string
    className?: string
    classDate?: Date
    reminderType?: '24h' | '2h'
    streakCount?: number
    achievementLevel?: 'bronze' | 'silver' | 'gold'
  }
  createdAt: Date
  processedAt?: Date
  error?: string
}

// Member progress tracking types
export interface MemberProgress {
  id: string
  userId: string
  totalClasses: number
  currentStreak: number
  longestStreak: number
  lastClassDate?: Date
  achievements: Achievement[]
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  type: 'attendance_streak' | 'total_classes' | 'consistency' | 'improvement'
  level: 'bronze' | 'silver' | 'gold'
  title: string
  description: string
  achievedAt: Date
  data: {
    streakCount?: number
    totalClasses?: number
    consistencyRate?: number
  }
}