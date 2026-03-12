import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';
import CustomDialog from '../../components/CustomDialog';

const InternshipDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);

  const internship = route.params?.internship || {};
  const [comingSoonVisible, setComingSoonVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top']}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: Colors.primary }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors.white }]}>{Strings.INTERNSHIP_DETAILS}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Company & Position */}
        <View style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <View style={styles.companyRow}>
            <View style={[styles.companyIcon, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#F0F4F8' }]}>
              <Icon name="building-o" size={24} color={Colors.primary} />
            </View>
            <View style={styles.companyInfo}>
              <Text style={[styles.companyName, { color: Colors.primary }]}>
                {internship.organization || 'Organization'}
              </Text>
              <Text style={[styles.position, { color: Colors.text }]}>
                {internship.title || 'Position Title'}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="map-marker" size={14} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.textSecondary }]}>
                {internship.location || 'Location'}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="calendar" size={14} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.textSecondary }]}>
                {internship.duration || 'Duration'}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="money" size={14} color={Colors.textSecondary} />
              <Text style={[styles.metaText, { color: Colors.textSecondary }]}>
                ₹{internship.stipend || 'Stipend'}
              </Text>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <Text style={[styles.sectionTitle, { color: Colors.primary }]}>
            {locale === 'hi' ? 'आवश्यक कौशल' : 'Required Skills'}
          </Text>
          <View style={styles.skillsRow}>
            {(internship.skills || []).map(
              (skill, index) => (
                <View key={index} style={[styles.skillChip, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#F0F4F8' }]}>
                  <Text style={[styles.skillText, { color: Colors.primary }]}>{skill}</Text>
                </View>
              ),
            )}
          </View>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
          <Text style={[styles.sectionTitle, { color: Colors.primary }]}>
            {locale === 'hi' ? 'विवरण' : 'Description'}
          </Text>
          <Text style={[styles.descriptionText, { color: Colors.textSecondary }]}>
            {internship.description || 'Description not available.'}
          </Text>
        </View>

        {/* Apply Button */}
        <TouchableOpacity 
          style={[styles.applyButton, { backgroundColor: Colors.secondary }]} 
          onPress={() => setComingSoonVisible(true)}
          activeOpacity={0.8}
        >
          <Icon name="paper-plane" size={18} color={Colors.white} />
          <Text style={[styles.applyButtonText, { color: Colors.white }]}>{Strings.APPLY_NOW}</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>

      <CustomDialog
        visible={comingSoonVisible}
        title={Strings.APPLY_NOW}
        message={locale === 'hi' ? 'इस इंटर्नशिप के लिए आवेदन जल्द ही शुरू होंगे।' : 'Applications for this internship will open soon.'}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  companyIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  position: {
    fontSize: 14,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    gap: 10,
    marginTop: 10,
    elevation: 4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default InternshipDetailsScreen;
