import { Customer, Tour, Booking, DashboardStats } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    createdAt: new Date('2024-01-15'),
    lastContact: new Date('2024-03-20'),
    status: 'active',
    notes: 'Interested in adventure tours, prefers morning departures'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    createdAt: new Date('2024-02-10'),
    lastContact: new Date('2024-03-18'),
    status: 'active',
    notes: 'Family of 4, interested in cultural tours'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Miami, FL 33101',
    createdAt: new Date('2024-01-28'),
    lastContact: new Date('2024-03-15'),
    status: 'prospect',
    notes: 'Looking for food tours, budget-conscious'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Chicago, IL 60601',
    createdAt: new Date('2024-03-01'),
    lastContact: new Date('2024-03-22'),
    status: 'active',
    notes: 'Solo traveler, prefers small group tours'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, Seattle, WA 98101',
    createdAt: new Date('2024-02-20'),
    lastContact: new Date('2024-03-19'),
    status: 'inactive',
    notes: 'Last booking was 6 months ago'
  }
];

export const mockTours: Tour[] = [
  {
    id: '1',
    name: 'City Explorer Walking Tour',
    description: 'Discover the hidden gems and historical landmarks of downtown with our expert guides.',
    duration: '3 hours',
    price: 45,
    maxCapacity: 15,
    location: 'Downtown',
    category: 'city',
    isActive: true
  },
  {
    id: '2',
    name: 'Mountain Adventure Hike',
    description: 'Experience breathtaking views and challenging trails in the nearby mountain range.',
    duration: '6 hours',
    price: 75,
    maxCapacity: 12,
    location: 'Mountain Range',
    category: 'adventure',
    isActive: true
  },
  {
    id: '3',
    name: 'Cultural Heritage Tour',
    description: 'Immerse yourself in local culture, visit museums, and learn about traditional customs.',
    duration: '4 hours',
    price: 60,
    maxCapacity: 20,
    location: 'Cultural District',
    category: 'cultural',
    isActive: true
  },
  {
    id: '4',
    name: 'Nature Photography Safari',
    description: 'Capture stunning wildlife and landscapes with professional photography guidance.',
    duration: '8 hours',
    price: 120,
    maxCapacity: 8,
    location: 'National Park',
    category: 'nature',
    isActive: true
  },
  {
    id: '5',
    name: 'Food & Wine Tasting',
    description: 'Savor local cuisine and fine wines at the best restaurants and vineyards.',
    duration: '5 hours',
    price: 90,
    maxCapacity: 10,
    location: 'Wine Country',
    category: 'food',
    isActive: true
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    tourId: '2',
    date: new Date('2024-04-15'),
    participants: 2,
    totalPrice: 150,
    status: 'confirmed',
    specialRequests: 'Vegetarian lunch option',
    createdAt: new Date('2024-03-20')
  },
  {
    id: '2',
    customerId: '2',
    tourId: '3',
    date: new Date('2024-04-20'),
    participants: 4,
    totalPrice: 240,
    status: 'pending',
    specialRequests: 'Wheelchair accessible route',
    createdAt: new Date('2024-03-21')
  },
  {
    id: '3',
    customerId: '4',
    tourId: '1',
    date: new Date('2024-04-10'),
    participants: 1,
    totalPrice: 45,
    status: 'completed',
    specialRequests: 'None',
    createdAt: new Date('2024-03-15')
  },
  {
    id: '4',
    customerId: '1',
    tourId: '5',
    date: new Date('2024-04-25'),
    participants: 2,
    totalPrice: 180,
    status: 'confirmed',
    specialRequests: 'Allergic to shellfish',
    createdAt: new Date('2024-03-22')
  },
  {
    id: '5',
    customerId: '3',
    tourId: '4',
    date: new Date('2024-04-12'),
    participants: 1,
    totalPrice: 120,
    status: 'cancelled',
    specialRequests: 'None',
    createdAt: new Date('2024-03-18')
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCustomers: 5,
  totalBookings: 5,
  monthlyRevenue: 735,
  activeTours: 5,
  pendingBookings: 1,
  completedBookings: 1
};

export const mockCommissions = [
  {
    id: '1',
    bookingId: '1',
    tourId: '2',
    customerId: '1',
    tourName: 'Mountain Adventure Hike',
    customerName: 'Sarah Johnson',
    commissionRate: 0.15,
    bookingAmount: 150,
    commissionAmount: 22.5,
    status: 'paid',
    date: new Date('2024-03-20'),
    paidDate: new Date('2024-03-25')
  },
  {
    id: '2',
    bookingId: '2',
    tourId: '3',
    customerId: '2',
    tourName: 'Cultural Heritage Tour',
    customerName: 'Michael Chen',
    commissionRate: 0.12,
    bookingAmount: 240,
    commissionAmount: 28.8,
    status: 'pending',
    date: new Date('2024-03-21'),
    paidDate: null
  },
  {
    id: '3',
    bookingId: '3',
    tourId: '1',
    customerId: '4',
    tourName: 'City Explorer Walking Tour',
    customerName: 'David Thompson',
    commissionRate: 0.10,
    bookingAmount: 45,
    commissionAmount: 4.5,
    status: 'paid',
    date: new Date('2024-03-15'),
    paidDate: new Date('2024-03-18')
  },
  {
    id: '4',
    bookingId: '4',
    tourId: '5',
    customerId: '1',
    tourName: 'Food & Wine Tasting',
    customerName: 'Sarah Johnson',
    commissionRate: 0.18,
    bookingAmount: 180,
    commissionAmount: 32.4,
    status: 'pending',
    date: new Date('2024-03-22'),
    paidDate: null
  }
]; 