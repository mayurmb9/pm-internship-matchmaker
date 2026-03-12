import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../common/Color';
import { AppStrings } from '../../common/String';
import { Endpoints } from '../../common/Url';
import { Route_Strings } from '../../common/Routes';
import { _callAPI, validateMobile } from '../../common/Util';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';
import CustomDialog from '../../components/CustomDialog';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!mobile.trim()) {
      newErrors.mobile = AppStrings.INVALID_MOBILE;
    } else if (!validateMobile(mobile)) {
      newErrors.mobile = AppStrings.INVALID_MOBILE;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOTP = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await _callAPI(
        Endpoints.LOGIN,
        'POST',
        { mobile: mobile.trim() },
        {},
        false, // Login does not require auth token
      );

      if (response.success) {
        // Navigate to OTP verification screen
        navigation.navigate(Route_Strings.OTP_VERIFY, {
          mobile: mobile.trim(),
          otpToken: response.data?.otpToken || '',
        });
      } else {
        setDialogMessage(response.message || AppStrings.LOGIN_FAILED);
        setDialogVisible(true);
      }
    } catch (error) {
      setDialogMessage(AppStrings.SOMETHING_WENT_WRONG);
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Government-styled Header */}
        <View style={styles.headerContainer}>
          <View style={styles.emblemPlaceholder}>
            <Text style={styles.emblemText}>🏛️</Text>
          </View>
          <Text style={styles.title}>{AppStrings.APP_NAME}</Text>
          <Text style={styles.subtitle}>{AppStrings.LOGIN}</Text>
          <View style={styles.saffronStripe} />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label={AppStrings.MOBILE_NUMBER}
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              if (errors.mobile) {
                setErrors((prev) => ({ ...prev, mobile: '' }));
              }
            }}
            placeholder={AppStrings.ENTER_MOBILE}
            mask="mobile"
            error={errors.mobile}
          />

          <View style={styles.buttonWrapper}>
            <CustomButton
              title={AppStrings.REQUEST_OTP}
              onPress={handleRequestOTP}
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>

        {/* Scheme notice */}
        <Text style={styles.schemeNotice}>
          {AppStrings.SCHEME_GUIDELINES}
        </Text>
      </ScrollView>

      <CustomLoader visible={loading} />

      <CustomDialog
        visible={dialogVisible}
        title={AppStrings.ERROR}
        message={dialogMessage}
        type="alert"
        onConfirm={() => setDialogVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emblemPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emblemText: {
    fontSize: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  saffronStripe: {
    width: 80,
    height: 4,
    backgroundColor: Colors.secondary,
    borderRadius: 2,
  },
  formContainer: {
    width: '100%',
  },
  buttonWrapper: {
    marginTop: 24,
  },
  schemeNotice: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 32,
    lineHeight: 18,
  },
});

export default LoginScreen;
