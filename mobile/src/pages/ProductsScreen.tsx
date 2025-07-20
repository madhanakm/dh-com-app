import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '../contexts/TranslationProvider';
import Icon from 'react-native-vector-icons/Feather';

const ProductsScreen = () => {
  const { translate, language } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const isTamil = language === 'ta';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(route.params?.categoryId || null);
  
  // Mock categories
  const categories = [
    { id: null, name: 'All', tamil: 'அனைத்தும்' },
    { id: 1, name: 'Herbal Powders', tamil: 'மூலிகை பொடிகள்' },
    { id: 2, name: 'Herbal Oils', tamil: 'மூலிகை எண்ணெய்கள்' },
    { id: 3, name: 'Herbal Soaps', tamil: 'மூலிகை சோப்புகள்' },
    { id: 4, name: 'Herbal Teas', tamil: 'மூலிகை தேநீர்' },
  ];
  
  // Mock products data
  const mockProducts = [
    { id: 1, name: 'Neem Powder', tamil: 'வேப்பிலை பொடி', price: 250, image: 'https://via.placeholder.com/150', categoryId: 1 },
    { id: 2, name: 'Tulsi Oil', tamil: 'துளசி எண்ணெய்', price: 350, image: 'https://via.placeholder.com/150', categoryId: 2 },
    { id: 3, name: 'Herbal Soap', tamil: 'மூலிகை சோப்பு', price: 120, image: 'https://via.placeholder.com/150', categoryId: 3 },
    { id: 4, name: 'Herbal Tea', tamil: 'மூலிகை தேநீர்', price: 180, image: 'https://via.placeholder.com/150', categoryId: 4 },
    { id: 5, name: 'Amla Powder', tamil: 'நெல்லிக்காய் பொடி', price: 200, image: 'https://via.placeholder.com/150', categoryId: 1 },
    { id: 6, name: 'Coconut Oil', tamil: 'தேங்காய் எண்ணெய்', price: 300, image: 'https://via.placeholder.com/150', categoryId: 2 },
    { id: 7, name: 'Turmeric Soap', tamil: 'மஞ்சள் சோப்பு', price: 150, image: 'https://via.placeholder.com/150', categoryId: 3 },
    { id: 8, name: 'Ginger Tea', tamil: 'இஞ்சி தேநீர்', price: 220, image: 'https://via.placeholder.com/150', categoryId: 4 },
  ];
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      let filteredProducts = [...mockProducts];
      
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === selectedCategory);
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [selectedCategory]);
  
  const handleSearch = (text) => {
    setSearchQuery(text);
  };
  
  const filteredProducts = products.filter(product => {
    const productName = isTamil ? product.tamil.toLowerCase() : product.name.toLowerCase();
    return productName.includes(searchQuery.toLowerCase());
  });
  
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>
        {isTamil ? item.tamil : item.name}
      </Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={isTamil ? "தேடுங்கள்..." : "Search products..."}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      {/* Categories Filter */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id?.toString() || 'all'}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text 
                style={[
                  styles.categoryChipText,
                  selectedCategory === item.id && styles.selectedCategoryChipText
                ]}
              >
                {isTamil ? item.tamil : item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {isTamil ? "தயாரிப்புகள் எதுவும் கிடைக்கவில்லை" : "No products found"}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategoryChip: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  categoryChipText: {
    color: '#4b5563',
    fontSize: 14,
  },
  selectedCategoryChipText: {
    color: 'white',
    fontWeight: '500',
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default ProductsScreen;