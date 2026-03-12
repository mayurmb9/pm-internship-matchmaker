import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../common/Color';
import { getStrings } from '../common/String';

const MentorshipScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);

    const mentors = [
        { id: 1, name: "Dr. Rajesh Kumar", expertise: "AgriTech Specialist", rating: 4.9, available: "Mon, Wed" },
        { id: 2, name: "Sneha Sharma", expertise: "Career Guidance", rating: 4.8, available: "Tue, Thu" },
        { id: 3, name: "Amit Patel", expertise: "Digital Marketing", rating: 4.7, available: "Friday" }
    ];

    const renderMentor = ({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <View style={[styles.avatar, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#f0f4f8' }]}>
                <Icon name="user" size={30} color={Colors.primary} />
            </View>
            <View style={styles.info}>
                <Text style={[styles.name, { color: Colors.primary }]}>{item.name}</Text>
                <Text style={[styles.expertise, { color: Colors.textSecondary }]}>{item.expertise}</Text>
                <View style={styles.ratingRow}>
                    <Icon name="star" size={14} color={Colors.secondary} />
                    <Text style={[styles.rating, { color: Colors.text }]}>{item.rating}</Text>
                    <View style={styles.dot} />
                    <Text style={[styles.available, { color: Colors.textSecondary }]}>{item.available}</Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.bookBtn, { backgroundColor: Colors.primary }]}>
                <Text style={[styles.bookText, { color: Colors.white }]}>
                    {locale === 'hi' ? 'बुक करें' : 'Book'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            
            {/* Header */}
            <View style={[styles.header, { backgroundColor: Colors.primary }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
                    <Icon name="bars" size={20} color={Colors.white} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: Colors.white }]}>{Strings.MENTORSHIP}</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={mentors}
                renderItem={renderMentor}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listArea}
                ListHeaderComponent={() => (
                    <View style={styles.heroSection}>
                        <Text style={[styles.heroTitle, { color: Colors.primary }]}>
                            {locale === 'hi' ? 'विशेषज्ञों से जुड़ें' : 'Connect with Experts'}
                        </Text>
                        <Text style={[styles.heroSubtitle, { color: Colors.textSecondary }]}>
                            {locale === 'hi' ? 'सफलता के लिए व्यक्तिगत मार्गदर्शन प्राप्त करें।' : 'Get 1-on-1 personalized guidance for your career.'}
                        </Text>
                    </View>
                )}
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
        paddingHorizontal: 15,
        height: 60,
        elevation: 4,
    },
    menuBtn: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listArea: {
        padding: 20,
    },
    heroSection: {
        marginBottom: 25,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        borderWidth: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    expertise: {
        fontSize: 13,
        marginBottom: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#999',
        marginHorizontal: 8,
    },
    available: {
        fontSize: 11,
    },
    bookBtn: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    bookText: {
        fontSize: 12,
        fontWeight: 'bold',
    }
});

export default MentorshipScreen;
