import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../common/Color';
import { AppStrings } from '../../common/String';
import { Endpoints } from '../../common/Url';
import { _callAPI } from '../../common/Util';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const userName = useSelector((state) => state.user.userName);
  const isDarkTheme = useSelector((state) => state.user.isDarkTheme);
  const userRole = useSelector((state) => state.user.userRole);

  const [loading, setLoading] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  // Quick action cards for the internship portal
  const quickActions = [
    {
      title: AppStrings.BROWSE_INTERNSHIPS,
      icon: 'briefcase-search-outline',
      color: Colors.primary,
      onPress: () => { },
    },
    {
      title: AppStrings.APPLICATION_STATUS,
      icon: 'clipboard-check-outline',
      color: Colors.accent,
      onPress: () => { },
    },
    {
      title: AppStrings.ELIGIBILITY_CHECK,
      icon: 'shield-check-outline',
      color: Colors.secondary,
      onPress: () => { },
    },
    {
      title: AppStrings.SCHEME_GUIDELINES,
      icon: 'file-document-outline',
      color: Colors.info,
      onPress: () => { },
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.statusBar}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <CustomButton
          title="☰"
          onPress={openDrawer}
          type="outline"
          style={styles.menuButton}
          textStyle={styles.menuButtonText}
        />
        <Text style={styles.headerTitle}>{AppStrings.DASHBOARD}</Text>
        <View style={styles.menuButton} />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          {AppStrings.WELCOME}, {userName || 'User'}! 🇮🇳
        </Text>
        <Text style={styles.roleTag}>
          {userRole === 'employer' ? AppStrings.EMPLOYER_DASHBOARD : AppStrings.MY_APPLICATIONS}
        </Text>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.gridContainer}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionCard}
            onPress={action.onPress}
            activeOpacity={0.7}>
            <View style={[styles.iconCircle, { backgroundColor: action.color + '15' }]}>
              <Icon name={action.icon} size={28} color={action.color} />
            </View>
            <Text style={styles.actionTitle} numberOfLines={2}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stipend Info Banner */}
      <View style={styles.stipendBanner}>
        <Icon name="currency-inr" size={20} color={Colors.accent} />
        <Text style={styles.stipendText}>{AppStrings.STIPEND_DETAILS}</Text>
        <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
      </View>

      <CustomLoader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 0,
    borderColor: Colors.white + '40',
  },
  menuButtonText: {
    fontSize: 20,
    color: Colors.white,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  roleTag: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  stipendBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  stipendText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
});

export default DashboardScreen;
