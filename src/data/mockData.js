// ============ USERS ============
export const users = [
  { id: 1, name: 'Arjun Sharma', address: '12, MG Road, Sector 5, Bangalore', contact: '+91 98765 43210', wasteCategory: 'Organic', avatar: 'AS' },
  { id: 2, name: 'Priya Patel', address: '45, Jubilee Hills, Hyderabad', contact: '+91 87654 32109', wasteCategory: 'Plastic', avatar: 'PP' },
  { id: 3, name: 'Rahul Verma', address: '78, Andheri West, Mumbai', contact: '+91 76543 21098', wasteCategory: 'Metal', avatar: 'RV' },
  { id: 4, name: 'Sneha Nair', address: '23, Koramangala, Bangalore', contact: '+91 65432 10987', wasteCategory: 'Hazardous', avatar: 'SN' },
  { id: 5, name: 'Vikram Singh', address: '56, Connaught Place, New Delhi', contact: '+91 54321 09876', wasteCategory: 'Organic', avatar: 'VS' },
  { id: 6, name: 'Meera Krishnan', address: '89, T Nagar, Chennai', contact: '+91 43210 98765', wasteCategory: 'Plastic', avatar: 'MK' },
  { id: 7, name: 'Aditya Joshi', address: '34, Baner, Pune', contact: '+91 32109 87654', wasteCategory: 'Metal', avatar: 'AJ' },
  { id: 8, name: 'Kavya Reddy', address: '67, Madhapur, Hyderabad', contact: '+91 21098 76543', wasteCategory: 'Organic', avatar: 'KR' },
];

// ============ PICKUPS ============
export const pickups = [
  { id: 1, userId: 1, userName: 'Arjun Sharma', date: '2026-03-25', time: '09:00', wasteType: 'Organic', status: 'Completed', weight: '12.5 kg' },
  { id: 2, userId: 2, userName: 'Priya Patel', date: '2026-03-25', time: '10:30', wasteType: 'Plastic', status: 'In Progress', weight: '8.2 kg' },
  { id: 3, userId: 3, userName: 'Rahul Verma', date: '2026-03-25', time: '14:00', wasteType: 'Metal', status: 'Pending', weight: '15.0 kg' },
  { id: 4, userId: 4, userName: 'Sneha Nair', date: '2026-03-26', time: '09:30', wasteType: 'Hazardous', status: 'Pending', weight: '3.8 kg' },
  { id: 5, userId: 5, userName: 'Vikram Singh', date: '2026-03-26', time: '11:00', wasteType: 'Organic', status: 'Pending', weight: '20.1 kg' },
  { id: 6, userId: 6, userName: 'Meera Krishnan', date: '2026-03-26', time: '15:00', wasteType: 'Plastic', status: 'Pending', weight: '6.4 kg' },
  { id: 7, userId: 7, userName: 'Aditya Joshi', date: '2026-03-27', time: '08:00', wasteType: 'Metal', status: 'Pending', weight: '22.7 kg' },
  { id: 8, userId: 8, userName: 'Kavya Reddy', date: '2026-03-27', time: '13:00', wasteType: 'Organic', status: 'Pending', weight: '9.3 kg' },
];

