const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

let credential;

// Try to load from JSON file first (recommended method)
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
if (fs.existsSync(serviceAccountPath)) {
  console.log('📄 Using serviceAccountKey.json for authentication');
  const serviceAccount = require(serviceAccountPath);
  credential = admin.credential.cert(serviceAccount);
} 
// Fall back to environment variables
else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
  console.log('🔐 Using environment variables for authentication');
  credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  });
} 
// No valid credentials found
else {
  console.error('❌ No Firebase credentials found!');
  console.error('Please either:');
  console.error('1. Place serviceAccountKey.json in project root, OR');
  console.error('2. Set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL in .env');
  console.error('\nSee SETUP_GUIDE.md for detailed instructions.');
  process.exit(1);
}

admin.initializeApp({ credential });

const db = admin.firestore();

// Test connection
db.listCollections()
  .then(() => console.log('✅ Firebase connected successfully'))
  .catch(err => {
    console.error('❌ Firebase connection error:', err.message);
    console.error('Check your credentials and make sure Firestore is enabled in Firebase Console');
  });

module.exports = { admin, db };