# 🚀 Deployment Guide

This MMA Gym Management System can be deployed to multiple platforms. Here are detailed instructions for each:

## 🌟 Recommended: Vercel

### Automatic Deployment
1. Fork this repository
2. Connect to [Vercel](https://vercel.com)
3. Import your forked repository
4. Set environment variables (see below)
5. Deploy!

### Manual Deployment
```bash
npm install -g vercel
npm run build
vercel
```

## 🚂 Railway

### One-Click Deploy
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template)

### Manual Deploy
```bash
npm install -g @railway/cli
railway login
railway add
railway deploy
```

## 🎯 Render

### Automatic Deployment
1. Connect your GitHub repository to [Render](https://render.com)
2. Create a new Web Service
3. Use these settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18.18.0
4. Set environment variables
5. Deploy!

### Using render.yaml
Included `render.yaml` file will automatically configure:
- Build and start commands
- Node.js version
- Health check endpoint
- Persistent disk for data

## 🌊 Netlify

### Automatic Deployment
1. Connect repository to [Netlify](https://netlify.com)
2. Build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
3. Set environment variables
4. Deploy!

## ☁️ AWS (Manual)

### EC2 Instance
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and deploy
git clone https://github.com/tamler/mma-gym-management-system.git
cd mma-gym-management-system
npm install
npm run build

# Install PM2 for process management
sudo npm install -g pm2
pm2 start npm --name "mma-gym" -- start
pm2 startup
pm2 save
```

### Using AWS Amplify
1. Connect repository to AWS Amplify
2. Build settings:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - npm ci
           build:
             commands:
               - npm run build
         artifacts:
           baseDirectory: .next
           files:
             - '**/*'
         cache:
           paths:
             - node_modules/**/*
   ```

## 🔧 Environment Variables

For **ALL** deployments, set these environment variables:

### Required
```bash
NEXTAUTH_SECRET=your-32-character-secret-key
NEXTAUTH_URL=https://your-domain.com
EMAIL_SERVER_HOST=smtp.zoho.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your-email@zoho.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@zoho.com
ENCRYPTION_KEY=your-32-character-encryption-key
ADMIN_MASTER_PASSWORD=your-very-strong-password
```

### Optional
```bash
GYM_NAME="Your Gym Name"
GYM_TIMEZONE="America/New_York"
CRON_SECRET=your-cron-secret
ADMIN_SECRET=your-admin-secret
```

## 🔍 Troubleshooting

### Build Failures

**Error: "next: not found"**
- Ensure `npm install` runs before `npm run build`
- Check Node.js version is 18+
- Verify all dependencies in package.json

**Error: "Module not found"**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Runtime Issues

**Error: "ENOENT: no such file or directory"**
- Ensure data directory is writable
- Check file permissions on server
- Verify environment variables are set

**Email not sending**
- Verify Zoho SMTP credentials
- Check firewall allows port 465
- Test with simple SMTP client

### Performance Optimization

```bash
# Enable compression
export NODE_ENV=production

# Optimize memory usage
export NODE_OPTIONS="--max-old-space-size=1024"

# Enable HTTP/2 (if supported)
export HTTP2=true
```

## 📊 Monitoring

### Health Checks
All platforms should use:
- **Health Check URL**: `/`
- **Timeout**: 30 seconds
- **Interval**: 60 seconds

### Logging
Monitor these logs:
- Application startup
- Authentication errors
- Database file operations
- Email sending status
- Admin actions

### Backup Strategy
Regularly backup the `/data` directory:
```bash
# Create backup
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# Restore from backup
tar -xzf backup-20241201.tar.gz
```

## 🔐 Security Checklist

- [ ] All environment variables set securely
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Strong encryption key (32+ characters)
- [ ] Strong admin master password (12+ characters)
- [ ] Email credentials are app-specific passwords
- [ ] Data directory has proper permissions
- [ ] Regular backups configured
- [ ] Monitoring and alerts set up

---

**Need help?** Open an issue on GitHub with your deployment platform and error details.