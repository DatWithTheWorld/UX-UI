import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Auth screens
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// Main screens
import DashboardScreen from '../screens/main/DashboardScreen';
import MarketplaceScreen from '../screens/main/MarketplaceScreen';
import TasksScreen from '../screens/main/TasksScreen';
import StocksScreen from '../screens/main/StocksScreen';
import GamesScreen from '../screens/main/GamesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import NotificationPreferencesScreen from '../screens/main/NotificationPreferencesScreen';
import ExpenseManagementScreen from '../screens/main/ExpenseManagementScreen';
import ChatScreen from '../screens/main/ChatScreen';
import SocialScreen from '../screens/main/SocialScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import MoreScreen from '../screens/main/MoreScreen';

// Admin screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProductsScreen from '../screens/admin/AdminProductsScreen';
import AdminTasksScreen from '../screens/admin/AdminTasksScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminGameBuilderScreen from '../screens/admin/AdminGameBuilderScreen';
import VoucherManagementScreen from '../screens/admin/VoucherManagementScreen';

// Vendor screens
import VendorProductsScreen from '../screens/vendor/VendorProductsScreen';

// Detail screens
import ProductDetailScreen from '../screens/detail/ProductDetailScreen';
import StockDetailScreen from '../screens/detail/StockDetailScreen';
import PortfolioScreen from '../screens/detail/PortfolioScreen';
import TransactionsScreen from '../screens/detail/TransactionsScreen';
import PurchaseHistoryScreen from '../screens/detail/PurchaseHistoryScreen';
import ShoppingCartScreen from '../screens/detail/ShoppingCartScreen';
import TicTacToeScreen from '../screens/detail/TicTacToeScreen';
import QuizGameScreen from '../screens/detail/QuizGameScreen';
import VendorShopScreen from '../screens/detail/VendorShopScreen';
import BlockchainScreen from '../screens/detail/BlockchainScreen';

import { useAuth } from '../context/AuthContext';
import NotificationToastWrapper from '../components/NotificationToastWrapper';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Main tab navigator for authenticated users
 */
function MainTabs({ userRole }: { userRole: string }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Stocks') {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Games') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'sparkles' : 'sparkles-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'apps' : 'apps-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 15,
          paddingTop: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Stocks" component={StocksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{ tabBarLabel: 'More' }}
      />
    </Tab.Navigator>
  );
}

/**
 * Admin tab navigator
 */
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'AdminDashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'GameBuilder') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Vouchers') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF3B30',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Products" component={AdminProductsScreen} />
      <Tab.Screen name="Vouchers" component={VoucherManagementScreen} />
      <Tab.Screen name="Tasks" component={AdminTasksScreen} />
      <Tab.Screen name="Users" component={AdminUsersScreen} />
      <Tab.Screen name="GameBuilder" component={AdminGameBuilderScreen} />
    </Tab.Navigator>
  );
}

/**
 * Vendor tab navigator
 */
function VendorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyProducts') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Vouchers') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF9500',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="MyProducts" component={VendorProductsScreen} />
      <Tab.Screen name="Vouchers" component={VoucherManagementScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Main app navigator
 * Handles authentication flow and main app navigation
 */
export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Show loading screen
  }

  return (
    <NavigationContainer>
      {user && <NotificationToastWrapper />}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      >
        {!user ? (
          // Auth stack
          <>
            <Stack.Screen 
              name="RoleSelection" 
              component= {RoleSelectionScreen}
            />
          </>
        ) : user.role === 'admin' ? (
          // Admin stack
          <>
            <Stack.Screen 
              name="AdminMain" 
              component={AdminTabs}
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
            />
            <Stack.Screen 
              name="StockDetail" 
              component={StockDetailScreen}
            />
            <Stack.Screen 
              name="Portfolio" 
              component={PortfolioScreen}
            />
            <Stack.Screen 
              name="Transactions" 
              component={TransactionsScreen}
            />
            <Stack.Screen 
              name="Blockchain" 
              component={BlockchainScreen}
            />
            <Stack.Screen 
              name="ExpenseManagement" 
              component={ExpenseManagementScreen}
            />
            <Stack.Screen 
              name="PurchaseHistory" 
              component={PurchaseHistoryScreen}
            />
            <Stack.Screen 
              name="ShoppingCart" 
              component={ShoppingCartScreen}
            />
            <Stack.Screen 
              name="TicTacToe" 
              component={TicTacToeScreen}
            />
            <Stack.Screen 
              name="QuizGame" 
              component={QuizGameScreen}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
            />
            <Stack.Screen 
              name="NotificationPreferences" 
              component={NotificationPreferencesScreen}
            />
            <Stack.Screen 
              name="VendorShop" 
              component={VendorShopScreen}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
            />
          </>
        ) : user.role === 'vendor' ? (
          // Vendor stack
          <>
            <Stack.Screen 
              name="VendorMain" 
              component={VendorTabs}
            />
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
            />
            <Stack.Screen 
              name="Transactions" 
              component={TransactionsScreen}
            />
            <Stack.Screen 
              name="Blockchain" 
              component={BlockchainScreen}
            />
            <Stack.Screen 
              name="ExpenseManagement" 
              component={ExpenseManagementScreen}
            />
            <Stack.Screen 
              name="PurchaseHistory" 
              component={PurchaseHistoryScreen}
            />
            <Stack.Screen 
              name="ShoppingCart" 
              component={ShoppingCartScreen}
            />
            <Stack.Screen 
              name="TicTacToe" 
              component={TicTacToeScreen}
            />
            <Stack.Screen 
              name="QuizGame" 
              component={QuizGameScreen}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
            />
            <Stack.Screen 
              name="NotificationPreferences" 
              component={NotificationPreferencesScreen}
            />
            <Stack.Screen 
              name="VendorShop" 
              component={VendorShopScreen}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
            />
            <Stack.Screen 
              name="Social" 
              component={SocialScreen}
            />
          </>
        ) : (
          // User stack
          <>
            <Stack.Screen 
              name="Main"
            >
              {() => <MainTabs userRole={user.role} />}
            </Stack.Screen>
            <Stack.Screen 
              name="ProductDetail" 
              component={ProductDetailScreen}
            />
            <Stack.Screen 
              name="StockDetail" 
              component={StockDetailScreen}
            />
            <Stack.Screen 
              name="Portfolio" 
              component={PortfolioScreen}
            />
            <Stack.Screen 
              name="Transactions" 
              component={TransactionsScreen}
            />
            <Stack.Screen 
              name="Blockchain" 
              component={BlockchainScreen}
            />
            <Stack.Screen 
              name="ExpenseManagement" 
              component={ExpenseManagementScreen}
            />
            <Stack.Screen 
              name="PurchaseHistory" 
              component={PurchaseHistoryScreen}
            />
            <Stack.Screen 
              name="ShoppingCart" 
              component={ShoppingCartScreen}
            />
            <Stack.Screen 
              name="TicTacToe" 
              component={TicTacToeScreen}
            />
            <Stack.Screen 
              name="QuizGame" 
              component={QuizGameScreen}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
            />
            <Stack.Screen 
              name="NotificationPreferences" 
              component={NotificationPreferencesScreen}
            />
            <Stack.Screen 
              name="VendorShop" 
              component={VendorShopScreen}
            />
            <Stack.Screen 
              name="Chat" 
              component={ChatScreen}
            />
            <Stack.Screen 
              name="Social" 
              component={SocialScreen}
            />
            <Stack.Screen 
              name="Messages" 
              component={MessagesScreen}
            />
            <Stack.Screen 
              name="Games" 
              component={GamesScreen}
            />
            <Stack.Screen 
              name="Tasks" 
              component={TasksScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

