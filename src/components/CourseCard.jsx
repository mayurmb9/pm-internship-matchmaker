import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../common/Color';

const {width} = Dimensions.get('window');

const CourseCard = ({title, instructor, lessons, duration, image, tag}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
        {tag && (
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.instructorName}>{instructor}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <View style={[styles.dot, {backgroundColor: Colors.accent}]} />
            <Text style={styles.statText}>{lessons} lessons</Text>
          </View>
          <View style={styles.stat}>
            <View style={[styles.dot, {backgroundColor: Colors.success}]} />
            <Text style={styles.statText}>{duration}</Text>
          </View>
        </View>
        
        <View style={styles.enrollBtn}>
          <Text style={styles.enrollText}>Enroll Now</Text>
          <View style={styles.arrowIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 20,
    width: width * 0.9,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  tagBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
    lineHeight: 24,
  },
  instructorName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  enrollBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  enrollText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  arrowIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.text,
    transform: [{rotate: '90deg'}],
    marginLeft: 8,
  },
});

export default CourseCard;
