import {StyleSheet} from 'react-native';
import Colors from './Color';

export const SharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonContainer: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 8,
  },
});

export default SharedStyles;
