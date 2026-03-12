import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { setIsUserLoggedIn, setUserName, setUserId, setUserMobile } from '../../Redux/UserSlice';
import { supabase } from '../../common/SupabaseConfig';
import CustomLoader from '../../components/CustomLoader';
import CustomDialog from '../../components/CustomDialog';

const OtpVerifyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const { mobile } = route.params || { mobile: '' };

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = async () => {
    if (otp.length < 6) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: mobile,
        token: otp,
        type: 'sms',
      });

      if (error) {
        setDialogMessage(error.message);
        setDialogVisible(true);
      } else if (data.user) {
        dispatch(setUserId(data.user.id));
        dispatch(setUserMobile(mobile));
        dispatch(setIsUserLoggedIn(true));
        // We'll set a default name if not available, Profile sync will update it later
        if (!data.user.user_metadata?.full_name) {
            dispatch(setUserName('Yuva Bharat'));
        } else {
            dispatch(setUserName(data.user.user_metadata.full_name));
        }
      }
    } catch (err) {
      setDialogMessage(Strings.SOMETHING_WENT_WRONG);
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: mobile,
      });
      if (error) {
        setDialogMessage(error.message);
        setDialogVisible(true);
      } else {
        setTimer(30);
      }
    } catch (err) {
      setDialogMessage(Strings.SOMETHING_WENT_WRONG);
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={[styles.iconCircle, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.1)' : '#F0F4F8' }]}>
            <Icon name="shield" size={40} color={Colors.primary} />
          </View>

          <Text style={[styles.title, { color: Colors.primary }]}>
            {locale === 'hi' ? 'OTP सत्यापन' : 'OTP Verification'}
          </Text>
          <Text style={[styles.subtitle, { color: Colors.textSecondary }]}>
            {locale === 'hi' ? 'हमने एक 6-अंकीय सत्यापन कोड भेजा है' : 'We have sent a 6-digit verification code to'} {'\n'}
            <Text style={[styles.mobileText, { color: Colors.text }]}>{mobile}</Text>
          </Text>

          <View style={styles.otpContainer}>
            <TextInput
              style={[styles.otpInput, { backgroundColor: Colors.surface, color: Colors.primary, borderColor: Colors.primary }]}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="000000"
              placeholderTextColor={Colors.grey}
              letterSpacing={8}
              textAlign="center"
            />
          </View>

          <TouchableOpacity 
            style={[styles.verifyButton, { backgroundColor: Colors.secondary }, otp.length < 6 && styles.disabledButton]} 
            onPress={handleVerify}
            disabled={otp.length < 6}
          >
            <Text style={[styles.verifyButtonText, { color: Colors.white }]}>
              {locale === 'hi' ? 'सत्यापित करें' : 'VERIFY & PROCEED'}
            </Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={[styles.resendText, { color: Colors.textSecondary }]}>
              {locale === 'hi' ? 'कोड नहीं मिला?' : "Didn't receive code?"} 
            </Text>
            {timer > 0 ? (
              <Text style={[styles.timerText, { color: Colors.primary }]}> {locale === 'hi' ? 'पुनः भेजें' : 'Resend in'} {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendLink, { color: Colors.secondary }]}> {Strings.RESEND_OTP}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      <CustomLoader visible={loading} />
      <CustomDialog
        visible={dialogVisible}
        title={Strings.ERROR}
        message={dialogMessage}
        type="alert"
        onConfirm={() => setDialogVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: { padding: 20 },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 30, paddingTop: 20 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  mobileText: { fontWeight: '700' },
  otpContainer: { width: '100%', marginBottom: 40 },
  otpInput: { height: 65, borderRadius: 15, fontSize: 24, fontWeight: 'bold', borderWidth: 2, elevation: 3 },
  verifyButton: { width: '100%', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  disabledButton: { backgroundColor: '#CBD5E1', elevation: 0 },
  verifyButtonText: { fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  resendContainer: { flexDirection: 'row', marginTop: 30 },
  resendText: {},
  timerText: { fontWeight: '700' },
  resendLink: { fontWeight: '800' },
});

export default OtpVerifyScreen;
