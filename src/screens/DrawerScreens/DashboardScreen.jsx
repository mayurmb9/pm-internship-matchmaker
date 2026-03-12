import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { Route_Strings } from '../../common/Routes';
import CustomLoader from '../../components/CustomLoader';
import { getRecommendations } from '../../logic/RecommendationEngine';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const {
    userName,
    isDarkTheme,
    locale,
    skills = [],
    location = '',
    interests = []
  } = user;

  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      const topPicks = await getRecommendations({ skills, location, interests });
      setRecommendations(topPicks);
      setLoading(false);
    };
    fetchRecs();
  }, [skills, location, interests]);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const renderRecommendationCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.recommendationCard, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}
      onPress={() => navigation.navigate(Route_Strings.INTERNSHIP_DETAILS, { internship: item })}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{Math.round(item.matchScore)}% {locale === 'hi' ? 'मैच' : 'Match'}</Text>
        </View>
        <Text style={[styles.stipendText, { color: Colors.secondary }]}>{item.stipend}</Text>
      </View>

      <Text style={[styles.internshipTitle, { color: Colors.primary }]}>{item.title}</Text>
      <Text style={[styles.orgName, { color: Colors.textSecondary }]}>{item.organization}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.footerItem}>
          <Icon name="map-marker" size={14} color={Colors.primary} />
          <Text style={[styles.footerText, { color: Colors.textSecondary }]}>{item.location}</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon name="clock-o" size={14} color={Colors.primary} />
          <Text style={[styles.footerText, { color: Colors.textSecondary }]}>{item.duration || "3 Months"}</Text>
        </View>
      </View>

      <View style={[styles.applyButton, { backgroundColor: Colors.primary }]}>
        <Text style={[styles.applyButtonText, { color: Colors.white }]}>
          {locale === 'hi' ? 'विवरण देखें' : 'VIEW DETAILS'}
        </Text>
        <Icon name="arrow-right" size={14} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="light-content"
      />

      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
          <Icon name="bars" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>{Strings.APP_NAME}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="bell-o" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeSection, { backgroundColor: Colors.primary }]}>
          <Text style={[styles.welcomeText, { color: Colors.white }]}>
            {Strings.WELCOME}, {userName || 'Yuva'}! 🇮🇳
          </Text>
          <Text style={[styles.subWelcomeText, { color: 'rgba(255,255,255,0.85)' }]}>
            {location
              ? (locale === 'hi' ? `${location} में आपके लिए बेहतरीन अवसर।` : `Helping you find the best opportunities in ${location}.`)
              : (locale === 'hi' ? 'व्यक्तिगत अनुशंसाएं प्राप्त करने के लिए अपनी प्रोफ़ाइल पूरी करें!' : 'Complete your profile to get personalized recommendations!')}
          </Text>
        </View>

        {(!skills.length || !location) ? (
          <TouchableOpacity
            style={[styles.completionCard, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}
            onPress={() => navigation.navigate(Route_Strings.PROFILE_UPDATE)}
          >
            <View style={[styles.completionIcon, { backgroundColor: Colors.secondary }]}>
              <Icon name="graduation-cap" size={24} color={Colors.white} />
            </View>
            <View style={styles.completionTextContainer}>
              <Text style={[styles.completionTitle, { color: Colors.primary }]}>
                {locale === 'hi' ? 'अपनी जानकारी भरें' : 'Fill your details'}
              </Text>
              <Text style={[styles.completionSubtitle, { color: Colors.textSecondary }]}>
                {locale === 'hi' ? '5,000+ कंपनियों से मेल खाने में हमारी मदद करें।' : 'Help us match you with 5,000+ top companies.'}
              </Text>
            </View>
            <Icon name="angle-right" size={20} color={Colors.primary} />
          </TouchableOpacity>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: Colors.primary }]}>
            {locale === 'hi' ? 'शीर्ष 3-5 सुझाव' : 'Top 3-5 Suggestions'}
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: Colors.secondary }]}>
              {locale === 'hi' ? 'सभी देखें' : 'View All'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recommendations}
          renderItem={renderRecommendationCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />

        <View style={[styles.helpBanner, { backgroundColor: isDarkTheme ? Colors.surface : '#FFF4E5', borderColor: isDarkTheme ? Colors.divider : '#FFE0B2' }]}>
          <View style={[styles.helpIconCircle, { backgroundColor: Colors.surface }]}>
            <Icon name="question-circle" size={30} color={Colors.primary} />
          </View>
          <View style={styles.helpTextContainer}>
            <Text style={[styles.helpTitle, { color: Colors.primary }]}>
              {locale === 'hi' ? 'आधार में सहायता चाहिए?' : 'Need help with Aadhaar?'}
            </Text>
            <Text style={[styles.helpSubtitle, { color: Colors.textSecondary }]}>
              {locale === 'hi' ? 'अपने नजदीकी कॉमन सर्विस सेंटर (CSC) पर जाएं।' : 'Visit your nearest Common Service Centre (CSC).'}
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <CustomLoader visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, elevation: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  iconButton: { padding: 8 },
  welcomeSection: { padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  welcomeText: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subWelcomeText: { fontSize: 15, lineHeight: 22 },
  completionCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: -20, padding: 20, borderRadius: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, borderWidth: 1, gap: 15 },
  completionIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  completionTextContainer: { flex: 1 },
  completionTitle: { fontSize: 16, fontWeight: 'bold' },
  completionSubtitle: { fontSize: 12, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  viewAllText: { fontWeight: '700', fontSize: 16 },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  recommendationCard: { borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  matchBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#C8E6C9' },
  matchText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 12 },
  stipendText: { fontSize: 18, fontWeight: '800' },
  internshipTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  orgName: { fontSize: 15, marginBottom: 15, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { fontSize: 14 },
  applyButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderRadius: 12, gap: 10 },
  applyButtonText: { fontWeight: 'bold', letterSpacing: 1 },
  helpBanner: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 10, padding: 20, borderRadius: 20, borderWidth: 1 },
  helpIconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  helpTextContainer: { marginLeft: 15, flex: 1 },
  helpTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  helpSubtitle: { fontSize: 14, lineHeight: 18 },
});

export default DashboardScreen;
