import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../common/Color';
import { AppStrings } from '../../common/String';
import mockInternships from '../../data/mockInternships.json';

const InternshipCard = ({ item }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.8}>
    <View style={styles.cardHeader}>
      <View style={styles.iconContainer}>
        <Icon name="office-building" size={24} color={Colors.primary} />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.positionText}>{item.position}</Text>
        <Text style={styles.companyText}>{item.company}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="bookmark-outline" size={24} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>

    <View style={styles.divider} />

    <View style={styles.detailsContainer}>
      <View style={styles.detailItem}>
        <Icon name="map-marker-outline" size={16} color={Colors.textSecondary} />
        <Text style={styles.detailText}>{item.location}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="currency-inr" size={16} color={Colors.textSecondary} />
        <Text style={styles.detailText}>{item.stipend}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="clock-outline" size={16} color={Colors.textSecondary} />
        <Text style={styles.detailText}>{item.duration}</Text>
      </View>
    </View>

    <View style={styles.skillsContainer}>
      {item.skills.map((skill, index) => (
        <View key={index} style={styles.skillTag}>
          <Text style={styles.skillText}>{skill}</Text>
        </View>
      ))}
    </View>

    <TouchableOpacity style={styles.applyButton}>
      <Text style={styles.applyButtonText}>Apply Now</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const InternshipListScreen = () => {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    return mockInternships.filter(
      (item) =>
        item.position.toLowerCase().includes(search.toLowerCase()) ||
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content" />

      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Icon name="magnify" size={20} color={Colors.textSecondary} />
          <TextInput
            placeholder="Search roles, companies, skills..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.textSecondary}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close-circle" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="tune" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InternshipCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Icon name="database-off" size={60} color={Colors.textSecondary + '40'} />
            <Text style={styles.emptyText}>No matching internships found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    padding: 0,
  },
  filterButton: {
    width: 46,
    height: 46,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  positionText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  companyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  skillText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyView: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

export default InternshipListScreen;
