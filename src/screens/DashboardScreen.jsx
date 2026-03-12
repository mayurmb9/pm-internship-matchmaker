import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Color';

const {width} = Dimensions.get('window');

const DashboardScreen = ({navigation}) => {
  const [userName, setUserName] = useState('Intern');

  const stats = [
    {id: 1, label: 'Applications', value: '12', icon: 'file-document-outline', color: '#4F46E5'},
    {id: 2, label: 'Interviews', value: '4', icon: 'account-voice', color: '#10B981'},
    {id: 3, label: 'Active Tasks', value: '7', icon: 'clipboard-list-outline', color: '#F59E0B'},
    {id: 4, label: 'Resources', value: '25', icon: 'library-shelves', color: '#EC4899'},
  ];

  const recentInternships = [
    {
      id: '1',
      title: 'Policy Analysis Intern',
      department: 'Ministry of Home Affairs',
      duration: '3 Months',
      stipend: '₹15,000/mo',
      type: 'Full-time',
    },
    {
      id: '2',
      title: 'Digital Governance Intern',
      department: 'MeitY (Digital India)',
      duration: '6 Months',
      stipend: '₹20,000/mo',
      type: 'Remote',
    },
    {
      id: '3',
      title: 'Urban Planning Intern',
      department: 'MoHUA',
      duration: '2 Months',
      stipend: '₹12,000/mo',
      type: 'On-site',
    },
  ];

  const renderStatCard = ({item}) => (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, {backgroundColor: item.color + '20'}]}>
        <Icon name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header with Background Gradient */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[Colors.primary, '#1E40AF', '#3B82F6']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.headerGradient}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Jai Hind, {userName}!</Text>
              <Text style={styles.subGreeting}>Empowering Indian Governance</Text>
            </View>
            <TouchableOpacity style={styles.profileBadge}>
              <Icon name="bell-outline" size={24} color={Colors.white} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}>
        
        {/* Quick Stats Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>
        <FlatList
          data={stats}
          renderItem={renderStatCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.statRow}
        />

        {/* Featured Section */}
        <View style={styles.featureCard}>
          <LinearGradient
            colors={['#FF9933', '#F97316']}
            style={styles.featureGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Career Coach AI</Text>
              <Text style={styles.featureDesc}>Get personalized internship recommendations based on your profile.</Text>
              <TouchableOpacity style={styles.featureBtn}>
                <Text style={styles.featureBtnText}>Talk to Coach</Text>
              </TouchableOpacity>
            </View>
            <Icon name="robot" size={80} color="rgba(255,255,255,0.3)" style={styles.featureIcon} />
          </LinearGradient>
        </View>

        {/* Recent Internship Listings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Opportunities</Text>
          <TouchableOpacity onPress={() => navigation.navigate('InternshipListScreen')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentInternships.map((internship) => (
          <TouchableOpacity 
            key={internship.id} 
            style={styles.internshipCard}
            onPress={() => navigation.navigate('InternshipDetailsScreen', {internship})}>
            <View style={styles.internshipInfo}>
              <Text style={styles.internshipTitle}>{internship.title}</Text>
              <Text style={styles.internshipDept}>{internship.department}</Text>
              <View style={styles.badgeRow}>
                <View style={[styles.badge, {backgroundColor: '#DBEAFE'}]}>
                  <Text style={[styles.badgeText, {color: '#1E40AF'}]}>{internship.duration}</Text>
                </View>
                <View style={[styles.badge, {backgroundColor: '#DCFCE7'}]}>
                  <Text style={[styles.badgeText, {color: '#15803D'}]}>{internship.stipend}</Text>
                </View>
                <View style={[styles.badge, {backgroundColor: '#FEF3C7'}]}>
                  <Text style={[styles.badgeText, {color: '#B45309'}]}>{internship.type}</Text>
                </View>
              </View>
            </View>
            <View style={styles.nextIcon}>
              <Icon name="chevron-right" size={24} color={Colors.grey} />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Glassmorphism Navigation Hub (Simulated) */}
      <View style={styles.navHub}>
        {/* Placeholder for floating action buttons or quick links */}
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    height: 180,
    width: '100%',
  },
  headerGradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  profileBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  content: {
    flex: 1,
    marginTop: -30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  seeAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  statRow: {
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: Colors.white,
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  featureCard: {
    marginTop: 10,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.saffron,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  featureGradient: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureInfo: {
    flex: 1,
    zIndex: 1,
  },
  featureTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  featureBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  featureBtnText: {
    color: Colors.saffron,
    fontWeight: 'bold',
    fontSize: 12,
  },
  featureIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  internshipCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  internshipInfo: {
    flex: 1,
  },
  internshipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  internshipDept: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  nextIcon: {
    marginLeft: 10,
  },
});
