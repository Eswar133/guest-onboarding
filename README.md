# Guest Onboarding System

A comprehensive web application to manage hotels and guest information. The system provides features for hotel administrators to manage hotels and their guests efficiently, with QR code-based onboarding and a user-friendly interface.

---

## Features

1. **Admin Panel**:
   - Add, view, and edit hotels with logos.
   - Generate unique QR codes for hotels.
   - Manage and view registered guests.

2. **Guest Panel**:
   - Access hotel-specific landing pages via QR codes.
   - Fill out personalized forms with details like name, purpose, stay dates, and more.
   - View a confirmation page after submission.

3. **Authentication**:
   - Role-based sign-up and login (Main Admin, Guest Admin).

4. **Dynamic Routing**:
   - Generate and access unique hotel routes for QR code functionality.

5. **Enhanced User Experience**:
   - Modern, responsive UI with a dark theme.
   - Mobile-friendly design for ease of use.

---

## Technologies Used

- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **QR Code Generation**: `qrcode` npm package
- **File Uploads**: `multer` npm package
- **Session Management**: `express-session`
- **Flash Messages**: `connect-flash`

---

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/guest-onboarding.git
   cd guest-onboarding
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit the application at:
   ```
   http://localhost:3000
   ```

---

## File Structure

```
guest-onboarding/
├── controllers/       # Business logic
│   ├── authController.js
│   ├── hotelController.js
│   └── guestController.js
├── models/            # Database models
│   ├── User.js
│   ├── Hotel.js
│   └── Guest.js
├── public/            # Public assets
│   ├── js/            # JavaScript
│   └── uploads/       # Uploaded files
├── routes/            # Application routes
│   ├── authRoutes.js
│   ├── hotelRoutes.js
│   └── guestRoutes.js
├── views/             # EJS templates
│   ├── admin/         # Admin-specific templates
│   ├── auth/          # Authentication templates
│   ├── guest/         # Guest-specific templates
|   ├── guestAdmin/    # GuestAdmin-specific templates
│   └── layouts/       # Shared layouts
├── .env               # Environment variables
├── server.js          # Application entry point
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

---

## Usage

### 1. Admin Panel
- **Add a Hotel**: Navigate to `/hotels/add`, fill out the form, and submit.
- **View Hotels**: View a table of all registered hotels.
- **Generate QR Codes**: Click "Generate QR Code" for a specific hotel.
- **Edit Hotel Details**: Navigate to `/hotels/edit/:hotelId` to update hotel information.
- **Manage Guests**: View and manage all registered guests.

### 2. Guest Panel
- **Scan QR Code**: Scan the QR code to access the hotel-specific landing page.
- **Fill Guest Form**: Complete the form with details such as full name, purpose of visit, and stay dates.
- **Thank You Page**: View confirmation of submission.

---

## API Endpoints

### Auth Routes
- `GET /auth/login` - Render login page
- `POST /auth/login` - Authenticate user
- `GET /auth/signup` - Render signup page
- `POST /auth/signup` - Register a new user
- `GET /auth/logout` - Log out the user

### Hotel Routes
- `GET /hotels` - List all hotels (available for guests without login)
- `GET /hotels/add` - Render add hotel form
- `POST /hotels/add` - Add a new hotel
- `GET /hotels/generate-qr/:hotelId` - Generate QR code for a hotel
- `GET /hotels/edit/:hotelId` - Render edit hotel form
- `POST /hotels/edit/:hotelId` - Update hotel details

### Guest Routes
- `GET /guest-landing/:hotelId` - Render guest landing page
- `POST /guest-landing/:hotelId` - Submit guest form
- `GET /guests` - List all guests
- `GET /guests/edit/:guestId` - Render edit guest form
- `POST /guests/edit/:guestId` - Update guest details

---

## New Features Added

1. **Hotel Editing**:
   - Admins can update hotel details, including the logo.

2. **Guest Management**:
   - Admins can view, edit, and manage all guest details.

3. **Improved Authentication**:
   - Role-based access control for enhanced security.

4. **Dark Theme UI**:
   - Modern and visually appealing interface with responsive design.
