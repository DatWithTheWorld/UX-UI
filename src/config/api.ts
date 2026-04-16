import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockAdapter from 'axios-mock-adapter';

// Get API URL from environment or use default
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3002';

console.log('🔧 API Configuration:');
console.log('   API_URL:', API_URL);

/**
 * Create axios instance
 */
const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error) => {
    console.error('❌ API Error:', error.config?.url, error.message);
    return Promise.reject(error);
  }
);

// --- Standalone Mock DB Implementation ---

const STORAGE_KEYS = {
  PRODUCTS: 'smart_mock_products',
  VOUCHERS: 'smart_mock_vouchers',
  TASKS: 'smart_mock_tasks',
  TRANSACTIONS: 'smart_mock_transactions',
  BALANCES: 'smart_mock_balances',
  USERS: 'smart_mock_users'
};

const defaultUsers = [
  { id: 'u1', username: 'admin_demo', fullName: 'SMart Admin', role: 'admin', balance: 100000, virtual_balance: 100000, email: 'admin@smart.com', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: 'u2', full_name: 'John Doe', avatar_url: 'https://i.pravatar.cc/150?u=a', role: 'user', virtual_balance: 500.50, email: 'john@smart.com' },
  { id: 'u3', full_name: 'Jane Smith', avatar_url: 'https://i.pravatar.cc/150?u=b', role: 'vendor', virtual_balance: 25000.00, email: 'jane@smart.com' }
];

const defaultProducts = [
  { id: 'p1', name: 'Premium Coffee Maker', price: 1200, category: 'Electronics', stock_quantity: 10, is_active: true, created_at: new Date().toISOString(), image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400', averageRating: 4.5, totalRatings: 12, discount_percentage: 10, created_by: 'v1' },
  { id: 'p2', name: 'Wireless Headphones', price: 2500, category: 'Electronics', stock_quantity: 5, is_active: true, created_at: new Date().toISOString(), image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400', averageRating: 4.8, totalRatings: 45, created_by: 'v1' },
  { id: 'p3', name: 'Modern Desk Lamp', price: 450, category: 'Home', stock_quantity: 20, is_active: true, created_at: new Date().toISOString(), image_url: 'https://images.unsplash.com/photo-1507412893111-e6e23616654e?q=80&w=400', averageRating: 4.2, totalRatings: 8, created_by: 'v2' },
  { id: 'p4', name: 'Ergonomic Chair', price: 8500, category: 'Home', stock_quantity: 3, is_active: true, created_at: new Date().toISOString(), image_url: 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?q=80&w=400', averageRating: 4.9, totalRatings: 22, created_by: 'v2' },
  { id: 'p5', name: 'Smart Watch Z', price: 3200, category: 'Electronics', stock_quantity: 15, is_active: true, created_at: new Date().toISOString(), image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400', averageRating: 4.6, totalRatings: 30, created_by: 'v3' }
];

const defaultVouchers = [
  { id: 'vch1', code: 'WELCOME88', title: 'Welcome Voucher', discount_type: 'fixed_amount', discount_value: 50, usage_limit_per_user: 1, total_usage_limit: 100, current_usage_count: 5, is_active: true, expires_at: '2026-12-31T23:59:59Z', is_claimable: true, is_featured: true, created_at: new Date().toISOString(), status: 'active' },
  { id: 'vch2', code: 'SUMMER20', title: 'Summer Sale', discount_type: 'percentage', discount_value: 20, usage_limit_per_user: 2, total_usage_limit: 500, current_usage_count: 12, is_active: true, expires_at: '2026-08-31T23:59:59Z', is_claimable: true, is_featured: false, created_at: new Date().toISOString(), status: 'active' }
];

const defaultTransactions = [
  { id: 'tr1', type: 'PURCHASE', amount: -1200.00, balance_after: 8800.00, description: 'Purchase Premium Coffee Maker', created_at: new Date(Date.now() - 86400000).toISOString(), category: 'Shopping' },
  { id: 'tr2', type: 'REWARD', amount: 500.00, balance_after: 9300.00, description: 'Completed Profile Task', created_at: new Date(Date.now() - 172800000).toISOString(), category: 'Task' }
];

// In-memory cache
let memDB: any = {
  loaded: false,
  products: [...defaultProducts],
  vouchers: [...defaultVouchers],
  tasks: [],
  transactions: [...defaultTransactions],
  users: [...defaultUsers],
  unreadNotifications: 3
};

/**
 * Persistence helper
 */
async function syncDB() {
  if (!memDB.loaded) {
    try {
      const storedProducts = await AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const storedVouchers = await AsyncStorage.getItem(STORAGE_KEYS.VOUCHERS);
      const storedTransactions = await AsyncStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);

      if (storedProducts) memDB.products = JSON.parse(storedProducts);
      if (storedVouchers) memDB.vouchers = JSON.parse(storedVouchers);
      if (storedTransactions) memDB.transactions = JSON.parse(storedTransactions);
      if (storedUsers) memDB.users = JSON.parse(storedUsers);
      
      memDB.loaded = true;
      console.log('📦 Mock DB Loaded from Storage');
    } catch (e) {
      console.error('Error loading Mock DB:', e);
    }
  } else {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(memDB.products));
      await AsyncStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(memDB.vouchers));
      await AsyncStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(memDB.transactions));
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(memDB.users));
    } catch (e) {
      console.error('Error saving Mock DB:', e);
    }
  }
}

