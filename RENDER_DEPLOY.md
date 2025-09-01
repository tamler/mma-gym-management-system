# 🚀 Deploy to Render - Complete Guide

## 📋 Prerequisites
1. GitHub account with this repository forked
2. Render account (free tier works)
3. Zoho email account for SMTP (or other email provider)

## 🎯 Quick Deploy (Recommended)

### Step 1: Fork & Connect Repository
1. Fork this repository to your GitHub account
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account if not already connected
5. Select your forked `mma-gym-management-system` repository

### Step 2: Configure Build Settings
Render will auto-detect the `render.yaml` file, but verify these settings:

- **Name**: `mma-gym-management-system`
- **Environment**: `Node`
- **Region**: `Ohio` (or your preferred region)
- **Branch**: `main`
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`

### Step 3: Set Environment Variables
In the Render dashboard, go to **Environment** tab and add these variables:

#### 🔐 Required Variables
```bash
NEXTAUTH_SECRET=your-32-character-secret-key-here
NEXTAUTH_URL=https://your-app-name.onrender.com
EMAIL_SERVER_HOST=smtp.zoho.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@yourdomain.com
EMAIL_SERVER_PASSWORD=your-zoho-app-password
EMAIL_FROM=your-email@yourdomain.com
ENCRYPTION_KEY=your-32-character-encryption-key-here
ADMIN_MASTER_PASSWORD=your-very-strong-password
```

#### 🎨 Optional Variables
```bash
GYM_NAME="Your Gym Name"
GYM_TIMEZONE="America/New_York"
CRON_SECRET=your-secure-cron-secret
ADMIN_SECRET=your-admin-testing-secret
```

### Step 4: Deploy!
1. Click **"Create Web Service"**
2. Watch the build logs - first build takes ~2-5 minutes
3. Once deployed, your app will be live at `https://your-app-name.onrender.com`

## 🔧 Manual Configuration (if render.yaml doesn't work)

If auto-detection fails, manually set these in Render dashboard:

### Build & Deploy
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Auto-Deploy**: Yes

### Advanced Settings
- **Health Check Path**: `/`
- **Node Version**: `18`
- **Environment**: `production`

### Persistent Disk
1. Go to **Settings** → **Disks**
2. Click **"Add Disk"**
3. **Name**: `mma-data`
4. **Mount Path**: `/opt/render/project/src/data`
5. **Size**: `1 GB` (free tier limit)

## 📧 Email Setup Guide

### Zoho SMTP (Recommended)
1. Create account at [Zoho Mail](https://www.zoho.com/mail/)
2. Go to **Settings** → **Security** → **App Passwords**
3. Generate password for "Mail App"
4. Use these settings:
   ```
   HOST: smtp.zoho.com
   PORT: 465
   SECURITY: SSL/TLS
   ```

### Gmail SMTP (Alternative)
1. Enable 2FA on your Google account
2. Generate App Password for mail
3. Use these settings:
   ```
   HOST: smtp.gmail.com
   PORT: 587
   SECURITY: STARTTLS
   ```

## 🛠 Troubleshooting Common Issues

### Build Failures

**❌ "npm: command not found"**
- Add environment variable: `NODE_VERSION=18`

**❌ "next: not found"** 
- Build command should be: `npm ci && npm run build`
- Not just: `npm run build`

**❌ "Cannot resolve module"**
- Clear cache: Delete and redeploy service
- Check all dependencies are in `package.json`

### Runtime Issues

**❌ "ENOENT: no such file or directory"**
- Ensure persistent disk is configured correctly
- Mount path: `/opt/render/project/src/data`
- Size: At least 1GB

**❌ "Encryption key must be 32 characters"**
- Generate proper key: `openssl rand -hex 32`
- Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**❌ "Health check failed"**
- App might be crashing on startup
- Check logs in Render dashboard
- Verify all environment variables are set

### Email Issues

**❌ "Authentication failed"**
- Use App Password, not regular password
- Enable "Less secure apps" if using Gmail
- Check SMTP credentials are correct

**❌ "Connection timeout"**
- Try port 587 instead of 465
- Check if hosting provider blocks SMTP ports

## ⚡ Performance Optimization

### Free Tier Optimization
```bash
# Add these environment variables for better performance
NODE_ENV=production
NODE_OPTIONS="--max-old-space-size=512"
NPM_CONFIG_PRODUCTION=true
```

### Monitoring
- Render provides automatic monitoring
- Check **Metrics** tab for performance data
- Set up **Alerts** for downtime notifications

## 🔄 Updates & Maintenance

### Auto-Deploy
- Enabled by default with render.yaml
- Every push to `main` branch triggers redeploy
- Build time: ~2-3 minutes

### Manual Deploy
1. Go to Render dashboard
2. Click **"Deploy latest commit"**
3. Or trigger from **Settings** → **Deploy**

### Backup Strategy
Since using persistent disk:
1. Files in `/data` survive deployments
2. Consider periodic backups
3. Download via shell access (paid plans)

## 💰 Cost Estimate

### Free Tier
- **Web Service**: $0/month (with sleep after inactivity)
- **Bandwidth**: 100GB/month free
- **Storage**: 1GB persistent disk free
- **Limitations**: Sleeps after 15min inactivity

### Paid Plans
- **Starter**: $7/month (no sleep)
- **Standard**: $25/month (more resources)
- **Pro**: $85/month (dedicated resources)

## 🎯 Post-Deployment Checklist

### ✅ Test Basic Functionality
- [ ] Website loads at your Render URL
- [ ] Sign-in page accessible
- [ ] Email magic links working
- [ ] Admin emergency access works

### ✅ Create First Admin
```bash
# If you have shell access (paid plan):
npm run create-admin

# Otherwise use emergency admin:
# Visit: https://your-app.onrender.com/admin/emergency-login
# Use your ADMIN_MASTER_PASSWORD
```

### ✅ Configure Notifications
1. Sign in as admin
2. Go to **Admin Settings** → **Site Settings**  
3. Set notification webhook URL
4. Test notification processing

### ✅ Set Up Monitoring
- Enable Render health checks
- Set up uptime monitoring (UptimeRobot, etc.)
- Configure email alerts

---

## 🆘 Need Help?

**Render Issues**: Check [Render Documentation](https://render.com/docs)
**App Issues**: Open issue on [GitHub](https://github.com/tamler/mma-gym-management-system/issues)
**Email Setup**: Check your email provider's SMTP documentation

**Quick Support Checklist**:
1. Check Render build logs
2. Verify all environment variables are set  
3. Confirm persistent disk is mounted
4. Test email credentials separately
5. Check health check endpoint returns 200

Your MMA gym management system should now be live on Render! 🥊