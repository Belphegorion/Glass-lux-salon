# 💇 Salon Booking Application

A modern, full-stack salon booking system built with React, Node.js, Express, and MongoDB. Features a beautiful UI with animations, secure authentication, and comprehensive booking management.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Setup](#-development-setup)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Security](#-security)
- [Performance Optimizations](#-performance-optimizations)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Client Features
- 🎨 **Modern UI/UX** - Built with React, Tailwind CSS, and Framer Motion animations
- 🔐 **User Authentication** - Secure login and registration with JWT
- 📅 **Booking System** - Interactive date/time selection with real-time availability
- 💈 **Service Selection** - Browse and select from various salon services
- 👨‍🎨 **Stylist Selection** - Choose your preferred stylist with profiles and ratings
- 📍 **Multi-Location Support** - Book appointments at different salon locations
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Lazy loading, code splitting, and optimized assets
- 🎭 **Smooth Animations** - GSAP and Framer Motion for fluid user experience

### Admin Features
- 📊 **Dashboard** - Comprehensive booking and user management
- 👥 **User Management** - View and manage customer accounts
- 📆 **Booking Management** - View, update, and cancel appointments
- 💼 **Service Management** - Add, edit, and remove services
- 🏢 **Location Management** - Manage multiple salon locations
- 👔 **Stylist Management** - Add and manage stylist profiles

### Backend Features
- 🔒 **Secure API** - JWT authentication with role-based access control
- 🛡️ **Security Hardening** - Helmet, XSS protection, and rate limiting
- 📧 **Email Notifications** - Automated booking confirmations via Nodemailer
- 🗄️ **MongoDB Integration** - Robust data persistence with Mongoose ODM
- ⚡ **Performance** - Response compression and optimized queries
- 🔄 **RESTful API** - Clean, well-documented API endpoints
- 🧪 **Testing** - Unit and integration tests with Jest

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.11
- **Routing**: React Router DOM 6.28.0
- **Styling**: Tailwind CSS 4.0.0-beta
- **Animations**: Framer Motion 11.11.17, GSAP 3.12.5
- **HTTP Client**: Axios 1.7.7
- **UI Components**: Radix UI, Lucide React
- **SEO**: React Helmet 6.1.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.21.1
- **Database**: MongoDB 6 with Mongoose 8.8.3
- **Authentication**: JWT (jsonwebtoken 9.0.2), bcryptjs 2.4.3
- **Security**: Helmet 8.0.0, express-rate-limit 7.4.1, xss-clean 0.1.4
- **Email**: Nodemailer 6.9.16
- **Performance**: Compression 1.7.4
- **Testing**: Jest 29.7.0

### DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for production client)
- **E2E Testing**: Playwright
- **Process Manager**: Nodemon (development)

## 🏗 Architecture

```
┌─────────────────┐
│   React Client  │ (Port 3000)
│   (Vite + SPA)  │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express Server │ (Port 5000)
│   (Node.js API) │
└────────┬────────┘
         │ Mongoose ODM
         ▼
┌─────────────────┐
│    MongoDB      │ (Port 27017)
│   (Database)    │
└─────────────────┘
```

### Key Design Patterns
- **MVC Architecture** - Separation of concerns with Models, Controllers, and Routes
- **Middleware Pipeline** - Authentication, validation, and error handling
- **Context API** - State management for booking flow
- **Component Composition** - Reusable UI components
- **Lazy Loading** - Code splitting for optimal performance

## 📦 Prerequisites

### For Docker Deployment (Recommended)
- Docker Desktop 20.10+
- Docker Compose 2.0+

### For Local Development
- Node.js 18+ and npm 9+
- MongoDB 6+ (local installation or cloud instance)
- Git

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd "salon main complete"
```

2. **Configure environment variables**
```bash
# Server environment
cp server/.env.example server/.env
# Edit server/.env with your configuration

# Client environment (if needed)
cp client/.env.example client/.env
```

3. **Start all services**
```bash
docker compose up --build
```

4. **Access the application**
- Client: http://localhost:3000
- Server API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

### Option 2: Using Helper Script

```bash
# Make script executable (Linux/Mac)
chmod +x run_full_setup.sh

# Run with Docker
./run_full_setup.sh --docker

# Run locally
./run_full_setup.sh --local

# Build only
./run_full_setup.sh --build-only

# Run tests
./run_full_setup.sh --test

# Run E2E tests
./run_full_setup.sh --e2e
```

## 💻 Development Setup

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/salon-app
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@salon.com
```

**Client (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name salon-mongo mongo:6

# Or use local MongoDB installation
mongod --dbpath /path/to/data
```

### 4. Start Development Servers

**Terminal 1 - Server**
```bash
cd server
npm run dev
```

**Terminal 2 - Client**
```bash
cd client
npm run dev
```

The client will be available at http://localhost:5173 (Vite default) and the server at http://localhost:5000.

## 🐳 Docker Deployment

### Development with Docker Compose

```bash
# Start all services
docker compose up

# Start with rebuild
docker compose up --build

# Run in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

### Production Build

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Deploy
docker compose -f docker-compose.prod.yml up -d
```

### Individual Container Management

```bash
# Build server image
docker build -t salon-server ./server

# Build client image
docker build -t salon-client ./client

# Run server container
docker run -p 5000:5000 --env-file ./server/.env salon-server

# Run client container
docker run -p 3000:80 salon-client
```

## 📁 Project Structure

```
salon-main-complete/
├── client/                      # React frontend application
│   ├── src/
│   │   ├── assets/             # Images, fonts, static files
│   │   ├── components/         # Reusable React components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ui/            # UI component library
│   │   ├── context/           # React Context providers
│   │   ├── data/              # Static data and constants
│   │   ├── pages/             # Page components
│   │   │   ├── Homepage/
│   │   │   ├── Services/
│   │   │   ├── ChooseYourStylist/
│   │   │   ├── BookDateTime/
│   │   │   ├── Login/
│   │   │   ├── SignUp/
│   │   │   └── NotFound/
│   │   ├── styles/            # Global styles and Tailwind config
│   │   ├── utils/             # Utility functions
│   │   ├── api.js             # API client configuration
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Application entry point
│   ├── Dockerfile             # Client Docker configuration
│   ├── nginx.conf             # Nginx configuration for production
│   ├── package.json           # Client dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite build configuration
│
├── server/                     # Node.js backend application
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── bookingsController.js
│   │   ├── bookingUtils.js
│   │   ├── locationsController.js
│   │   ├── seedController.js
│   │   ├── servicesController.js
│   │   ├── stylistsController.js
│   │   └── usersController.js
│   ├── middleware/            # Express middleware
│   │   ├── admin.js          # Admin authorization
│   │   └── auth.js           # JWT authentication
│   ├── models/               # Mongoose schemas
│   │   ├── Booking.js
│   │   ├── Location.js
│   │   ├── Notification.js
│   │   ├── Service.js
│   │   ├── Stylist.js
│   │   └── User.js
│   ├── routes/               # API route definitions
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── locations.js
│   │   ├── notification.js
│   │   ├── seed.js
│   │   ├── services.js
│   │   ├── stylists.js
│   │   └── users.js
│   ├── tests/                # Unit and integration tests
│   │   └── bookingUtils.test.js
│   ├── utils/                # Utility functions
│   │   └── mailer.js        # Email service
│   ├── Dockerfile            # Server Docker configuration
│   ├── index.js              # Server entry point
│   └── package.json          # Server dependencies
│
├── e2e/                       # End-to-end tests
│   ├── tests/
│   │   └── booking.e2e.js
│   └── playwright.config.js
│
├── docker-compose.yml         # Docker Compose configuration
├── run_full_setup.sh         # Helper script for setup
├── test-build.bat            # Windows build test script
└── README.md                 # This file
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Service Endpoints

#### Get All Services
```http
GET /api/services
```

#### Get Service by ID
```http
GET /api/services/:id
```

### Stylist Endpoints

#### Get All Stylists
```http
GET /api/stylists
```

#### Get Stylists by Location
```http
GET /api/stylists?location=location-id
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "service-id",
  "stylistId": "stylist-id",
  "locationId": "location-id",
  "date": "2024-01-15",
  "time": "14:00",
  "notes": "Optional notes"
}
```

#### Get User Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer <token>
```

#### Cancel Booking
```http
DELETE /api/bookings/:id
Authorization: Bearer <token>
```

### Location Endpoints

#### Get All Locations
```http
GET /api/locations
```

### Admin Endpoints

All admin endpoints require authentication with admin role.

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <admin-token>
```

#### Get All Bookings
```http
GET /api/admin/bookings
Authorization: Bearer <admin-token>
```

#### Update Booking Status
```http
PATCH /api/admin/bookings/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Health Check
```http
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔐 Environment Variables

### Server Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `MONGO_URI` | MongoDB connection string | mongodb://mongo:27017/salon-app | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE` | JWT expiration time | 7d | No |
| `EMAIL_HOST` | SMTP server host | - | No |
| `EMAIL_PORT` | SMTP server port | 587 | No |
| `EMAIL_USER` | Email account username | - | No |
| `EMAIL_PASS` | Email account password | - | No |
| `EMAIL_FROM` | Sender email address | - | No |
| `NODE_ENV` | Environment (development/production) | development | No |

### Client Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api | Yes |

## 🧪 Testing

### Unit Tests

```bash
# Run server tests
cd server
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### E2E Tests

```bash
# Install Playwright
cd e2e
npm install

# Run E2E tests
npm test

# Run with UI
npm test -- --ui

# Run specific test
npm test -- booking.e2e.js
```

### Manual Testing

```bash
# Use helper script
./run_full_setup.sh --test
```

## 🔒 Security

### Implemented Security Measures

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (RBAC)
   - Password hashing with bcryptjs
   - Secure token storage

2. **API Security**
   - Helmet.js for HTTP headers
   - CORS configuration
   - XSS protection with xss-clean
   - Rate limiting (100 requests per 15 minutes)
   - Request size limits (10MB)

3. **Data Security**
   - MongoDB injection prevention via Mongoose
   - Input validation and sanitization
   - Secure password requirements
   - Environment variable protection

4. **Production Recommendations**
   - Use strong JWT_SECRET (minimum 32 characters)
   - Enable HTTPS/TLS
   - Configure CORS for specific origins
   - Implement refresh token rotation
   - Add request logging and monitoring
   - Regular security audits with `npm audit`

### Security Checklist

- [ ] Change default JWT_SECRET
- [ ] Configure production CORS origins
- [ ] Enable HTTPS
- [ ] Set up MongoDB authentication
- [ ] Configure firewall rules
- [ ] Implement rate limiting per user
- [ ] Add request logging
- [ ] Set up monitoring and alerts
- [ ] Regular dependency updates
- [ ] Implement backup strategy

## ⚡ Performance Optimizations

### Frontend Optimizations

1. **Code Splitting**
   - Lazy loading of route components
   - Dynamic imports for heavy libraries
   - Suspense boundaries for loading states

2. **Asset Optimization**
   - Image optimization and lazy loading
   - CSS purging with Tailwind
   - Minification and compression
   - Tree shaking unused code

3. **Caching Strategy**
   - Service worker for offline support
   - Browser caching headers
   - API response caching

4. **Rendering Performance**
   - React.memo for expensive components
   - Virtual scrolling for long lists
   - Debounced search inputs
   - Optimized re-renders

### Backend Optimizations

1. **Response Compression**
   - Gzip compression for all responses
   - Optimized JSON payloads

2. **Database Optimization**
   - Indexed queries
   - Lean queries for read operations
   - Connection pooling
   - Query result caching

3. **API Performance**
   - Pagination for large datasets
   - Field selection to reduce payload
   - Batch operations where possible

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Failed

```bash
# Check if MongoDB is running
docker ps | grep mongo

# Check MongoDB logs
docker logs salon-mongo

# Restart MongoDB
docker compose restart mongo
```

#### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

#### Client Not Connecting to Server

1. Check VITE_API_URL in client/.env
2. Verify server is running on correct port
3. Check CORS configuration in server
4. Inspect browser console for errors

#### Docker Build Fails

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker compose build --no-cache

# Check Docker logs
docker compose logs
```

#### JWT Token Issues

1. Verify JWT_SECRET is set in server/.env
2. Check token expiration time
3. Clear browser localStorage
4. Verify Authorization header format: `Bearer <token>`

### Debug Mode

```bash
# Enable debug logging
export DEBUG=*  # Mac/Linux
set DEBUG=*  # Windows

# Run server with verbose logging
cd server
npm run dev
```

### Getting Help

1. Check existing issues in the repository
2. Review server and client logs
3. Verify environment variables
4. Test API endpoints with Postman/curl
5. Check browser console for client errors

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB team
- All open-source contributors

## 📞 Support

For support, please:
- Open an issue in the repository
- Check the troubleshooting section
- Review existing documentation

---

**Built with ❤️ for modern salon management**
