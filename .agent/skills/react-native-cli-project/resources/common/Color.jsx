const LightColors = {
  primary: '#4A90D9',
  secondary: '#6C63FF',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#9CA3AF',
  lightGrey: '#E5E7EB',
  darkGrey: '#4B5563',
  transparent: 'transparent',
  inputBorder: '#D1D5DB',
  inputBackground: '#F9FAFB',
  placeholder: '#9CA3AF',
  disabled: '#D1D5DB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(74, 144, 217, 0.1)',
  statusBar: '#4A90D9',
  divider: '#E5E7EB',
};

const DarkColors = {
  primary: '#6C63FF',
  secondary: '#4A90D9',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  error: '#F87171',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#60A5FA',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#64748B',
  lightGrey: '#334155',
  darkGrey: '#CBD5E1',
  transparent: 'transparent',
  inputBorder: '#334155',
  inputBackground: '#1E293B',
  placeholder: '#64748B',
  disabled: '#475569',
  overlay: 'rgba(0, 0, 0, 0.7)',
  ripple: 'rgba(108, 99, 255, 0.15)',
  statusBar: '#0F172A',
  divider: '#334155',
};

export const getColors = (isDarkTheme = false) => {
  return isDarkTheme ? DarkColors : LightColors;
};

export const Colors = LightColors;

export default Colors;
