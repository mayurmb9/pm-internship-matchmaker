import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../common/Color';
import { Route_Strings } from '../../common/Routes';
import { resetUser } from '../../Redux/UserSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const ProfileItem = ({ icon, label, value }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={18} color={Colors.navyBlue} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={Colors.navyBlue} barStyle="light-content" />
      
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(user.userName || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{user.userName || 'User'}</Text>
          <Text style={styles.userEmail}>{user.userEmail || 'user@pm-internship.gov.in'}</Text>
          
          <TouchableOpacity 
            style={styles.editBtn}
            onPress={() => navigation.navigate(Route_Strings.PROFILE_UPDATE)}
          >
            <Icon name="pencil" size={14} color={Colors.white} />
            <Text style={styles.editBtnText}>Edit Educational Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <ProfileItem 
            icon="user-o" 
            label="Full Name" 
            value={user.userName} 
          />
          <ProfileItem 
            icon="envelope-o" 
            label="Email" 
            value={user.userEmail} 
          />
          <ProfileItem 
            icon="phone" 
            label="Mobile" 
            value={user.userMobile || '+91 9876543210'} 
          />
          <ProfileItem 
            icon="map-marker" 
            label="Current Location" 
            value={user.location} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Identity</Text>
          <ProfileItem 
            icon="certificate" 
            label="Qualification" 
            value={user.qualification} 
          />
          <ProfileItem 
            icon="graduation-cap" 
            label="Institute/Course" 
            value={user.education} 
          />
          <ProfileItem 
            icon="calendar" 
            label="Passing Year" 
            value={user.passingYear} 
          />
          <ProfileItem 
            icon="id-card-o" 
            label="Aadhaar (Last 4)" 
            value={user.aadhaarLastFour ? `XXXX-XXXX-${user.aadhaarLastFour}` : null} 
          />
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => dispatch(resetUser())}
        >
          <Icon name="sign-out" size={20} color="#D32F2F" />
          <Text style={styles.logoutText}>Logout from Application</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.navyBlue,
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 8,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 20,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.saffron,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 10,
    elevation: 4,
  },
  editBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E1E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.navyBlue,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.saffron,
    paddingLeft: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: Colors.navyBlue,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
