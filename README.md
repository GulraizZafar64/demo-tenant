# Multi-Tenant CRM with Firestore

A simple Node.js + Express API with Firestore for managing leads across multiple tenants.

## 🏗️ Architecture

### Firestore Structure
```
/tenants/{tenantId}/leads/{leadId}
```

### Lead Schema
```javascript
{
  id: string,
  name: string,
  stageId: string,           // e.g., 'stage-new', 'stage-qualified'
  priority: string,          // 'high', 'medium', 'low'
  lastActivityAt: Timestamp,
  replyRate: number,         // 0-1 (dummy data)
  dealValue: number,         // USD (dummy data)
  email: string,
  phone: string,
  company: string
}
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- Firebase project with Firestore enabled
- Firebase service account credentials

## 🚀 Setup Instructions

### 1. Clone and Install
```bash
npm install
```

### 2. Firebase Configuration

#### Quick Method (Recommended):

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. **Enable Firestore Database** (very important!)
   - Go to Firestore Database → Create database
   - Choose "Start in production mode" or "Start in test mode"
4. Generate a service account key:
   - Go to Project Settings (⚙️) → Service Accounts tab
   - Click "Generate New Private Key"
   - Download the JSON file
5. **Rename the file to `serviceAccountKey.json`**
6. **Place it in the project root** (same folder as `package.json`)

That's it! The app will automatically detect and use the JSON file.

#### Alternative: Environment Variables

If you prefer using environment variables, see **SETUP_GUIDE.md** for detailed instructions.

### 3. Verify Setup

The app will automatically:
- Try to load `serviceAccountKey.json` first
- Fall back to environment variables if JSON not found
- Show clear error messages if credentials are missing or invalid

### 4. Seed Sample Data

```bash
npm run seed
```

This will create:
- 1 tenant (`demo-tenant-001`)
- 10 leads across 2 stages:
  - 5 leads in `stage-new`
  - 5 leads in `stage-qualified`

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## 📡 API Endpoints

### 1. Get Leads by Stage (Board View)
```
GET /api/board/:tenantId/:stageId
```

Returns compact fields for all leads in a specific stage, ordered by `lastActivityAt` (descending).

**Example:**
```bash
curl http://localhost:3000/api/board/demo-tenant-001/stage-new
```

**Response:**
```json
[
  {
    "id": "lead-004",
    "name": "Emily Davis",
    "stageId": "stage-new",
    "priority": "high",
    "lastActivityAt": "2024-10-01T11:45:00.000Z",
    "replyRate": 0.91,
    "dealValue": 22000
  },
  {
    "id": "lead-001",
    "name": "John Smith",
    "stageId": "stage-new",
    "priority": "high",
    "lastActivityAt": "2024-10-01T10:30:00.000Z",
    "replyRate": 0.85,
    "dealValue": 15000
  }
  // ... more leads
]
```

### 2. Get Full Lead Details
```
GET /api/leads/:tenantId/:leadId
```

Returns complete lead document with all fields.

**Example:**
```bash
curl http://localhost:3000/api/board/demo-tenant-001/lead-001
```

**Response:**
```json
{
  "id": "lead-001",
  "name": "John Smith",
  "stageId": "stage-new",
  "priority": "high",
  "lastActivityAt": "2024-10-01T10:30:00.000Z",
  "replyRate": 0.85,
  "dealValue": 15000,
  "email": "john.smith@example.com",
  "phone": "+1-555-0101",
  "company": "Tech Corp"
}
```

### 3. Health Check
```
GET /health
```

Returns server status.

## 🧪 Testing the API

### Using cURL

```bash
# Get all leads in 'stage-new'
curl http://localhost:3000/api/board/demo-tenant-001/stage-new

# Get all leads in 'stage-qualified'
curl http://localhost:3000/api/board/demo-tenant-001/stage-qualified

# Get specific lead details
curl http://localhost:3000/api/leads/demo-tenant-001/lead-001

# Health check
curl http://localhost:3000/health
```

### Using a Browser

Simply open these URLs in your browser:
- http://localhost:3000/api/board/demo-tenant-001/stage-new
- http://localhost:3000/api/board/demo-tenant-001/stage-qualified
- http://localhost:3000/api/leads/demo-tenant-001/lead-001

## 📁 Project Structure

```
.
├── src/
│   ├── config/
│   │   └── firebase.js       # Firebase initialization
│   ├── routes/
│   │   └── leads.js          # API route handlers
│   ├── server.js             # Express app setup
│   └── seed.js               # Database seeding script
├── .env                      # Environment variables (create this)
├── .env.example              # Environment template
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎨 Code Style

- Clean, readable code with descriptive variable names
- Async/await for all Firestore operations
- Proper error handling with try-catch blocks
- RESTful API design patterns
- JSDoc-style comments for route documentation

## 🔧 Troubleshooting

### "Firebase project not found" or "UNAUTHENTICATED"

**Quick Fix:**
1. Make sure `serviceAccountKey.json` is in the project root (same folder as `package.json`)
2. Ensure Firestore is **enabled** in Firebase Console (this is a common issue!)
   - Go to Firebase Console → Build → Firestore Database
   - Click "Create database" if it doesn't exist
3. Verify the service account JSON file is valid (should be valid JSON format)

**See SETUP_GUIDE.md for detailed troubleshooting steps.**

### "Permission denied"
- Check that your service account has Firestore read/write permissions
- In Firebase Console, go to IAM & Admin to verify permissions

### "Cannot find module"
- Run `npm install` to install all dependencies

## 📝 Notes

- This is a minimal proof-of-concept implementation
- All data is dummy/sample data for testing
- No authentication/authorization implemented (add in production)
- CORS is enabled for all origins (restrict in production)

## 🚀 Next Steps for Phase 1

This foundation is ready to extend with:
- Additional CRUD operations (POST, PUT, DELETE)
- Lead filtering and search
- Pagination for large datasets
- Authentication middleware
- Validation layers
- More complex queries and aggregations

---

**Questions or issues?** Feel free to reach out!