// ============ WASTE CATEGORIES ============
export const wasteCategories = [
  { id: 1, name: 'Organic', icon: '🌿', color: 'from-green-400 to-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20', textColor: 'text-green-700 dark:text-green-400', collected: 2450, capacity: 5000, unit: 'kg', status: 'Active', description: 'Food waste, garden waste, and biodegradable materials' },
  { id: 2, name: 'Plastic', icon: '♻️', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20', textColor: 'text-blue-700 dark:text-blue-400', collected: 1830, capacity: 4000, unit: 'kg', status: 'Active', description: 'Bottles, containers, packaging, and plastic bags' },
  { id: 3, name: 'Metal', icon: '⚙️', color: 'from-amber-400 to-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20', textColor: 'text-amber-700 dark:text-amber-400', collected: 980, capacity: 3000, unit: 'kg', status: 'Active', description: 'Cans, foil, scrap metal, and electronic components' },
  { id: 4, name: 'Hazardous', icon: '☢️', color: 'from-red-400 to-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20', textColor: 'text-red-700 dark:text-red-400', collected: 340, capacity: 1000, unit: 'kg', status: 'Critical', description: 'Batteries, chemicals, medical waste, and e-waste' },
  { id: 5, name: 'Paper', icon: '📄', color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', textColor: 'text-yellow-700 dark:text-yellow-400', collected: 1560, capacity: 3500, unit: 'kg', status: 'Active', description: 'Newspapers, cardboard, office paper, and magazines' },
  { id: 6, name: 'Glass', icon: '🫙', color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20', textColor: 'text-purple-700 dark:text-purple-400', collected: 720, capacity: 2000, unit: 'kg', status: 'Active', description: 'Bottles, jars, broken glass, and windowpanes' },
];

// ============ COLLECTION TRENDS ============
export const collectionTrends = [
  { month: 'Jan', organic: 1800, plastic: 1200, metal: 600, hazardous: 200, paper: 900, glass: 450 },
  { month: 'Feb', organic: 2100, plastic: 1400, metal: 750, hazardous: 250, paper: 1100, glass: 520 },
  { month: 'Mar', organic: 1950, plastic: 1350, metal: 680, hazardous: 180, paper: 1050, glass: 480 },
  { month: 'Apr', organic: 2300, plastic: 1550, metal: 820, hazardous: 290, paper: 1200, glass: 590 },
  { month: 'May', organic: 2500, plastic: 1700, metal: 900, hazardous: 310, paper: 1350, glass: 630 },
  { month: 'Jun', organic: 2200, plastic: 1600, metal: 850, hazardous: 270, paper: 1250, glass: 580 },
  { month: 'Jul', organic: 2650, plastic: 1800, metal: 950, hazardous: 320, paper: 1400, glass: 670 },
  { month: 'Aug', organic: 2400, plastic: 1650, metal: 880, hazardous: 300, paper: 1300, glass: 620 },
  { month: 'Sep', organic: 2150, plastic: 1500, metal: 780, hazardous: 260, paper: 1150, glass: 550 },
  { month: 'Oct', organic: 2350, plastic: 1700, metal: 900, hazardous: 290, paper: 1280, glass: 610 },
  { month: 'Nov', organic: 2550, plastic: 1850, metal: 980, hazardous: 340, paper: 1420, glass: 690 },
  { month: 'Dec', organic: 2450, plastic: 1830, metal: 980, hazardous: 340, paper: 1560, glass: 720 },
];

// ============ DASHBOARD STATS ============
export const dashboardStats = {
  totalCollected: 7880,
  pickupsToday: 12,
  recyclingRate: 73.5,
  activeUsers: 156,
  pendingPickups: 24,
  co2Saved: 2340,
};

// ============ RECENT ACTIVITY ============
export const recentActivity = [
  { id: 1, action: 'Pickup completed', user: 'Arjun Sharma', time: '2 min ago', type: 'success' },
  { id: 2, action: 'New user registered', user: 'Kavya Reddy', time: '15 min ago', type: 'info' },
  { id: 3, action: 'Hazardous waste alert', user: 'Sneha Nair', time: '1 hour ago', type: 'warning' },
  { id: 4, action: 'Pickup scheduled', user: 'Vikram Singh', time: '2 hours ago', type: 'info' },
  { id: 5, action: 'Route optimized', user: 'System', time: '3 hours ago', type: 'success' },
];

// ============ NOTIFICATIONS ============
export const notifications = [
  { id: 1, title: 'Pickup Completed', message: 'Arjun Sharma\'s organic waste has been collected', time: '2 min ago', read: false },
  { id: 2, title: 'New User', message: 'Kavya Reddy has registered for waste collection', time: '15 min ago', read: false },
  { id: 3, title: 'Hazardous Alert', message: 'Critical levels reached for hazardous waste in Zone 4', time: '1 hour ago', read: false },
  { id: 4, title: 'Report Ready', message: 'Monthly waste collection report is ready for download', time: '3 hours ago', read: true },
  { id: 5, title: 'System Update', message: 'Route optimization algorithm has been updated', time: '5 hours ago', read: true },
];

// ============ CATEGORY DISTRIBUTION (PIE) ============
export const categoryDistribution = [
  { name: 'Organic', value: 2450, fill: '#22c55e' },
  { name: 'Plastic', value: 1830, fill: '#3b82f6' },
  { name: 'Metal', value: 980, fill: '#f59e0b' },
  { name: 'Hazardous', value: 340, fill: '#ef4444' },
  { name: 'Paper', value: 1560, fill: '#eab308' },
  { name: 'Glass', value: 720, fill: '#a855f7' },
];

// ============ MONTHLY REPORTS ============
export const monthlyReports = [
  { month: 'Jan 2026', totalCollected: 5150, recyclingRate: 68, pickups: 245, co2Saved: 1545 },
  { month: 'Feb 2026', totalCollected: 5620, recyclingRate: 71, pickups: 267, co2Saved: 1686 },
  { month: 'Mar 2026', totalCollected: 5210, recyclingRate: 69, pickups: 251, co2Saved: 1563 },
  { month: 'Apr 2026', totalCollected: 6160, recyclingRate: 74, pickups: 298, co2Saved: 1848 },
  { month: 'May 2026', totalCollected: 6690, recyclingRate: 76, pickups: 312, co2Saved: 2007 },
  { month: 'Jun 2026', totalCollected: 6180, recyclingRate: 73, pickups: 289, co2Saved: 1854 },
];
