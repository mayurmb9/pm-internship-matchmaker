import { DrawerContentScrollView } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../../common/Color';
import { Route_Strings } from '../../common/Routes';
import { getStrings } from '../../common/String';
import CustomDialog from '../../components/CustomDialog';
import { resetUser } from '../../Redux/UserSlice';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userName, userEmail, userProfileImage, userRole, isDarkTheme, locale } = user;

  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [logoutDialogVisible, setLogoutDialogVisible] = React.useState(false);

  const handleLogout = () => {
    setLogoutDialogVisible(true);
  };

  const confirmLogout = () => {
    setLogoutDialogVisible(false);
    dispatch(resetUser());
  };

  const activeIndex = props.state.index;
  const activeRoute = props.state.routes[activeIndex];
  const activeRouteName = getFocusedRouteNameFromRoute(activeRoute) ?? activeRoute.name;

  const drawerItems = [
    { label: Strings.DASHBOARD, icon: 'dashboard', screen: Route_Strings.DASHBOARD },
    { label: Strings.BROWSE_INTERNSHIPS, icon: 'search', screen: Route_Strings.INTERNSHIP_LIST },
    { label: Strings.APPLICATION_STATUS, icon: 'check-square-o', screen: Route_Strings.APPLICATION_STATUS },
    { label: Strings.AI_CAREER_COACH, icon: 'robot', screen: Route_Strings.AI_CAREER_COACH },
    { label: Strings.MENTORSHIP, icon: 'users', screen: Route_Strings.MENTORSHIP },
    { label: locale === 'hi' ? 'सफलता की कहानियां' : 'Success Stories', icon: 'star', screen: 'CaseStudies' },
    { label: Strings.PROFILE, icon: 'user', screen: Route_Strings.PROFILE },
    { label: Strings.SETTINGS, icon: 'cog', screen: Route_Strings.SETTINGS },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
      <View style={[styles.container, { backgroundColor: Colors.surface }]}>
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
          {/* Government-styled Profile Header */}
          <View style={[styles.profileSection, { backgroundColor: Colors.primary }]}>
            <View style={[styles.saffronBar, { backgroundColor: Colors.secondary }]} />
            <View style={styles.profileContent}>
              <TouchableOpacity
                style={styles.avatarContainer}
                onPress={() => props.navigation.navigate(Route_Strings.PROFILE_UPDATE)}
              >
                {userProfileImage ? (
                  <Image
                    source={{ uri: userProfileImage }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={[styles.avatarPlaceholder, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
                    <Icon name="user" size={40} color={Colors.white} />
                  </View>
                )}
                <View style={[styles.editBadge, { backgroundColor: Colors.secondary }]}>
                  <Icon name="pencil" size={10} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={[styles.userName, { color: Colors.white }]} numberOfLines={1}>
                {userName || 'User'}
              </Text>
              <Text style={[styles.userEmail, { color: 'rgba(255,255,255,0.8)' }]} numberOfLines={1}>
                {userEmail || 'user@pm-internship.gov.in'}
              </Text>
            </View>
            <View style={[styles.greenBar, { backgroundColor: Colors.accent }]} />
          </View>

          <View style={[styles.divider, { backgroundColor: Colors.divider }]} />

          {/* Drawer Items */}
          <View style={styles.menuSection}>
            {drawerItems.map((item, index) => {
              const isActive = activeRouteName === item.screen;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    isActive && { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(11, 61, 145, 0.1)' }
                  ]}
                  onPress={() => {
                    if (item.screen === Route_Strings.DASHBOARD || item.screen === Route_Strings.INTERNSHIP_LIST || item.screen === Route_Strings.APPLICATION_STATUS || item.screen === Route_Strings.PROFILE) {
                      props.navigation.navigate(Route_Strings.BOTTOM_TAB, {
                        screen: item.screen,
                      });
                    } else {
                      props.navigation.navigate(item.screen);
                    }
                  }}
                  activeOpacity={0.7}>
                  <Icon
                    name={item.icon}
                    size={18}
                    color={isActive ? (isDarkTheme ? Colors.secondary : Colors.primary) : Colors.textSecondary}
                    style={{ width: 25 }}
                  />
                  <Text style={[
                    styles.menuLabel,
                    { color: isActive ? (isDarkTheme ? Colors.secondary : Colors.primary) : Colors.text },
                    isActive && { fontWeight: '700' }
                  ]}>
                    {item.label}
                  </Text>
                  {isActive && <View style={[styles.activeIndicator, { backgroundColor: isDarkTheme ? Colors.secondary : Colors.primary }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </DrawerContentScrollView>

        {/* Logout Button */}
        <View style={styles.bottomSection}>
          <View style={[styles.divider, { backgroundColor: Colors.divider }]} />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}>
            <Icon name="sign-out" size={20} color="#D32F2F" />
            <Text style={[styles.logoutText, { color: '#D32F2F' }]}>{Strings.LOGOUT}</Text>
          </TouchableOpacity>
        </View>

        <CustomDialog
          visible={logoutDialogVisible}
          title={Strings.LOGOUT}
          message={Strings.CONFIRM_LOGOUT}
          type="confirm"
          confirmText={Strings.YES}
          cancelText={Strings.NO}
          onConfirm={confirmLogout}
          onCancel={() => setLogoutDialogVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  profileSection: {
  },
  saffronBar: {
    height: 4,
  },
  greenBar: {
    height: 4,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  menuSection: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
  },
  menuLabel: {
    fontSize: 14,
    marginLeft: 15,
    flex: 1,
  },
  activeIndicator: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 5,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 15,
  },
});

export default CustomDrawerContent;
