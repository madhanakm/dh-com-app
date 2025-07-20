import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import contexts
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { WishlistProvider } from './src/contexts/WishlistContext';
import { QuickCheckoutProvider } from './src/contexts/QuickCheckoutContext';
import { TranslationProvider } from './src/contexts/TranslationProvider';

// Import screens
import HomeScreen from './src/pages/HomeScreen';
import ProductsScreen from './src/pages/ProductsScreen';
import ProductDetailScreen from './src/pages/ProductDetailScreen';
import CartScreen from './src/pages/CartScreen';
import WishlistScreen from './src/pages/WishlistScreen';
import CheckoutScreen from './src/pages/CheckoutScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterScreen from './src/pages/RegisterScreen';
import AboutScreen from './src/pages/AboutScreen';
import ContactScreen from './src/pages/ContactScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider>
          <AuthProvider>
            <QuickCheckoutProvider>
              <CartProvider>
                <WishlistProvider>
                  <SafeAreaProvider>
                    <NavigationContainer>
                      <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Products" component={ProductsScreen} />
                        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                        <Stack.Screen name="Wishlist" component={WishlistScreen} />
                        <Stack.Screen name="Checkout" component={CheckoutScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="About" component={AboutScreen} />
                        <Stack.Screen name="Contact" component={ContactScreen} />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </SafeAreaProvider>
                </WishlistProvider>
              </CartProvider>
            </QuickCheckoutProvider>
          </AuthProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;