import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../common/Color';
import {AppStrings} from '../../common/String';
import {resetUser} from '../../Redux/UserSlice';
import CustomDialog from '../../components/CustomDialog';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const userEmail = useSelector((state) => state.user.userEmail);
  const userProfileImage = useSelector((state) => state.user.userProfileImage);
  const userRole = useSelector((state) => state.user.userRole);

  const [logoutDialogVisible, setLogoutDialogVisible] = React.useState(false);

  const handleLogout = () => {
    setLogoutDialogVisible(true);
  };

  const confirmLogout = () => {
    setLogoutDialogVisible(false);
    dispatch(resetUser());
    // Navigation is handled automatically by AppNavigator
    // since isUserLoggedIn changed to false
  };

  const drawerItems = [
    {label: AppStrings.DASHBOARD, icon: 'view-dashboard-outline', screen: 'BottomTabNavigator'},
    {label: AppStrings.BROWSE_INTERNSHIPS, icon: 'briefcase-search-outline', screen: 'InternshipListScreen'},
    {label: AppStrings.APPLICATION_STATUS, icon: 'clipboard-check-outline', screen: 'ApplicationStatusScreen'},
    {label: AppStrings.PROFILE, icon: 'account-outline', screen: 'ProfileScreen'},
    {label: AppStrings.SETTINGS, icon: 'cog-outline', screen: 'SettingsScreen'},
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Government-styled Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.saffronBar} />
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              {userProfileImage ? (
                <Image
                  source={{uri: userProfileImage}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Icon name="account" size={40} color={Colors.white} />
                </View>
              )}
            </View>
            <Text style={styles.userName} numberOfLines={1}>
              {userName || 'User'}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {userEmail || 'user@example.com'}
            </Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {userRole === 'employer' ? 'Employer' : userRole === 'admin' ? 'Admin' : 'Candidate'}
              </Text>
            </View>
          </View>
          <View style={styles.greenBar} />
        </View>

        <View style={styles.divider} />

        {/* Drawer Items */}
        <View style={styles.menuSection}>
          {drawerItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                try {
                  props.navigation.navigate(item.screen);
                } catch (e) {
                  console.log('Screen not available:', item.screen);
                }
              }}
              activeOpacity={0.7}>
              <Icon
                name={item.icon}
                size={22}
                color={Colors.textSecondary}
              />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Logout Button at Bottom */}
      <View style={styles.bottomSection}>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <Icon name="logout" size={22} color={Colors.error} />
          <Text style={styles.logoutText}>{AppStrings.LOGOUT}</Text>
        </TouchableOpacity>
      </View>

      <CustomDialog
        visible={logoutDialogVisible}
        title={AppStrings.LOGOUT}
        message={AppStrings.CONFIRM_LOGOUT}
        type="confirm"
        confirmText={AppStrings.YES}
        cancelText={AppStrings.NO}
        onConfirm={confirmLogout}
        onCancel={() => setLogoutDialogVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingTop: 0,
  },
  profileSection: {
    backgroundColor: Colors.primary,
  },
  saffronBar: {
    height: 4,
    backgroundColor: Colors.secondary,
  },
  greenBar: {
    height: 4,
    backgroundColor: Colors.accent,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 16,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 16,
  },
});

export default CustomDrawerContent;
