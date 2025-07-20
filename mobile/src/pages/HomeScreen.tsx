import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../contexts/TranslationProvider';

const HomeScreen = () => {
  const { translate, language } = useTranslation();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isTamil = language === 'ta';

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Herbal Powders', tamil: 'மூலிகை பொடிகள்', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Herbal Oils', tamil: 'மூலிகை எண்ணெய்கள்', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Herbal Soaps', tamil: 'மூலிகை சோப்புகள்', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Herbal Teas', tamil: 'மூலிகை தேநீர்', image: 'https://via.placeholder.com/150' },
  ];

  // Mock data for featured products
  const featuredProducts = [
    { id: 1, name: 'Neem Powder', tamil: 'வேப்பிலை பொடி', price: 250, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Tulsi Oil', tamil: 'துளசி எண்ணெய்', price: 350, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Herbal Soap', tamil: 'மூலிகை சோப்பு', price: 120, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Herbal Tea', tamil: 'மூலிகை தேநீர்', price: 180, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/800x400' }}
            style={styles.heroBanner}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              {isTamil ? 'இயற்கை மூலிகைகள்' : 'Natural Herbals'}
            </Text>
            <Text style={styles.heroSubtitle}>
              {isTamil ? 'ஆரோக்கியமான வாழ்க்கைக்கு' : 'For a healthier life'}
            </Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => navigation.navigate('Products')}
            >
              <Text style={styles.heroButtonText}>
                {isTamil ? 'இப்போது ஷாப்பிங் செய்யுங்கள்' : 'Shop Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isTamil ? 'சிறப்பு தயாரிப்புகள்' : 'Featured Products'}
          </Text>
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={[styles.productCard, { width: (width - 48) / 2 }]}
                onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>
                  {isTamil ? product.tamil : product.name}
                </Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trust Indicators */}
        <View style={styles.trustContainer}>
          <View style={styles.trustItem}>
            <View style={styles.trustIconContainer}>
              <Text style={styles.trustIcon}>🌿</Text>
            </View>
            <Text style={styles.trustTitle}>
              {isTamil ? '100% இயற்கை' : '100% Natural'}
            </Text>
            <Text style={styles.trustText}>
              {isTamil ? 'தூய மூலிகை தயாரிப்புகள்' : 'Pure herbal products'}
            </Text>
          </View>
          
          <View style={styles.trustItem}>
            <View style={styles.trustIconContainer}>
              <Text style={styles.trustIcon}>🚚</Text>
            </View>
            <Text style={styles.trustTitle}>
              {isTamil ? 'இலவச டெலிவரி' : 'Free Delivery'}
            </Text>
            <Text style={styles.trustText}>
              {isTamil ? '₹5,000க்கு மேல்' : 'On orders above ₹5,000'}
            </Text>
          </View>
          
          <View style={styles.trustItem}>
            <View style={styles.trustIconContainer}>
              <Text style={styles.trustIcon}>🔒</Text>
            </View>
            <Text style={styles.trustTitle}>
              {isTamil ? 'பாதுகாப்பான பணம்' : 'Secure Payment'}
            </Text>
            <Text style={styles.trustText}>
              {isTamil ? 'பாதுகாப்பான' : 'Safe & encrypted'}
            </Text>
          </View>
          
          <View style={styles.trustItem}>
            <View style={styles.trustIconContainer}>
              <Text style={styles.trustIcon}>⭐</Text>
            </View>
            <Text style={styles.trustTitle}>
              {isTamil ? 'தரம் உறுதி' : 'Quality Assured'}
            </Text>
            <Text style={styles.trustText}>
              {isTamil ? 'ஆய்வக சோதனை' : 'Lab tested products'}
            </Text>
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
  heroContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  heroBanner: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  heroButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  trustContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#d1fae5',
  },
  trustItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  trustIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  trustIcon: {
    fontSize: 24,
  },
  trustTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#111827',
  },
  trustText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4b5563',
  },
});

export default HomeScreen;