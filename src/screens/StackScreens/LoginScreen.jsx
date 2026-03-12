import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import { Route_Strings } from '../../common/Routes';
import { validateMobile } from '../../common/Util';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';
import CustomDialog from '../../components/CustomDialog';
import { supabase } from '../../common/SupabaseConfig';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!mobile.trim() || !validateMobile(mobile)) {
      newErrors.mobile = Strings.INVALID_MOBILE;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOTP = async () => {
    if (!validate()) return;

    setLoading(true);
    const phoneWithCode = mobile.trim().startsWith('+') ? mobile.trim() : `+91${mobile.trim()}`;

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneWithCode,
      });
      if (error) {
        setDialogMessage(error.message);
        setDialogVisible(true);
      } else {
        navigation.navigate(Route_Strings.OTP_VERIFY, { mobile: phoneWithCode });
      }
    } catch (err) {
      console.log("Error in handleRequestOTP", err);
      setDialogMessage(Strings.SOMETHING_WENT_WRONG);
      setDialogVisible(true);
    } finally {
      console.log("Finally block in handleRequestOTP");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <View style={styles.headerContainer}>
            <View style={[styles.emblemCircle, { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : '#F0F4F8' }]}>
              <Icon name="university" size={40} color={Colors.primary} />
            </View>
            <Text style={[styles.title, { color: Colors.primary }]}>{Strings.APP_NAME}</Text>
            <Text style={[styles.subtitle, { color: Colors.text }]}>{Strings.LOGIN}</Text>
            <View style={[styles.stripe, { backgroundColor: Colors.secondary }]} />
          </View>

          <View style={[styles.formContainer, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <CustomInput
              label={Strings.MOBILE_NUMBER}
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                if (errors.mobile) setErrors({ ...errors, mobile: '' });
              }}
              placeholder="98765 43210"
              mask="mobile"
              error={errors.mobile}
              leftIcon={<Icon name="phone" size={18} color={Colors.primary} />}
              style={{ marginVertical: 0 }}
            />

            <View style={styles.buttonWrapper}>
              <CustomButton
                title={Strings.REQUEST_OTP}
                onPress={handleRequestOTP}
                loading={loading}
                disabled={loading}
                style={{ backgroundColor: Colors.primary }}
              />
            </View>
          </View>

          <Text style={[styles.notice, { color: Colors.textSecondary }]}>
            {Strings.SCHEME_GUIDELINES}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomDialog
        visible={dialogVisible}
        title={Strings.ERROR}
        message={dialogMessage}
        type="alert"
        onConfirm={() => setDialogVisible(false)}
      />
      <CustomLoader visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  headerContainer: { alignItems: 'center', marginBottom: 40 },
  emblemCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20, elevation: 2 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  stripe: { width: 60, height: 4, borderRadius: 2 },
  formContainer: { width: '100%', padding: 25, borderRadius: 20, borderWidth: 1, elevation: 4 },
  buttonWrapper: { marginTop: 20 },
  notice: { fontSize: 12, textAlign: 'center', marginTop: 35, lineHeight: 18, paddingHorizontal: 20 },
});

export default LoginScreen;
