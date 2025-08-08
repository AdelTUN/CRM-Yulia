# Tour Agent CRM

A beautiful, modern CRM system designed specifically for tour agents to manage customers, tours, bookings, and business analytics.

## 🚀 Features

### 📊 Dashboard
- Real-time business metrics and statistics
- Recent bookings and customer activity
- Quick action buttons for common tasks
- Revenue tracking and growth indicators

### 👥 Customer Management
- Complete customer profiles with contact information
- Customer status tracking (Active, Prospect, Inactive)
- Search and filter functionality
- Customer interaction history

### 🗺️ Tour Management
- Beautiful tour cards with detailed information
- Tour categories (Adventure, Cultural, Nature, City, Food)
- Pricing and capacity management
- Tour status tracking

### 📅 Booking Management
- Comprehensive booking system
- Booking status tracking (Confirmed, Pending, Cancelled, Completed)
- Customer and tour association
- Revenue calculation

### 📈 Analytics
- Business performance metrics
- Revenue trends and charts
- Customer distribution analysis
- Top performing tours
- Business insights and recommendations

### ⚙️ Settings
- User profile management
- Notification preferences
- Theme customization
- Data export/import
- Security settings

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for beautiful styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Date-fns** - Date manipulation utilities

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Beautiful Color Scheme** - Professional blue and green color palette
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Accessibility** - WCAG compliant design patterns

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tour-agent-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📱 Pages Overview

### Dashboard (`/`)
- Overview of business metrics
- Recent activity feed
- Quick action buttons
- Revenue and booking statistics

### Customers (`/customers`)
- Customer list with search and filters
- Customer status management
- Contact information display
- Customer statistics

### Tours (`/tours`)
- Tour catalog with beautiful cards
- Tour categories and filtering
- Pricing and capacity information
- Tour management actions

### Bookings (`/bookings`)
- Booking management system
- Status tracking and updates
- Customer and tour associations
- Revenue calculations

### Analytics (`/analytics`)
- Business performance metrics
- Revenue trends and charts
- Customer distribution
- Top performing tours

### Settings (`/settings`)
- User profile management
- Notification preferences
- Theme customization
- Data management
- Security settings

## 🎯 Key Features

### For Tour Agents
- **Customer Relationship Management** - Track customer interactions and preferences
- **Tour Management** - Manage tour offerings, pricing, and availability
- **Booking System** - Handle reservations and track booking status
- **Revenue Tracking** - Monitor business performance and growth
- **Analytics** - Data-driven insights for business decisions

### User Experience
- **Intuitive Navigation** - Easy-to-use sidebar navigation
- **Search & Filter** - Quick access to specific data
- **Responsive Design** - Works on all devices
- **Beautiful UI** - Modern, professional appearance
- **Fast Performance** - Optimized for speed and efficiency

## 🔧 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Color scheme in `tailwind.config.js`
- Component styles in `src/index.css`
- Individual component styling

### Data
- Mock data is located in `src/data/mockData.ts`
- Add your own data or connect to a backend API
- Modify data structures in `src/types/index.ts`

## 📊 Data Structure

### Customer
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  lastContact: Date;
  status: 'active' | 'inactive' | 'prospect';
  notes: string;
}
```

### Tour
```typescript
interface Tour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  maxCapacity: number;
  location: string;
  category: 'adventure' | 'cultural' | 'nature' | 'city' | 'food';
  isActive: boolean;
}
```

### Booking
```typescript
interface Booking {
  id: string;
  customerId: string;
  tourId: string;
  date: Date;
  participants: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  specialRequests: string;
  createdAt: Date;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Date utilities from date-fns

---

**Happy Tour Management! 🗺️✨** 