import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../../common/Color';
import { getStrings } from '../../common/String';

const CommunityForumsScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);

    const forumPosts = [
        {
            id: '1',
            user: { name: 'Saurabh J.' , company: 'Tata Motors' },
            title: locale === 'hi' ? 'समर इंटर्नशिप की तैयारी' : 'Mock Interview Prep for Summer Internships',
            content: locale === 'hi' ? 'इस सप्ताह के अंत में मेरे पास मॉक इंटरव्यू के लिए कुछ स्लॉट हैं।' : 'I have some openings for mock interviews this weekend. Comment below if you are looking for advice.',
            tags: ['#Prep', '#Internship'],
            likes: 45,
            comments: 12,
            time: '2 hours ago',
        },
        {
            id: '2',
            user: { name: 'Priya K.' , company: 'Reliance Industries' },
            title: locale === 'hi' ? 'कौशल विकास चर्चा' : 'Skill Development Discussion',
            content: locale === 'hi' ? 'आइए मौलिक अंतरों पर चर्चा करें और एक से दूसरे में कैसे बदलें।' : 'Lets discuss the fundamental differences and how to pivot from one to another.',
            tags: ['#Skills', '#Career'],
            likes: 128,
            comments: 54,
            time: 'Yesterday',
        }
    ];

    const forumCategories = [
        { id: '1', name: locale === 'hi' ? 'सामान्य' : 'General', icon: 'comments-o' },
        { id: '2', name: locale === 'hi' ? 'इंटरव्यू' : 'Interview', icon: 'list-ul' },
        { id: '3', name: locale === 'hi' ? 'रिज्यूमे' : 'Resume', icon: 'file-text-o' },
        { id: '4', name: locale === 'hi' ? 'कहानियां' : 'Stories', icon: 'star-o' },
    ];

    const renderForumPost = ({ item }) => (
        <View style={[styles.postCard, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
            <View style={styles.postHeader}>
                <View style={styles.userContainer}>
                    <View style={[styles.avatar, { backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : '#f0f4f8' }]}>
                        <Icon name="user" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={[styles.userName, { color: Colors.primary }]}>{item.user.name}</Text>
                        <Text style={[styles.userCompany, { color: Colors.textSecondary }]}>{item.user.company}</Text>
                    </View>
                </View>
                <Text style={[styles.postTime, { color: Colors.grey }]}>{item.time}</Text>
            </View>

            <Text style={[styles.postTitle, { color: Colors.text }]}>{item.title}</Text>
            <Text style={[styles.postContent, { color: Colors.textSecondary }]} numberOfLines={3}>{item.content}</Text>

            <View style={styles.tagsContainer}>
                {item.tags.map((tag, idx) => (
                    <Text key={idx} style={[styles.postTag, { color: Colors.secondary }]}>{tag}</Text>
                ))}
            </View>

            <View style={[styles.postFooter, { borderTopColor: Colors.divider }]}>
                <View style={styles.footerAction}>
                    <Icon name="heart-o" size={16} color={Colors.grey} />
                    <Text style={[styles.footerActionText, { color: Colors.grey }]}>{item.likes}</Text>
                </View>
                <View style={styles.footerAction}>
                    <Icon name="comment-o" size={16} color={Colors.grey} />
                    <Text style={[styles.footerActionText, { color: Colors.grey }]}>{item.comments}</Text>
                </View>
                <View style={[styles.footerAction, { marginLeft: 'auto' }]}>
                    <Icon name="share-square-o" size={16} color={Colors.grey} />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            
            <View style={[styles.header, { backgroundColor: Colors.primary }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
                    <Icon name="bars" size={20} color={Colors.white} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: Colors.white }]}>
                    {locale === 'hi' ? 'सामुदायिक मंच' : 'Community Forums'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={[styles.searchBar, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
                    <Icon name="search" size={18} color={Colors.grey} />
                    <TextInput
                        placeholder={locale === 'hi' ? 'चर्चा खोजें...' : "Search discussions..."}
                        style={[styles.searchInput, { color: Colors.text }]}
                        placeholderTextColor={Colors.grey}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {forumCategories.map((cat) => (
                        <TouchableOpacity key={cat.id} style={[styles.categoryBadge, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
                            <Icon name={cat.icon} size={14} color={Colors.primary} />
                            <Text style={[styles.categoryName, { color: Colors.primary }]}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.postsList}>
                    {forumPosts.map((item) => (
                        <View key={item.id}>{renderForumPost({ item })}</View>
                    ))}
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            <TouchableOpacity style={[styles.fab, { backgroundColor: Colors.primary }]}>
                <Icon name="plus" size={24} color={Colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, elevation: 4 },
    menuBtn: { padding: 10 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    searchBar: { flexDirection: 'row', alignItems: 'center', margin: 20, paddingHorizontal: 15, borderRadius: 12, height: 50, borderWidth: 1, elevation: 2 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
    categoriesScroll: { paddingLeft: 20, marginBottom: 20 },
    categoryBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1 },
    categoryName: { marginLeft: 8, fontSize: 12, fontWeight: '600' },
    postsList: { paddingHorizontal: 20 },
    postCard: { borderRadius: 15, padding: 18, marginBottom: 20, elevation: 2, borderWidth: 1 },
    postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    userContainer: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    userInfo: { marginLeft: 10 },
    userName: { fontSize: 13, fontWeight: 'bold' },
    userCompany: { fontSize: 11 },
    postTime: { fontSize: 11 },
    postTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    postContent: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
    tagsContainer: { flexDirection: 'row', marginBottom: 12 },
    postTag: { fontSize: 11, fontWeight: 'bold', marginRight: 12 },
    postFooter: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, borderTopWidth: 1 },
    footerAction: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
    footerActionText: { marginLeft: 6, fontSize: 12, fontWeight: '600' },
    fab: { position: 'absolute', bottom: 30, right: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
});

export default CommunityForumsScreen;
