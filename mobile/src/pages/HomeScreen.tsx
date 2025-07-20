import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../contexts/TranslationProvider';

const HomeScreen = () => {
  const { translate, language } = useTranslation();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTamil = language === 'ta';

  // States for different product sections
  const [categories, setCategories] = useState([]);
  const [dealsOfDay, setDealsOfDay] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [hotSellingProducts, setHotSellingProducts] = useState([]);
  const [popularChoices, setPopularChoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for categories
  const mockCategories = [
    { id: 1, name: 'Herbal Powders', tamil: 'மூலிகை பொடிகள்', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Herbal Oils', tamil: 'மூலிகை எண்ணெய்கள்', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Herbal Soaps', tamil: 'மூலிகை சோப்புகள்', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Herbal Teas', tamil: 'மூலிகை தேநீர்', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Herbal Supplements', tamil: 'மூலிகை சப்ளிமெண்ட்ஸ்', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Ayurvedic Products', tamil: 'ஆயுர்வேத பொருட்கள்', image: 'https://via.placeholder.com/150' },
  ];

  // Mock data for product sections
  const mockProducts = [
    { id: 1, name: 'Neem Powder', tamil: 'வேப்பிலை பொடி', price: 250, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Tulsi Oil', tamil: 'துளசி எண்ணெய்', price: 350, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Herbal Soap', tamil: 'மூலிகை சோப்பு', price: 120, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Herbal Tea', tamil: 'மூலிகை தேநீர்', price: 180, image: 'https://via.placeholder.com/150' },
  ];

  // Load data
  useEffect(() => {
    // In a real app, you would fetch these from an API
    // For now, using mock data with a simulated delay
    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCategories(mockCategories);
        setDealsOfDay(mockProducts.map(p => ({...p, discount: '20% OFF'})));
        setTrendingProducts(mockProducts.map(p => ({...p, badge: 'Trending'})));
        setHotSellingProducts(mockProducts.map(p => ({...p, badge: 'Hot'})));
        setPopularChoices(mockProducts.map(p => ({...p, badge: 'Popular'})));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'வகைகள்' : 'Categories'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Products', { categoryId: category.id })}
              >
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>
                  {isTamil ? category.tamil : category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Deals of the Day */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'இன்றைய சலுகைகள்' : 'Deals of the Day'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsContainer}>
            {dealsOfDay.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={styles.horizontalProductCard}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
                <Image source={{ uri: product.image }} style={styles.horizontalProductImage} />
                <Text style={styles.productName}>
                  {isTamil ? product.tamil : product.name}
                </Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Products */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'டிரெண்டிங் பொருட்கள்' : 'Trending Products'}
          </Text>
          <View style={styles.productsGrid}>
            {trendingProducts.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={[styles.productCard, { width: (width - 48) / 2 }]}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                {product.badge && (
                  <View style={[styles.badgeContainer, {backgroundColor: '#3b82f6'}]}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>
                  {isTamil ? product.tamil : product.name}
                </Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hot Selling Products */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'அதிகம் விற்பனையாகும் பொருட்கள்' : 'Hot Selling Products'}
          </Text>
          <View style={styles.productsGrid}>
            {hotSellingProducts.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={[styles.productCard, { width: (width - 48) / 2 }]}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                {product.badge && (
                  <View style={[styles.badgeContainer, {backgroundColor: '#ef4444'}]}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>
                  {isTamil ? product.tamil : product.name}
                </Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Choices */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'பிரபலமான தேர்வுகள்' : 'Popular Choices'}
          </Text>
          <View style={styles.productsGrid}>
            {popularChoices.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={[styles.productCard, { width: (width - 48) / 2 }]}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                {product.badge && (
                  <View style={[styles.badgeContainer, {backgroundColor: '#10b981'}]}>
                    <Text style={styles.badgeText}>{product.badge}</Text>
                  </View>
                )}
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>
                  {isTamil ? product.tamil : product.name}
                </Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4b5563',
  },
  sectionContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryCard: {
    marginRight: 16,
    alignItems: 'center',
    width: 100,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 14,
    color: '#374151',
  },
  productsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  horizontalProductCard: {
    marginRight: 16,
    width: 150,
    position: 'relative',
  },
  horizontalProductImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#111827',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

export default HomeScreen;