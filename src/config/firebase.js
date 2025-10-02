const admin = require('firebase-admin');
require('dotenv').config();

let credential;

// Use environment variables for authentication
if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
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
  console.error('Please set the following environment variables in your .env file:');
  console.error('- FIREBASE_PROJECT_ID');
  console.error('- FIREBASE_PRIVATE_KEY');
  console.error('- FIREBASE_CLIENT_EMAIL');
  console.error('\nTo get these values:');
  console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
  console.error('2. Click "Generate new private key"');
  console.error('3. Extract the values from the downloaded JSON file');
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