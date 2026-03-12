import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../common/Color';

const {width} = Dimensions.get('window');

const StatCard = ({icon, title, value, color, subtitle}) => (
  <View style={styles.statCard}>
    <View style={[styles.cardIconCircle, {backgroundColor: color + '15'}]}>
      <Icon name={icon} size={28} color={color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </View>
  </View>
);

const StatsScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Overview of your activity</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.mainCardHeader}>
          <Text style={styles.mainCardTitle}>Overall Performance</Text>
          <Icon name="information-outline" size={20} color={Colors.white + '80'} />
        </View>
        <View style={styles.mainCardScoreRow}>
          <Text style={styles.mainCardScore}>84</Text>
          <View style={styles.mainCardScoreInfo}>
            <Text style={styles.scoreText}>Excellent</Text>
            <Text style={styles.scoreDetail}>Ranked top 15%</Text>
          </View>
        </View>
        <View style={styles.scoreBarContainer}>
          <View style={[styles.scoreBar, {width: '84%'}]} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard 
          icon="file-search-outline" 
          title="Profile Views" 
          value="124" 
          color="#3F51B5" 
          subtitle="+12% this week"
        />
        <StatCard 
          icon="briefcase-check-outline" 
          title="Applied" 
          value="18" 
          color="#4CAF50" 
          subtitle="4 active apps"
        />
        <StatCard 
          icon="star-outline" 
          title="Shortlisted" 
          value="5" 
          color="#FFC107" 
          subtitle="2 interviews pending"
        />
        <StatCard 
          icon="trending-up" 
          title="Skill Level" 
          value="Lvl 4" 
          color="#9C27B0" 
          subtitle="Product Management"
        />
      </View>

      <View style={styles.recentActivity}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>Recent Achievements</Text>
          <Text style={styles.viewMore}>View all</Text>
        </View>
        
        <View style={styles.achievementItem}>
          <View style={[styles.achievementIcon, {backgroundColor: '#FFD700'}]}>
            <Icon name="medal" size={20} color={Colors.white} />
          </View>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>Fast Applicant</Text>
            <Text style={styles.achievementDate}>Unlocked 2 days ago</Text>
          </View>
        </View>

        <View style={styles.achievementItem}>
          <View style={[styles.achievementIcon, {backgroundColor: Colors.primary}]}>
            <Icon name="school" size={20} color={Colors.white} />
          </View>
          <View style={styles.achievementContent}>
            <Text style={styles.achievementTitle}>Course Completed</Text>
            <Text style={styles.achievementDate}>Unlocked last week</Text>
          </View>
        </View>
      </View>

      <View style={{height: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  mainCard: {
    margin: 20,
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainCardTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.9,
  },
  mainCardScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainCardScore: {
    fontSize: 48,
    fontWeight: '800',
    color: Colors.white,
  },
  mainCardScoreInfo: {
    marginLeft: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
  scoreDetail: {
    fontSize: 14,
    color: Colors.white + 'CC',
    marginTop: 2,
  },
  scoreBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.white + '33',
    borderRadius: 4,
  },
  scoreBar: {
    height: 8,
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 50) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 4,
  },
  cardSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  recentActivity: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 24,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  viewMore: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    marginLeft: 14,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  achievementDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default StatsScreen;
