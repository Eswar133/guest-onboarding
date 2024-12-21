# Guest Onboarding System

A web-based application to manage hotels and guest details. The system provides a platform for hotel admins to add hotels, generate QR codes for each hotel, and for guests to fill out forms via QR code landing pages.

---

## Features

1. **Admin Panel**:
   - Add new hotels with logos.
   - View all registered hotels in a table.
   - Generate unique QR codes for each hotel.
   - QR codes redirect to hotel-specific landing pages.

2. **Guest Panel**:
   - Fill out a form with personal details, purpose of visit, and stay dates.
   - View a thank-you page after submission.

3. **Authentication**:
   - Sign up and log in as Admin or Guest.

4. **Dynamic Routes**:
   - Hotel-specific routes for QR code landing pages.

5. **Responsive UI**:
   - Modern, mobile-friendly design using CSS.

---

## Technologies Used

- **Frontend**: EJS (Embedded JavaScript Templates), HTML, CSS
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
│   ├── css/           # Stylesheets
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
├── app.js             # Application entry point
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

---

## Usage

### 1. Admin Panel
- **Add a Hotel**: Navigate to `/hotels/add`, fill out the form, and submit.
- **View Hotels**: View a table of all registered hotels.
- **Generate QR Codes**: Click "Generate QR Code" for a specific hotel.

### 2. Guest Panel
- **Scan QR Code**: Scan the QR code to access the hotel-specific landing page.
- **Fill Guest Form**: Complete the form and submit.
- **Thank You Page**: View confirmation of submission.

---

## API Endpoints

### Auth Routes
- `GET /auth/login` - Render login page
- `POST /auth/login` - Authenticate user
- `GET /auth/signup` - Render signup page
- `POST /auth/signup` - Register a new user

### Hotel Routes
- `GET /hotels` - List all hotels
- `GET /hotels/add` - Render add hotel form
- `POST /hotels/add` - Add a new hotel
- `GET /hotels/generate-qr/:hotelId` - Generate QR code for a hotel

### Guest Routes
- `GET /guest-landing/:hotelId` - Render guest landing page
- `POST /guest-landing/:hotelId` - Submit guest form
- `GET /all-guests` - List all guests

