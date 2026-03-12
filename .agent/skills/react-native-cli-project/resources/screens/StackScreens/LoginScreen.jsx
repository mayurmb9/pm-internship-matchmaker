import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../../common/Color';
import {AppStrings} from '../../common/String';
import {Endpoints} from '../../common/Url';
import {_callAPI} from '../../common/Util';
import {
  setIsUserLoggedIn,
  setUserName,
  setUserId,
  setUserEmail,
  setAccessToken,
  setRefreshToken,
} from '../../Redux/UserSlice';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';
import CustomDialog from '../../components/CustomDialog';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await _callAPI(
        Endpoints.LOGIN,
        'POST',
        {
          username: username.trim(),
          password: password,
        },
        {},
        false, // Login doesn't require auth token
      );

      if (response.success) {
        const {data} = response;

        // Dispatch user data to Redux
        dispatch(setUserName(data.userName || username));
        dispatch(setUserId(data.userId || ''));
        dispatch(setUserEmail(data.userEmail || ''));
        dispatch(setAccessToken(data.accessToken || ''));
        dispatch(setRefreshToken(data.refreshToken || ''));
        dispatch(setIsUserLoggedIn(true));

        // Navigation is handled automatically by AppNavigator
        // since isUserLoggedIn changed to true
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
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{AppStrings.APP_NAME}</Text>
          <Text style={styles.subtitle}>{AppStrings.LOGIN}</Text>
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            label={AppStrings.USERNAME}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              if (errors.username) {
                setErrors((prev) => ({...prev, username: ''}));
              }
            }}
            placeholder={AppStrings.ENTER_USERNAME}
            error={errors.username}
            autoCapitalize="none"
          />

          <CustomInput
            label={AppStrings.PASSWORD}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors((prev) => ({...prev, password: ''}));
              }
            }}
            placeholder={AppStrings.ENTER_PASSWORD}
            secureTextEntry
            error={errors.password}
          />

          <View style={styles.buttonWrapper}>
            <CustomButton
              title={AppStrings.LOGIN}
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  formContainer: {
    width: '100%',
  },
  buttonWrapper: {
    marginTop: 24,
  },
});

export default LoginScreen;
