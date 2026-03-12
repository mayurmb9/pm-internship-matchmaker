// PM Internship Matchmaker — Government-themed color palette
// Primary: Indian Government Navy Blue | Secondary: Saffron Accent

const LightColors = {
  primary: '#0B3D91',
  secondary: '#FF9933',
  accent: '#138808',
  saffron: '#FF9933',
  navyBlue: '#0B3D91',
  ashoka: '#000080',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#5A6478',
  error: '#D32F2F',
  success: '#2E7D32',
  warning: '#ED6C02',
  info: '#0288D1',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#9CA3AF',
  lightGrey: '#E5E7EB',
  darkGrey: '#4B5563',
  transparent: 'transparent',
  inputBorder: '#C5CAE9',
  inputBackground: '#F5F7FF',
  placeholder: '#9CA3AF',
  disabled: '#BDBDBD',
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(11, 61, 145, 0.1)',
  statusBar: '#072B66',
  divider: '#E0E0E0',
};

const DarkColors = {
  primary: '#5C8DD6',
  secondary: '#FFB74D',
  accent: '#66BB6A',
  saffron: '#FFB74D',
  navyBlue: '#5C8DD6',
  ashoka: '#7986CB',
  background: '#0D1B2A',
  surface: '#1B2838',
  text: '#E8EDF3',
  textSecondary: '#94A3B8',
  error: '#EF5350',
  success: '#4CAF50',
  warning: '#FFA726',
  info: '#29B6F6',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#64748B',
  lightGrey: '#2D3E50',
  darkGrey: '#CBD5E1',
  transparent: 'transparent',
  inputBorder: '#2D3E50',
  inputBackground: '#1B2838',
  placeholder: '#64748B',
  disabled: '#455A64',
  overlay: 'rgba(0, 0, 0, 0.7)',
  ripple: 'rgba(92, 141, 214, 0.15)',
  statusBar: '#0D1B2A',
  divider: '#2D3E50',
};

export const getColors = (isDarkTheme = false) => {
  return isDarkTheme ? DarkColors : LightColors;
};

export const Colors = LightColors;

export default Colors;
