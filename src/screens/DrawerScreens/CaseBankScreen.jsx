import React from 'react';
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

const CaseBankScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);

    const cases = [
        { id: '1', title: locale === 'hi' ? 'वित्तीय विश्लेषण केस' : 'Financial Analysis Case', difficulty: 'Medium', duration: '2 hours' },
        { id: '2', title: locale === 'hi' ? 'संचालन प्रबंधन केस' : 'Operations Management Case', difficulty: 'Hard', duration: '3 hours' },
        { id: '3', title: locale === 'hi' ? 'विपणन रणनीति केस' : 'Marketing Strategy Case', difficulty: 'Easy', duration: '1 hour' }
    ];

    const renderCase = ({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <View style={styles.cardContent}>
                <Text style={[styles.title, { color: Colors.primary }]}>{item.title}</Text>
                <View style={styles.meta}>
                    <View style={[styles.badge, { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : '#F0F4F8' }]}>
                        <Text style={[styles.badgeText, { color: Colors.textSecondary }]}>{item.difficulty}</Text>
                    </View>
                    <View style={styles.duration}>
                        <Icon name="clock-o" size={12} color={Colors.textSecondary} />
                        <Text style={[styles.durationText, { color: Colors.textSecondary }]}>{item.duration}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={[styles.startBtn, { backgroundColor: Colors.primary }]}>
                <Text style={[styles.startText, { color: Colors.white }]}>
                    {locale === 'hi' ? 'शुरू करें' : 'Start'}
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
                <Text style={[styles.headerTitle, { color: Colors.white }]}>
                    {locale === 'hi' ? 'केस बैंक' : 'Case Bank'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={cases}
                renderItem={renderCase}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listArea}
                ListHeaderComponent={() => (
                    <Text style={[styles.heroText, { color: Colors.textSecondary }]}>
                        {locale === 'hi' ? 'वास्तविक दुनिया की समस्याओं को हल करने का अभ्यास करें।' : 'Practice solving real-world business challenges.'}
                    </Text>
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
    heroText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 25,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    duration: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    durationText: {
        fontSize: 12,
    },
    startBtn: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
    },
    startText: {
        fontSize: 13,
        fontWeight: 'bold',
    }
});

export default CaseBankScreen;
