import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../common/Color';
import { getStrings } from '../common/String';

const CaseStudiesScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);

    const caseStudies = [
        {
            id: 1,
            title: locale === 'hi' ? "सफल ग्रामीण उद्यमिता" : "Successful Rural Entrepreneurship",
            description: locale === 'hi' ? "कैसे एक छात्र ने स्थानीय कृषि को बदला।" : "How a student transformed local agriculture.",
            image: "https://api.placeholder.com/400/200",
            readTime: "5 min",
            tags: ["AgriTech", "Rural"]
        },
        {
            id: 2,
            title: locale === 'hi' ? "डिजिटल साक्षरता प्रभाव" : "Digital Literacy Impact",
            description: locale === 'hi' ? "शहरी मलिन बस्तियों में तकनीकी शिक्षा का प्रभाव।" : "Impact of tech education in urban slums.",
            image: "https://api.placeholder.com/400/200",
            readTime: "8 min",
            tags: ["Digital", "Education"]
        }
    ];

    const renderCaseStudy = ({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.tagRow}>
                    {item.tags.map(tag => (
                        <View key={tag} style={[styles.tag, { backgroundColor: isDarkTheme ? 'rgba(11, 61, 145, 0.2)' : '#f0f4f8' }]}>
                            <Text style={[styles.tagText, { color: Colors.primary }]}>{tag}</Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.title, { color: Colors.primary }]}>{item.title}</Text>
                <Text style={[styles.description, { color: Colors.textSecondary }]}>{item.description}</Text>
                <View style={styles.footer}>
                    <View style={styles.meta}>
                        <Icon name="clock-o" size={14} color={Colors.textSecondary} />
                        <Text style={[styles.metaText, { color: Colors.textSecondary }]}>{item.readTime}</Text>
                    </View>
                    <Text style={[styles.readMore, { color: Colors.secondary }]}>
                        {locale === 'hi' ? 'और पढ़ें' : 'Read More'} →
                    </Text>
                </View>
            </View>
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
                    {locale === 'hi' ? 'केस स्टडीज' : 'Success Stories'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={caseStudies}
                renderItem={renderCaseStudy}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listArea}
                ListHeaderComponent={() => (
                    <Text style={[styles.listTitle, { color: Colors.textSecondary }]}>
                        {locale === 'hi' ? 'प्रेरणादायक कहानियां' : 'Inspiring Journeys'}
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
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
    },
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 25,
        elevation: 3,
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#eee',
    },
    content: {
        padding: 15,
    },
    tagRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 8,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
    },
    tagText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
    },
    readMore: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default CaseStudiesScreen;
