import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../common/Color';
import {AppStrings} from '../../common/String';
import {Endpoints} from '../../common/Url';
import {_callAPI} from '../../common/Util';
import CustomButton from '../../components/CustomButton';
import CustomLoader from '../../components/CustomLoader';

const HomeScreen = () => {
  const navigation = useNavigation();
  const userName = useSelector((state) => state.user.userName);
  const isDarkTheme = useSelector((state) => state.user.isDarkTheme);

  const [loading, setLoading] = useState(false);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const response = await _callAPI(Endpoints.HOME_DATA, 'GET');
      if (response.success) {
        setHomeData(response.data);
      }
    } catch (error) {
      console.log('Home data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.statusBar}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={styles.header}>
        <CustomButton
          title="☰"
          onPress={openDrawer}
          type="outline"
          style={styles.menuButton}
          textStyle={styles.menuButtonText}
        />
        <Text style={styles.headerTitle}>{AppStrings.HOME}</Text>
        <View style={styles.menuButton} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {AppStrings.WELCOME}, {userName || 'User'}! 👋
        </Text>
        <Text style={styles.descriptionText}>
          You are successfully logged in. This is your home screen.
        </Text>

        {homeData && (
          <View style={styles.dataCard}>
            <Text style={styles.cardTitle}>Home Data</Text>
            <Text style={styles.cardContent}>
              {JSON.stringify(homeData, null, 2)}
            </Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <CustomButton
            title="Refresh Data"
            onPress={fetchHomeData}
            loading={loading}
            type="primary"
            style={styles.actionButton}
          />
          <CustomButton
            title="Open Drawer"
            onPress={openDrawer}
            type="outline"
            style={styles.actionButton}
          />
        </View>
      </View>

      <CustomLoader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 0,
  },
  menuButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  dataCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 0,
  },
});

export default HomeScreen;
