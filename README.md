# 🥊 Elite MMA Training - Gym Management Platform

A complete MMA gym website and management platform built with Next.js 15, featuring automated notifications, member progress tracking, and comprehensive admin tools.

![MMA Gym Management](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v5-green)

## ✨ Features

### 🌐 Public Website
- **Modern Landing Page** - Professional gym website with responsive design
- **Class Schedules** - Interactive calendar with class availability
- **Trainer Profiles** - Individual pages for each coach with specialties
- **Contact & Location** - Integrated contact forms and gym information

### 👥 Member Portal
- **Magic Link Authentication** - Passwordless login via email (NextAuth.js v5)
- **Personal Dashboard** - Member progress tracking and class history
- **Class Booking** - Real-time booking system with waitlist management
- **QR Code Check-in** - Mobile-friendly attendance tracking
- **Progress Tracking** - Attendance streaks, achievements, and milestones

### 🎯 Admin Dashboard
- **User Management** - Complete member and trainer administration
- **Class Management** - Create, edit, and manage class schedules
- **Booking System** - Handle reservations, waitlists, and cancellations
- **Notification Center** - Automated email reminders and notifications
- **Analytics Dashboard** - Member engagement and attendance insights
- **Emergency Access** - Master password system for critical situations

### 📱 Trainer Tools
- **Check-in Interface** - QR code scanning and manual attendance
- **Class Roster** - Real-time class participant management
- **Member Progress** - Track individual student development
- **Class Analytics** - Attendance rates and member engagement

## 🛠 Technology Stack

| Component | Technology |
|-----------|------------|
| **Framework** | Next.js 15 with App Router |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn/ui |
| **Authentication** | NextAuth.js v5 |
| **Email** | Zoho SMTP |
| **Storage** | File-based JSON with AES-256 encryption |
| **Deployment** | Vercel, Railway, Netlify ready |

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/tamler/mma-gym-management-system.git
cd mma-gym-management-system
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env.local` and configure:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=http://localhost:3000

# Email Configuration (Zoho SMTP)
EMAIL_SERVER_HOST=smtp.zoho.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@zoho.com
EMAIL_SERVER_PASSWORD=your-zoho-password
EMAIL_FROM=your-email@zoho.com

# Data Encryption (exactly 32 characters)
ENCRYPTION_KEY=your-32-character-encryption-key

# Emergency Admin Access
ADMIN_MASTER_PASSWORD=your-strong-master-password
```

### 3. Development
```bash
npm run dev
```
Visit `http://localhost:3000` for development with hot reloading.

### 4. Production Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```
Visit `http://localhost:3000` for the optimized production build.

## 👨‍💼 Admin Access

### Method 1: CLI Admin Creation
```bash
npm run create-admin
```
Follow prompts to create an admin account, then sign in with email magic link.

### Method 2: Emergency Access
1. Visit `/admin/emergency-login`
2. Use your master password
3. Access expires in 24 hours (all actions logged)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Student dashboard
│   ├── admin/             # Admin management
│   ├── trainer/           # Trainer interface
│   └── api/               # API routes
├── components/ui/         # Reusable UI components
├── lib/
│   ├── data/             # File storage & data access
│   ├── notifications.ts  # Email notification system
│   ├── member-progress.ts # Progress tracking
│   ├── encryption.ts     # AES-256 encryption
│   └── types.ts          # TypeScript definitions
└── middleware.ts         # Route protection

data/                     # Auto-created file storage
├── users/               # Member accounts (encrypted)
├── sessions/            # Auth sessions (encrypted)
├── classes/             # Class schedules
├── bookings/            # Reservations & waitlists
├── progress/            # Member progress data
└── settings/            # Gym configuration
```

## 🔐 Security Features

- **AES-256 Encryption** - All sensitive data encrypted at rest
- **Magic Link Auth** - Passwordless authentication system
- **Role-Based Access** - Student/Trainer/Admin permissions
- **Emergency Access** - Secure master password system
- **Audit Logging** - All admin actions logged with timestamps
- **Rate Limiting** - Brute force attack protection
- **CSRF Protection** - Security headers and token validation

## 📊 Key Features Deep Dive

### 🔔 Automated Notifications
- **Class Reminders** - 24h and 2h before class emails
- **Waitlist Promotions** - Automatic spot availability notifications
- **Streak Celebrations** - Milestone achievement emails
- **Admin Configurable** - All settings manageable via UI

### 📈 Member Progress Tracking
- **Attendance Streaks** - Track consecutive class attendance
- **Achievement System** - Bronze, silver, gold milestones
- **Progress Dashboard** - Visual progress tracking
- **QR Code Integration** - Automatic progress updates on check-in

### 💼 Admin Management
- **User Administration** - Create, edit, delete member accounts
- **Class Scheduling** - Dynamic class creation and management
- **Booking Oversight** - Handle reservations and cancellations
- **System Analytics** - Member engagement insights
- **Notification Settings** - Configure automated communications

## 🌐 Deployment Options

The system supports multiple deployment platforms:

| Platform | Cost | Complexity | Features |
|----------|------|------------|----------|
| **Vercel** | Free tier | ⭐ Easy | Automatic HTTPS, CDN, Serverless |
| **Railway** | $5/month | ⭐ Easy | Persistent storage, cron jobs |
| **Netlify** | Free tier | ⭐⭐ Medium | Edge functions, forms |
| **AWS** | Pay-per-use | ⭐⭐⭐ Complex | Enterprise-grade, unlimited scaling |

### Quick Deploy to Vercel
1. Fork this repository
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Manual Production Deployment
1. **Build the application**: `npm run build`
2. **Upload build files**: Copy `.next` folder and `data` directory
3. **Set environment variables** on hosting platform
4. **Start production server**: `npm start`
5. **Ensure Node.js 18+** runtime environment

## 📧 Email Setup (Zoho)

1. Create Zoho email account
2. Go to Account Settings → Security → App Passwords
3. Generate SMTP app password
4. Configure environment variables:
   - **Host**: `smtp.zoho.com`
   - **Port**: `465` (SSL)
   - **Security**: SSL/TLS

## 🛠 Development Commands

```bash
npm run dev          # Development server with hot reloading (Turbopack)
npm run build        # Create optimized production build
npm run start        # Start production server (requires build first)
npm run lint         # ESLint code checking
npm run create-admin # CLI admin account creation
```

## 🏗 Architecture Highlights

- **File-Based Storage** - No database required, simple deployment
- **Encryption Layer** - AES-256 for all sensitive data
- **Modular Design** - Easy to extend and customize
- **Type Safety** - Full TypeScript coverage
- **Modern Stack** - Latest Next.js 15 features
- **Mobile-First** - Responsive design for all devices
- **Production Optimized** - Static generation and server-side rendering

## 🚀 Performance Features

- **Turbopack** - Ultra-fast development builds
- **Static Generation** - Pre-rendered pages for optimal performance
- **Image Optimization** - Automatic image compression and formats
- **Code Splitting** - Automatic bundle optimization
- **Edge Runtime** - Deploy to edge locations globally

## 🤝 Contributing

This project was built with [Claude Code](https://claude.ai/code). To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with `npm run build`
5. Submit a pull request

## 📄 License

© 2024 Elite MMA Training Management System. Built with Claude Code.

---

**Ready to deploy?** Check out the [deployment documentation](./DEPLOYMENT_OPTIONS.md) for detailed platform-specific instructions.

**Need help?** Open an issue or check the documentation in the `/docs` folder.