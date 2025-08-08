export interface Customer {
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

export interface Tour {
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

export interface Booking {
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

export interface DashboardStats {
  totalCustomers: number;
  totalBookings: number;
  monthlyRevenue: number;
  activeTours: number;
  pendingBookings: number;
  completedBookings: number;
} 