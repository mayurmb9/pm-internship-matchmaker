import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { Route_Strings } from '../../common/Routes';
import { setUserRole } from '../../Redux/UserSlice';

const RoleScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const handleRoleSelect = (role) => {
    dispatch(setUserRole(role));
    navigation.navigate(Route_Strings.LOGIN);
  };

  const RoleCard = ({ role, title, subtitle, icon }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}
      onPress={() => handleRoleSelect(role)}
      activeOpacity={0.8}>
      <View style={[styles.iconCircle, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.1)' : '#F0F4F8' }]}>
        <Icon name={icon} size={32} color={Colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: Colors.primary }]}>{title}</Text>
        <Text style={[styles.cardSubtitle, { color: Colors.textSecondary }]}>{subtitle}</Text>
      </View>
      <Icon name="chevron-right" size={16} color={Colors.grey} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: Colors.primary }]}>
            {locale === 'hi' ? 'अपनी भूमिका चुनें' : 'Select Your Role'}
          </Text>
          <Text style={[styles.subtitle, { color: Colors.textSecondary }]}>
            {locale === 'hi' ? 'पीएम इंटर्नशिप योजना में आपका स्वागत है' : 'Welcome to the PM Internship Scheme Portal'}
          </Text>
          <View style={[styles.stripe, { backgroundColor: Colors.secondary }]} />
        </View>

        <View style={styles.cardsContainer}>
          <RoleCard
            role="candidate"
            title={locale === 'hi' ? 'उम्मीदवार' : 'Internship Seeker'}
            subtitle={locale === 'hi' ? 'मैं इंटर्नशिप ढूंढ रहा हूं' : 'I am looking for an internship'}
            icon="user"
          />
          <RoleCard
            role="employer"
            title={locale === 'hi' ? 'नियोक्ता' : 'Company / Employer'}
            subtitle={locale === 'hi' ? 'मैं इंटर्न को काम पर रखना चाहता हूं' : 'I want to hire interns'}
            icon="building"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: Colors.textSecondary }]}>Government of India</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  stripe: {
    width: 80,
    height: 4,
    borderRadius: 2,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
  },
  footer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default RoleScreen;
