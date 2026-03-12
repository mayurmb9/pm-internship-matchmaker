import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { 
  setIsDarkTheme, 
  setNotificationEnable, 
  setLocale, 
  resetUser 
} from '../../Redux/UserSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const { isDarkTheme, locale, isNotificationEnable, aadhaarVerified } = user;
  
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const toggleTheme = () => dispatch(setIsDarkTheme(!isDarkTheme));
  const toggleNotifications = () => dispatch(setNotificationEnable(!isNotificationEnable));
  
  const changeLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    dispatch(setLocale(newLocale));
  };

  const handleLogout = () => {
    dispatch(resetUser());
  };

  const SettingRow = ({ icon, label, value, onValueChange, type = 'switch', onPress }) => (
    <View style={[styles.settingRow, { borderBottomColor: Colors.divider }]}>
      <View style={styles.settingInfo}>
        <View style={[styles.iconContainer, { backgroundColor: isDarkTheme ? Colors.surface : '#F0F4F8' }]}>
          <Icon name={icon} size={18} color={Colors.primary} />
        </View>
        <Text style={[styles.settingLabel, { color: Colors.primary }]}>{label}</Text>
      </View>
      
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#CBD5E1', true: Colors.secondary }}
          thumbColor={Colors.white}
        />
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.valueContainer}>
          <Text style={[styles.valueText, { color: Colors.textSecondary }]}>{value}</Text>
          <Icon name="chevron-right" size={12} color={Colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>{Strings.SETTINGS}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: Colors.textSecondary }]}>
          {locale === 'hi' ? 'प्राथमिकताएं' : 'Preferences'}
        </Text>
        <View style={[styles.section, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <SettingRow
            icon="moon-o"
            label={locale === 'hi' ? 'डार्क मोड' : 'Dark Mode'}
            value={isDarkTheme}
            onValueChange={toggleTheme}
          />
          <SettingRow
            icon="bell-o"
            label={Strings.NOTIFICATIONS}
            value={isNotificationEnable}
            onValueChange={toggleNotifications}
          />
          <SettingRow
            icon="language"
            label={locale === 'hi' ? 'ऐप की भाषा' : 'App Language'}
            value={locale === 'en' ? 'English' : 'हिंदी'}
            type="button"
            onPress={changeLanguage}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: Colors.textSecondary }]}>
          {locale === 'hi' ? 'खाता और गोपनीयता' : 'Account & Privacy'}
        </Text>
        <View style={[styles.section, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <SettingRow
            icon="shield"
            label={locale === 'hi' ? 'आधार सत्यापन' : 'Aadhaar Verification'}
            value={aadhaarVerified ? (locale === 'hi' ? 'सत्यापित' : 'Verified') : (locale === 'hi' ? 'लंबित' : 'Pending')}
            type="button"
            onPress={() => {}}
          />
          <SettingRow
            icon="lock"
            label={locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            value=""
            type="button"
            onPress={() => {}}
          />
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: isDarkTheme ? 'rgba(211, 47, 47, 0.1)' : '#FFEBEE', borderColor: 'rgba(211, 47, 47, 0.3)' }]} 
          onPress={handleLogout}
        >
          <Icon name="sign-out" size={18} color="#D32F2F" />
          <Text style={styles.logoutText}>{Strings.LOGOUT}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.versionText, { color: Colors.textSecondary }]}>PM Internship Scheme v1.2.5</Text>
          <Text style={[styles.footerSubtext, { color: Colors.grey }]}>Digital India Initiative</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    borderRadius: 15,
    paddingVertical: 5,
    marginBottom: 25,
    elevation: 2,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    gap: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 11,
    marginTop: 4,
  },
});

export default SettingsScreen;
