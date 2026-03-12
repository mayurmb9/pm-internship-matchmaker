import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { Route_Strings } from '../../common/Routes';
import internshipsData from '../../data/internships.json';
import CustomDialog from '../../components/CustomDialog';

const InternshipListScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [comingSoonVisible, setComingSoonVisible] = useState(false);

  const filteredInternships = internshipsData.filter(item => {
    const search = searchQuery.toLowerCase();
    const title = item.title?.toLowerCase() ?? "";
    const org = item.organization?.toLowerCase() ?? "";
    const desc = item.description?.toLowerCase() ?? "";

    const matchesSearch = title.includes(search) || org.includes(search);
    
    let matchesSector = true;
    if (selectedSector !== "All") {
      const sectorLower = selectedSector.toLowerCase();
      matchesSector = title.includes(sectorLower) || 
                      desc.includes(sectorLower) || 
                      (item.interests && item.interests.some(i => i.toLowerCase().includes(sectorLower)));
    }

    return matchesSearch && matchesSector;
  });

  const renderInternshipCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}
      onPress={() => navigation.navigate(Route_Strings.INTERNSHIP_DETAILS, { internship: item })}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.logoPlaceholder, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#F0F4F8', borderColor: Colors.divider }]}>
          <Text style={[styles.logoText, { color: Colors.primary }]}>{item.organization.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: Colors.primary }]}>{item.title}</Text>
          <Text style={[styles.company, { color: Colors.textSecondary }]}>{item.organization}</Text>
        </View>
        <TouchableOpacity onPress={() => setComingSoonVisible(true)}>
          <Icon name="bookmark-o" size={20} color={Colors.grey} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Icon name="map-marker" size={14} color={Colors.primary} />
          <Text style={[styles.detailText, { color: Colors.textSecondary }]}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="money" size={14} color={Colors.primary} />
          <Text style={[styles.detailText, { color: Colors.textSecondary }]}>₹{item.stipend}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar" size={14} color={Colors.primary} />
          <Text style={[styles.detailText, { color: Colors.textSecondary }]}>{item.duration}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="bolt" size={14} color={Colors.primary} />
          <Text style={[styles.detailText, { color: Colors.textSecondary }]}>{locale === 'hi' ? 'सक्रिय' : 'Actively Hiring'}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.applyBtn, { backgroundColor: Colors.secondary }]}
        onPress={() => navigation.navigate(Route_Strings.INTERNSHIP_DETAILS, { internship: item })}
      >
        <Text style={[styles.applyText, { color: Colors.white }]}>
          {locale === 'hi' ? 'विवरण देखें' : 'View Details'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>
          {locale === 'hi' ? 'उपलब्ध इंटर्नशिप' : 'Available Internships'}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
        <Icon name="search" size={18} color={Colors.grey} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: Colors.text }]}
          placeholder={locale === 'hi' ? 'खोजें...' : 'Search by Title or Organization'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.grey}
        />
      </View>

      {/* Categories / Sectors */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['All', 'Finance', 'Engineering', 'Digital', 'Research', 'Social']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                { backgroundColor: Colors.surface, borderColor: Colors.divider },
                selectedSector === item && { backgroundColor: Colors.primary, borderColor: Colors.primary },
              ]}
              onPress={() => setSelectedSector(item)}>
              <Text style={[
                styles.chipText,
                { color: Colors.textSecondary },
                selectedSector === item && { color: Colors.white },
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: Colors.textSecondary }]}>
          {filteredInternships.length} {locale === 'hi' ? 'अवसर मिले' : 'Opportunities Found'}
        </Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setComingSoonVisible(true)}>
          <Icon name="sliders" size={16} color={Colors.primary} />
          <Text style={[styles.filterBtnText, { color: Colors.primary }]}>
            {locale === 'hi' ? 'फिल्टर' : 'Advanced Filters'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Internship List */}
      <FlatList
        data={filteredInternships}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderInternshipCard}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="search-plus" size={60} color={Colors.grey} />
            <Text style={[styles.emptyText, { color: Colors.textSecondary }]}>
              {locale === 'hi' ? 'कोई इंटर्नशिप नहीं मिली।' : 'No internships found matching your request.'}
            </Text>
          </View>
        }
      />

      <CustomDialog
        visible={comingSoonVisible}
        title={locale === 'hi' ? 'जल्द आ रहा है' : 'Coming Soon'}
        message={locale === 'hi' ? 'यह सुविधा अगले चरण में उपलब्ध होगी।' : 'This advanced feature is under development.'}
        type="alert"
        onConfirm={() => setComingSoonVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 50,
    elevation: 2,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  chipText: {
    fontWeight: '600',
    fontSize: 13,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterBtnText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  card: {
    borderRadius: 15,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  company: {
    fontSize: 13,
    fontWeight: '600',
  },
  cardDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: '40%',
  },
  detailText: {
    fontSize: 12,
    fontWeight: '500',
  },
  applyBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    paddingHorizontal: 40,
  },
});

export default InternshipListScreen;
