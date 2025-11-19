# Vehicle Management System

A full-stack TypeScript application for managing vehicle fleets with comprehensive CRUD operations, status management, and business rule validations.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete vehicles
- **Status Management**: Track vehicles as Available, InUse, or Maintenance
- **Business Rules Validation**:
  - Vehicles in Maintenance can only transition to Available
  - Vehicles that are InUse or in Maintenance cannot be deleted
  - Maximum 5% of fleet can be in Maintenance simultaneously
- **Search & Filter**: Real-time search and status-based filtering
- **Sorting**: Sort by date, license plate, or status
- **Persistent Storage**: SQLite database for data persistence
- **RESTful API**: Clean separation between frontend and backend
- **TypeScript**: Full type safety across the entire stack

## 📁 Project Structure
```
vehicle-management-system/
├── backend/           # Node.js + Express + TypeScript API
├── frontend/          # React + TypeScript SPA
├── vehicles.json      # Seed data file
└── README.md          # This file
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (better-sqlite3)
- **Architecture**: Layered (Controllers → Services → Repositories)

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Styling**: CSS Modules
- **State Management**: React Hooks

## 📋 Prerequisites

To verify installation:
```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
```

## 🚀 Setup Instructions

### Step 1: Extract the Project

Extract the zip file to your desired location:
```bash
unzip vehicle-management-system.zip
cd vehicle-management-system
```

### Step 2: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# The project will automatically:
# - Create the SQLite database
# - Create the vehicles table
# - Seed initial data from vehicles.json

# Start the backend server
npm run dev
```

The backend will start on **http://localhost:5000**

You should see:
```
✅ Database table initialized
✅ Seeded 5 vehicles into database
🚀 Server running on port 5000
📝 API: http://localhost:5000/api
```

### Step 3: Frontend Setup

Open a **NEW terminal** (keep backend running):
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will automatically open in your browser at **http://localhost:3000**

##  Using the Application

### Main Features

1. **View Vehicles**: See all vehicles in a table with their status and creation date
2. **Search**: Type in the search box to filter by license plate
3. **Filter**: Use the dropdown to filter by status (Available, InUse, Maintenance)
4. **Sort**: Sort by newest/oldest, license plate, or status
5. **Add Vehicle**: Click "+ Add Vehicle" button
6. **Edit Vehicle**: Click the edit icon (✏️) on any vehicle row
7. **Delete Vehicle**: Click the delete icon (🗑️) - validates business rules
8. **Change Status**: Use the status dropdown in each row


### Manual Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads and shows 5 vehicles
- [ ] Can search for vehicles by license plate
- [ ] Can filter by status
- [ ] Can sort vehicles
- [ ] Can add a new vehicle
- [ ] Can edit vehicle details
- [ ] Can change vehicle status
- [ ] Cannot delete InUse or Maintenance vehicles
- [ ] Cannot change Maintenance to InUse directly
- [ ] Cannot exceed 5% maintenance limit
- [ ] Data persists after server restart

```

## Author

Hosen Assadi

---

**Built with ❤️ using TypeScript, React, and Node.js**