import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import CustomDialog from '../../components/CustomDialog';

const ApplicationStatusScreen = () => {
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const [comingSoonVisible, setComingSoonVisible] = useState(false);
  const [applications] = useState([
    {
      id: '1',
      company: 'Tata Motors',
      role: 'Manufacturing Intern',
      status: locale === 'hi' ? 'आवेदन किया' : 'Applied',
      date: '24 May 2024',
      stipend: '₹5,000/mo',
    },
    {
      id: '2',
      company: 'Reliance Industries',
      role: 'Operations Trainee',
      status: locale === 'hi' ? 'शॉर्टलिस्टेड' : 'Shortlisted',
      date: '15 May 2024',
      stipend: '₹5,000/mo',
    },
    {
      id: '3',
      company: 'Infosys',
      role: 'Digital Assistant',
      status: locale === 'hi' ? 'साक्षात्कार' : 'Interviewing',
      date: '10 May 2024',
      stipend: '₹5,000/mo',
    },
  ]);

  const getStatusColor = (status) => {
    if (status.includes('Applied') || status.includes('आवेदन')) return '#0288D1';
    if (status.includes('Shortlisted') || status.includes('शॉर्टलिस्टेड')) return '#2E7D32';
    if (status.includes('Interviewing') || status.includes('साक्षात्कार')) return Colors.secondary;
    if (status.includes('Rejected')) return '#D32F2F';
    return Colors.textSecondary;
  };

  const getStatusIcon = (status) => {
    if (status.includes('Applied') || status.includes('आवेदन')) return 'paper-plane-o';
    if (status.includes('Shortlisted') || status.includes('शॉर्टलिस्टेड')) return 'check-circle-o';
    if (status.includes('Interviewing') || status.includes('साक्षात्कार')) return 'comments-o';
    return 'question-circle-o';
  };

  const renderApplicationItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
      <View style={styles.cardHeader}>
        <View style={styles.companyInfo}>
          <View style={[styles.logoPlaceholder, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#F0F4F8', borderColor: Colors.divider }]}>
            <Text style={[styles.logoText, { color: Colors.primary }]}>{item.company.charAt(0)}</Text>
          </View>
          <View>
            <Text style={[styles.companyName, { color: Colors.primary }]}>{item.company}</Text>
            <Text style={[styles.roleName, { color: Colors.textSecondary }]}>{item.role}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Icon name={getStatusIcon(item.status)} size={12} color={getStatusColor(item.status)} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>

      <View style={[styles.cardFooter, { borderTopColor: Colors.divider }]}>
        <View style={styles.footerItem}>
          <Icon name="calendar" size={14} color={Colors.textSecondary} />
          <Text style={[styles.footerText, { color: Colors.textSecondary }]}>{item.date}</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon name="money" size={14} color={Colors.textSecondary} />
          <Text style={[styles.footerText, { color: Colors.textSecondary }]}>{item.stipend}</Text>
        </View>
        <TouchableOpacity style={styles.detailsBtn} onPress={() => setComingSoonVisible(true)}>
          <Text style={[styles.detailsBtnText, { color: Colors.secondary }]}>
            {locale === 'hi' ? 'विवरण' : 'Details'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>{Strings.MY_APPLICATIONS}</Text>
        <View style={[styles.statsRow, { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)' }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: Colors.white }]}>{applications.length}</Text>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>
              {locale === 'hi' ? 'कुल' : 'Total'}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#81D4FA' }]}>
              {applications.length}
            </Text>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>
              {locale === 'hi' ? 'सक्रिय' : 'Active'}
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#A5D6A7' }]}>0</Text>
            <Text style={[styles.statLabel, { color: 'rgba(255,255,255,0.8)' }]}>
              {locale === 'hi' ? 'जीत' : 'Wins'}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={applications}
        renderItem={renderApplicationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="folder-open-o" size={60} color={Colors.grey} />
            <Text style={[styles.emptyTitle, { color: Colors.primary }]}>
              {locale === 'hi' ? 'कोई आवेदन नहीं' : 'No Applications Yet'}
            </Text>
          </View>
        }
      />

      <CustomDialog
        visible={comingSoonVisible}
        title={locale === 'hi' ? 'विवरण' : 'Details'}
        message={locale === 'hi' ? 'यह सुविधा जल्द ही उपलब्ध होगी।' : 'Detailed tracking will be available soon.'}
        type="alert"
        onConfirm={() => setComingSoonVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
    borderRadius: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 25,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 15,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  roleName: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 12,
    gap: 15,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailsBtn: {
    marginLeft: 'auto',
  },
  detailsBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default ApplicationStatusScreen;
