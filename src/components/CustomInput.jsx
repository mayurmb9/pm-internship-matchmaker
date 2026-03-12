import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../common/Color';
import {formatAadhaar} from '../common/Util';
import {Constants} from '../common/Constant';

/**
 * CustomInput with optional mask support for Aadhaar, PAN, and Mobile.
 *
 * @param {string} mask - 'aadhaar' | 'pan' | 'mobile' | 'none'
 *   - 'aadhaar': auto-formats as "XXXX XXXX XXXX", forces maxLength=14, keyboardType='number-pad'
 *   - 'mobile': forces maxLength=10, keyboardType='phone-pad'
 *   - 'pan': forces maxLength=10, autoCapitalize='characters'
 */
const CustomInput = ({
  label = '',
  value = '',
  onChangeText = () => {},
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  error = '',
  editable = true,
  maxLength,
  style = {},
  leftIcon = null,
  rightIcon = null,
  onRightIconPress = () => {},
  multiline = false,
  numberOfLines = 1,
  autoCapitalize = 'none',
  mask = 'none', // 'aadhaar' | 'pan' | 'mobile' | 'none'
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSecure = () => {
    setIsSecure(!isSecure);
  };

  // ─── Mask Overrides ──────────────────────────────────────
  let resolvedMaxLength = maxLength;
  let resolvedKeyboardType = keyboardType;
  let resolvedAutoCapitalize = autoCapitalize;

  switch (mask) {
    case 'aadhaar':
      resolvedMaxLength = 14; // 12 digits + 2 spaces
      resolvedKeyboardType = 'number-pad';
      break;
    case 'mobile':
      resolvedMaxLength = Constants.MOBILE_LENGTH;
      resolvedKeyboardType = 'phone-pad';
      break;
    case 'pan':
      resolvedMaxLength = Constants.PAN_LENGTH;
      resolvedAutoCapitalize = 'characters';
      break;
    default:
      break;
  }

  const handleChangeText = (text) => {
    if (mask === 'aadhaar') {
      // Strip non-digits first, then format
      const digits = text.replace(/\D/g, '').slice(0, Constants.AADHAAR_LENGTH);
      const formatted = formatAadhaar(digits);
      onChangeText(formatted);
      return;
    }
    if (mask === 'mobile') {
      const digits = text.replace(/\D/g, '').slice(0, Constants.MOBILE_LENGTH);
      onChangeText(digits);
      return;
    }
    onChangeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focusedInput,
          error ? styles.errorInput : null,
          !editable && styles.disabledInput,
        ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            multiline && styles.multilineInput,
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={isSecure}
          keyboardType={resolvedKeyboardType}
          editable={editable}
          maxLength={resolvedMaxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={resolvedAutoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={toggleSecure}
            activeOpacity={0.7}>
            <Text style={styles.toggleText}>{isSecure ? '👁' : '👁‍🗨'}</Text>
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onRightIconPress}
            activeOpacity={0.7}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
    minHeight: 50,
  },
  focusedInput: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  errorInput: {
    borderColor: Colors.error,
  },
  disabledInput: {
    backgroundColor: Colors.lightGrey,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  iconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomInput;
