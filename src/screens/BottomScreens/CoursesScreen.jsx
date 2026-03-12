import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../common/Color';

const {width} = Dimensions.get('window');

const TOP_COURSES = [
  {
    id: '1',
    title: 'Enterprise Product Strategy',
    instructor: 'Marty Cagan',
    duration: '15 video lessons',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: '#FF6F61',
    progress: 0,
  },
  {
    id: '2',
    title: 'Strategic Roadmap Design',
    instructor: 'Julie Zhuo',
    duration: '12 video lessons',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    color: '#6B5B95',
    progress: 0,
  },
  {
    id: '3',
    title: 'Data-Driven Decision Making',
    instructor: 'Nir Eyal',
    duration: '20 video lessons',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-5ebbb219f53e?auto=format&fit=crop&w=800&q=80',
    color: '#88B04B',
    progress: 0,
  },
];

const CourseCard = ({item}) => (
  <View style={styles.courseItem}>
    <Image source={{uri: item.image}} style={styles.courseImage} />
    <View style={styles.courseContent}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseInstructor}>{item.instructor}</Text>
      <View style={styles.courseFooter}>
        <Text style={styles.courseDuration}>{item.duration}</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startBtnText}>Start Free</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const CoursesScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Learning Hub</Text>
            <Text style={styles.headerSubtitle}>Master Product Management</Text>
          </View>
          <View style={styles.creditsContainer}>
            <Text style={styles.creditsText}>12 Credits</Text>
          </View>
        </View>

        <View style={styles.featuredBox}>
          <View style={styles.featuredLeft}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>NEW COURSE</Text>
            </View>
            <Text style={styles.featuredTitle}>Product-Led Growth Masterclass</Text>
            <TouchableOpacity style={styles.enrollBtn}>
              <Text style={styles.enrollBtnText}>Join Now</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{uri: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'}} 
            style={styles.featuredImg}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Masterclasses</Text>
          <Text style={styles.viewMore}>See all</Text>
        </View>
        <FlatList
          data={TOP_COURSES}
          renderItem={({item}) => <CourseCard item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.courseList}
        />
      </View>

      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitleHorizontal}>Explore Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {['Strategy', 'Data/Analytics', 'UX/Design', 'Development', 'Marketing'].map((cat, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    backgroundColor: Colors.white,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
  creditsContainer: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  creditsText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  featuredBox: {
    backgroundColor: Colors.text,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    overflow: 'hidden',
  },
  featuredLeft: {
    flex: 1,
    zIndex: 1,
  },
  tag: {
    backgroundColor: Colors.accent,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 20,
    lineHeight: 28,
  },
  enrollBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  enrollBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  featuredImg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    opacity: 0.8,
    marginRight: -40,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  viewMore: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  courseList: {
    paddingBottom: 20,
  },
  courseItem: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  courseImage: {
    width: 100,
    height: '100%',
    backgroundColor: Colors.surface,
  },
  courseContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  courseInstructor: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  courseDuration: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  exploreSection: {
    marginTop: 24,
  },
  sectionTitleHorizontal: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  categoryBadge: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default CoursesScreen;