// Attach mock adapter
const mock = new MockAdapter(api, { delayResponse: 500 });

mock.onAny().reply(async (config) => {
  await syncDB(); // Ensure DB is loaded/synced

  const url = config.url || '';
  const method = config.method?.toLowerCase();
  let data = {};
  try { data = config.data ? JSON.parse(config.data) : {}; } catch (e) { data = {}; }
  
  console.log(`[UI Mode] Mocking ${method?.toUpperCase()} ${url}`);

  const matches = (path: string) => url.includes(path);

  // --- Products ---
  if (matches('/products/categories')) return [200, { categories: ['Electronics', 'Home', 'Fashion', 'Health'] }];
  
  if (matches('/products') || matches('/admin/products') || matches('/vendor/products')) {
    if (method === 'get') {
      if (url.match(/\/products\/[a-zA-Z0-9_-]+$/)) {
        const id = url.split('/').pop();
        const p = memDB.products.find((i: any) => i.id === id);
        return p ? [200, { product: p }] : [404, { error: 'Product not found' }];
      }
      return [200, { products: memDB.products }];
    }
    if (method === 'post') {
      const newProduct = { 
        ...data, 
        id: 'p' + Date.now(), 
        created_at: new Date().toISOString(),
        is_active: true,
        stock_quantity: (data as any).stock_quantity || 10
      };
      memDB.products.unshift(newProduct);
      await syncDB();
      return [200, { message: 'Product created', product: newProduct }];
    }
    if (method === 'put') {
      const id = url.split('/').pop();
      const idx = memDB.products.findIndex((i: any) => i.id === id);
      if (idx !== -1) {
        memDB.products[idx] = { ...memDB.products[idx], ...data };
        await syncDB();
        return [200, { message: 'Product updated', product: memDB.products[idx] }];
      }
    }
    if (method === 'delete') {
      const id = url.split('/').pop();
      memDB.products = memDB.products.filter((i: any) => i.id !== id);
      await syncDB();
      return [200, { message: 'Product deleted' }];
    }
  }

  // --- Vouchers ---
  if (matches('/vouchers') || matches('/vendors/')) {
    if (method === 'get') {
      return [200, { vouchers: memDB.vouchers }];
    }
    if (method === 'post' && matches('/vouchers')) {
      const newVch = { 
        ...data, 
        id: 'vch' + Date.now(), 
        created_at: new Date().toISOString(),
        current_usage_count: 0,
        status: 'active',
        is_active: true
      };
      memDB.vouchers.unshift(newVch);
      await syncDB();
      return [200, { voucher: newVch }];
    }
    if (method === 'put' && matches('/vouchers/')) {
      const id = url.split('/').pop();
      const idx = memDB.vouchers.findIndex((i: any) => i.id === id);
      if (idx !== -1) {
        memDB.vouchers[idx] = { ...memDB.vouchers[idx], ...data };
        await syncDB();
        return [200, { voucher: memDB.vouchers[idx] }];
      }
    }
    if (method === 'delete' && matches('/vouchers/')) {
      const id = url.split('/').pop();
      memDB.vouchers = memDB.vouchers.filter((i: any) => i.id !== id);
      await syncDB();
      return [200, { message: 'Deleted' }];
    }
  }

  // --- Dashboard & More ---
  if (matches('/users/balance')) return [200, { balance: memDB.users[0].balance, virtual_balance: memDB.users[0].virtual_balance }];
  if (matches('/users/transactions')) return [200, { transactions: memDB.transactions }];
  if (matches('/notifications/unread-count')) return [200, { count: memDB.unreadNotifications }];
  if (matches('/notifications')) return [200, { notifications: [
    { id: 'n1', title: 'Transaction Successful', message: 'You have successfully purchased an item.', type: 'info', read: false, created_at: new Date().toISOString(), priority: 'medium' }
  ], count: 1 }];

  // Recommendations
  if (matches('/recommendations/spending')) return [200, { recommendations: [
    { title: 'Save on Coffee', description: 'Consider bulk buying to save coins.', confidence: 0.85, actionType: 'product', actionId: 'p1' }
  ]}];
  if (matches('/recommendations/investing')) return [200, { recommendations: [] }];
  if (matches('/suggestions/items')) return [200, { suggestions: memDB.products.slice(0, 3).map((p: any) => ({
    productId: p.id, productName: p.name, productPrice: p.price, reason: 'Recommended based on history', confidence: 0.9
  })) }];

  // Stocks
  if (matches('/stocks')) return [200, { stocks: [
    { id: 's1', symbol: 'SMT', name: 'SMart Coin', current_price: 150.50, price_change_percent: 5.23, is_active: true },
    { id: 's2', symbol: 'GME', name: 'Game Token', current_price: 12.35, price_change_percent: -1.52, is_active: true }
  ] }];

  // Generic Search/Auth
  if (matches('/auth/login')) return [200, { token: 'mock-token', user: memDB.users[0] }];
  if (matches('/admin/users')) return [200, { users: memDB.users, count: memDB.users.length }];
  if (matches('/admin/stats')) return [200, { totalUsers: 1542, totalSales: 2450000, activeTasks: 45, pendingVouchers: 12 }];

  return [200, { success: true, message: 'Action completed (Persistent Mock Mode)' }];
});

export default api;
