#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

// Import encryption functions
const { encryptObject } = require('../src/lib/encryption');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateId() {
  return crypto.randomUUID();
}

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  const usersDir = path.join(dataDir, 'users');
  
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  try {
    await fs.access(usersDir);
  } catch {
    await fs.mkdir(usersDir, { recursive: true });
  }
}

async function userExists(email) {
  try {
    const usersDir = path.join(process.cwd(), 'data', 'users');
    const files = await fs.readdir(usersDir);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(usersDir, file);
        const encryptedData = await fs.readFile(filePath, 'utf-8');
        
        try {
          const { decryptObject } = require('../src/lib/encryption');
          const userData = decryptObject(encryptedData);
          if (userData.email === email) {
            return { exists: true, user: userData, filePath };
          }
        } catch (error) {
          console.log(`Warning: Could not decrypt ${file}, skipping...`);
        }
      }
    }
    
    return { exists: false };
  } catch (error) {
    return { exists: false };
  }
}

async function createAdminUser() {
  console.log('🥊 MMA Gym Management - Admin User Creator\n');
  
  try {
    // Check if encryption key is set
    if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length < 32) {
      console.log('❌ Error: ENCRYPTION_KEY environment variable must be set and at least 32 characters long.');
      console.log('Please set it in your .env.local file.\n');
      process.exit(1);
    }
    
    await ensureDataDir();
    
    // Get admin email
    let email;
    while (true) {
      email = await question('Enter admin email address: ');
      if (isValidEmail(email)) {
        break;
      }
      console.log('Please enter a valid email address.\n');
    }
    
    // Check if user already exists
    const userCheck = await userExists(email);
    if (userCheck.exists) {
      console.log(`\n⚠️  User with email ${email} already exists.`);
      const updateRole = await question('Would you like to update their role to admin? (y/N): ');
      
      if (updateRole.toLowerCase() === 'y' || updateRole.toLowerCase() === 'yes') {
        const user = userCheck.user;
        user.role = 'admin';
        user.updatedAt = new Date();
        
        const encryptedData = encryptObject(user);
        await fs.writeFile(userCheck.filePath, encryptedData, 'utf-8');
        
        console.log(`\n✅ Successfully updated ${email} to admin role!`);
        console.log('They can now sign in with their email to access admin features.');
      } else {
        console.log('\nOperation cancelled.');
      }
      
      rl.close();
      return;
    }
    
    // Get admin name (optional)
    const name = await question('Enter admin name (optional): ');
    
    // Create admin user object
    const adminUser = {
      id: generateId(),
      email: email,
      name: name || undefined,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Encrypt and save user data
    const encryptedData = encryptObject(adminUser);
    const filename = `${adminUser.id}.json`;
    const filePath = path.join(process.cwd(), 'data', 'users', filename);
    
    await fs.writeFile(filePath, encryptedData, 'utf-8');
    
    console.log('\n🎉 Admin user created successfully!');
    console.log(`Email: ${adminUser.email}`);
    if (adminUser.name) {
      console.log(`Name: ${adminUser.name}`);
    }
    console.log(`Role: ${adminUser.role}`);
    console.log(`User ID: ${adminUser.id}`);
    
    console.log('\n📧 Next steps:');
    console.log('1. Start your application with: npm run dev');
    console.log('2. Go to: http://localhost:3000/auth/signin');
    console.log(`3. Sign in with: ${adminUser.email}`);
    console.log('4. Check your email for the magic link');
    console.log('5. Click the link to access admin dashboard');
    
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n\nOperation cancelled by user.');
  rl.close();
  process.exit(0);
});

// Run the admin creation
createAdminUser().catch(console.error);