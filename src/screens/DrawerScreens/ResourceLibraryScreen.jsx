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

const ResourceLibraryScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);

    const resources = [
        { id: '1', title: locale === 'hi' ? 'योजना दिशानिर्देश' : 'Scheme Guidelines', type: 'PDF', size: '1.2 MB', icon: 'file-pdf-o' },
        { id: '2', title: locale === 'hi' ? 'साक्षात्कार युक्तियाँ' : 'Interview Tips', type: 'Video', size: '15 min', icon: 'video-camera' },
        { id: '3', title: locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQs', type: 'Doc', size: '500 KB', icon: 'question-circle-o' }
    ];

    const renderResource = ({ item }) => (
        <TouchableOpacity style={[styles.card, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <View style={[styles.iconContainer, { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : '#F0F4F8' }]}>
                <Icon name={item.icon} size={24} color={Colors.primary} />
            </View>
            <View style={styles.info}>
                <Text style={[styles.title, { color: Colors.primary }]}>{item.title}</Text>
                <Text style={[styles.subtitle, { color: Colors.textSecondary }]}>{item.type} • {item.size}</Text>
            </View>
            <Icon name="download" size={18} color={Colors.secondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            
            <View style={[styles.header, { backgroundColor: Colors.primary }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
                    <Icon name="bars" size={20} color={Colors.white} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: Colors.white }]}>
                    {locale === 'hi' ? 'संसाधन पुस्तकालय' : 'Resource Library'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={resources}
                renderItem={renderResource}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listArea}
                ListHeaderComponent={() => (
                    <View style={styles.hero}>
                        <Text style={[styles.heroText, { color: Colors.textSecondary }]}>
                            {locale === 'hi' ? 'अपनी इंटर्नशिप यात्रा के लिए आवश्यक सामग्री डाउनलोड करें।' : 'Essential materials for your internship journey.'}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, elevation: 4 },
    menuBtn: { padding: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    listArea: { padding: 20 },
    hero: { marginBottom: 25 },
    heroText: { fontSize: 14, lineHeight: 20 },
    card: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, elevation: 2 },
    iconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    info: { flex: 1 },
    title: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
    subtitle: { fontSize: 12 }
});

export default ResourceLibraryScreen;
