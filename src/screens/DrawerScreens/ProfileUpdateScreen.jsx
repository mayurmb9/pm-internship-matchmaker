import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { 
  updateUserProfile, 
  setUserName, 
  setUserEmail, 
  setUserMobile 
} from '../../Redux/UserSlice';
import { supabase } from '../../common/SupabaseConfig';
import CustomLoader from '../../components/CustomLoader';
import CustomDialog from '../../components/CustomDialog';

// Moved outside the component to prevent re-declaration/focus issues
const InputField = ({ label, value, onChangeText, placeholder, icon, keyboardType = 'default', maxLength, colors, isDarkTheme }) => (
  <View style={styles.inputWrapper}>
    <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
    <View style={[styles.inputContainer, { backgroundColor: isDarkTheme ? colors.surface : '#F8FAFC', borderColor: colors.divider }]}>
      {icon && <Icon name={icon} size={16} color={colors.primary} style={styles.inputIcon} />}
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.grey}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  </View>
);

const ProfileUpdateScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const { isDarkTheme, locale, userId } = user;
  
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [name, setName] = useState(user.userName || '');
  const [email, setEmail] = useState(user.userEmail || '');
  const [mobile, setMobile] = useState(user.userMobile || '');
  const [education, setEducation] = useState(user.education || '');
  const [qualification, setQualification] = useState(user.qualification || '');
  const [passingYear, setPassingYear] = useState(user.passingYear || '');
  const [aadhaarLastFour, setAadhaarLastFour] = useState(user.aadhaarLastFour || '');
  const [location, setLocation] = useState(user.location || '');
  
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(user.skills || []);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState(user.interests || []);

  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleSave = async () => {
    setLoading(true);
    
    const profileData = {
        id: userId,
        full_name: name,
        email: email,
        mobile: mobile,
        education: education,
        qualification: qualification,
        passing_year: passingYear,
        aadhaar_last_four: aadhaarLastFour,
        location: location,
        skills: skills,
        interests: interests,
        updated_at: new Date(),
    };

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) {
        setDialogMessage(error.message);
        setDialogVisible(true);
      } else {
        dispatch(setUserName(name));
        dispatch(setUserEmail(email));
        dispatch(setUserMobile(mobile));
        dispatch(
          updateUserProfile({
            education,
            qualification,
            passingYear,
            aadhaarLastFour,
            location,
            skills,
            interests,
          })
        );
        navigation.goBack();
      }
    } catch (err) {
      setDialogMessage(Strings.SOMETHING_WENT_WRONG);
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>
          {locale === 'hi' ? 'प्रोफ़ाइल अपडेट करें' : 'Update Profile'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.infoBanner, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.1)' : '#E3F2FD', borderColor: 'rgba(11, 61, 145, 0.2)' }]}>
          <Icon name="info-circle" size={16} color={Colors.primary} />
          <Text style={[styles.infoText, { color: Colors.primary }]}>
            {locale === 'hi' ? 'कृपया सटीक विवरण भरें।' : 'Please fill accurate details.'}
          </Text>
        </View>

        <View style={[styles.formSection, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <Text style={[styles.sectionHeading, { color: Colors.primary }]}>
            {locale === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
          </Text>
          
          <InputField label={locale === 'hi' ? 'पूरा नाम' : 'Full Name'} value={name} onChangeText={setName} placeholder="John Doe" icon="user" colors={Colors} isDarkTheme={isDarkTheme} />
          <InputField label={locale === 'hi' ? 'ईमेल' : 'Email'} value={email} onChangeText={setEmail} placeholder="user@example.com" icon="envelope" keyboardType="email-address" colors={Colors} isDarkTheme={isDarkTheme} />
          <InputField label={locale === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'} value={mobile} onChangeText={setMobile} placeholder="+91 XXXXX XXXXX" icon="phone" keyboardType="phone-pad" maxLength={13} colors={Colors} isDarkTheme={isDarkTheme} />

          <View style={styles.divider} />
          <Text style={[styles.sectionHeading, { color: Colors.primary }]}>
            {locale === 'hi' ? 'शिक्षा और पहचान' : 'Education & Identity'}
          </Text>
          
          <InputField label={locale === 'hi' ? 'उच्चतम योग्यता' : 'Highest Qualification'} value={qualification} onChangeText={setQualification} placeholder="e.g. Graduate" icon="certificate" colors={Colors} isDarkTheme={isDarkTheme} />
          <InputField label={locale === 'hi' ? 'संस्थान / शिक्षा' : 'Institute / Education'} value={education} onChangeText={setEducation} placeholder="e.g. B.Tech ME" icon="graduation-cap" colors={Colors} isDarkTheme={isDarkTheme} />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <InputField label={locale === 'hi' ? 'वर्ष' : 'Year'} value={passingYear} onChangeText={setPassingYear} placeholder="YYYY" keyboardType="number-pad" maxLength={4} colors={Colors} isDarkTheme={isDarkTheme} />
            </View>
            <View style={{ width: 20 }} />
            <View style={{ flex: 1 }}>
              <InputField label={locale === 'hi' ? 'आधार (अंतिम 4)' : 'Aadhaar (Last 4)'} value={aadhaarLastFour} onChangeText={setAadhaarLastFour} placeholder="XXXX" keyboardType="number-pad" maxLength={4} colors={Colors} isDarkTheme={isDarkTheme} />
            </View>
          </View>

          <InputField label={locale === 'hi' ? 'वर्तमान स्थान' : 'Current Location'} value={location} onChangeText={setLocation} placeholder="e.g. Bhopal" icon="map-marker" colors={Colors} isDarkTheme={isDarkTheme} />

          <View style={styles.divider} />
          <Text style={[styles.sectionHeading, { color: Colors.primary }]}>
            {locale === 'hi' ? 'कौशल और रुचियां' : 'Skills & Interests'}
          </Text>

          <Text style={[styles.label, { color: Colors.textSecondary }]}>{locale === 'hi' ? 'कौशल' : 'Skills'}</Text>
          <View style={styles.tagInputContainer}>
            <TextInput style={[styles.tagInput, { backgroundColor: isDarkTheme ? Colors.surface : '#F8FAFC', borderColor: Colors.divider, color: Colors.text }]} placeholder="Add a skill" value={skillInput} onChangeText={setSkillInput} onSubmitEditing={handleAddSkill} placeholderTextColor={Colors.grey} />
            <TouchableOpacity onPress={handleAddSkill} style={[styles.addButton, { backgroundColor: Colors.primary }]}>
              <Icon name="plus" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagList}>
            {skills.map((skill) => (
              <View key={skill} style={[styles.tag, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#F0F4F8', borderColor: Colors.divider }]}>
                <Text style={[styles.tagText, { color: Colors.primary }]}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(skill)}><Icon name="times" size={12} color={Colors.primary} /></TouchableOpacity>
              </View>
            ))}
          </View>

          <Text style={[styles.label, { color: Colors.textSecondary }]}>{locale === 'hi' ? 'रुचियां' : 'Interests'}</Text>
          <View style={styles.tagInputContainer}>
            <TextInput style={[styles.tagInput, { backgroundColor: isDarkTheme ? Colors.surface : '#F8FAFC', borderColor: Colors.divider, color: Colors.text }]} placeholder="Add an interest" value={interestInput} onChangeText={setInterestInput} onSubmitEditing={handleAddInterest} placeholderTextColor={Colors.grey} />
            <TouchableOpacity onPress={handleAddInterest} style={[styles.addButton, { backgroundColor: Colors.primary }]}>
              <Icon name="plus" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.tagList}>
            {interests.map((interest) => (
              <View key={interest} style={[styles.tag, { backgroundColor: isDarkTheme ? 'rgba(255, 153, 51, 0.1)' : '#FFF4E5', borderColor: Colors.secondary }]}>
                <Text style={[styles.tagText, { color: Colors.secondary }]}>{interest}</Text>
                <TouchableOpacity onPress={() => removeInterest(interest)}><Icon name="times" size={12} color={Colors.secondary} /></TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors.secondary }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, { color: Colors.white }]}>
            {locale === 'hi' ? 'विवरण जमा करें' : 'SUBMIT DETAILS'}
          </Text>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
      <CustomLoader visible={loading} />
      <CustomDialog visible={dialogVisible} title={Strings.ERROR} message={dialogMessage} type="alert" onConfirm={() => setDialogVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, height: 60, elevation: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  backButton: { padding: 8 },
  scrollContent: { padding: 20 },
  infoBanner: { flexDirection: 'row', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20, gap: 10, borderWidth: 1 },
  infoText: { fontSize: 12, fontWeight: '600', flex: 1 },
  formSection: { borderRadius: 20, padding: 20, elevation: 2, marginBottom: 30, borderWidth: 1 },
  sectionHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputWrapper: { width: '100%' },
  row: { flexDirection: 'row' },
  label: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 48, fontSize: 14 },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 25 },
  tagInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tagInput: { flex: 1, height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, fontSize: 14 },
  addButton: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  tagList: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8 },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  saveButton: { height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});

export default ProfileUpdateScreen;
