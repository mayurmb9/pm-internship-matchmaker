import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColors } from '../common/Color';
import { getStrings } from '../common/String';

const AICareerCoachScreen = ({ navigation }) => {
    const { isDarkTheme, locale } = useSelector((state) => state.user);
    const Colors = getColors(isDarkTheme);
    const Strings = getStrings(locale);
    
    const [messages, setMessages] = useState([
        { id: 1, text: locale === 'hi' ? 'नमस्ते! मैं आपका एआई करियर कोच हूं। मैं आज आपकी कैसे मदद कर सकता हूं?' : "Hello! I'm your AI Career Coach. How can I help you today?", isUser: false },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim() === '') return;

        const newUserMsg = { id: Date.now(), text: input, isUser: true };
        setMessages([...messages, newUserMsg]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = { 
                id: Date.now() + 1, 
                text: locale === 'hi' ? "यह एक बढ़िया प्रश्न है! आपकी प्रोफ़ाइल के आधार पर, मैं पीएम भूमिकाओं के लिए चुस्त कार्यप्रणाली और एसक्यूएल पर ध्यान केंद्रित करने की सलाह देता हूं।" : "That's a great question! Based on your profile, I recommend focusing on Agile methodologies and SQL for internship roles.", 
                isUser: false 
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageRow, item.isUser ? styles.userRow : styles.aiRow]}>
            {!item.isUser && (
                <View style={[styles.aiIcon, { backgroundColor: Colors.surface, borderColor: Colors.divider }]}>
                    <Icon name="android" size={20} color={Colors.primary} />
                </View>
            )}
            <View style={[
                styles.messageBubble, 
                item.isUser ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.surface, borderColor: Colors.divider, borderWidth: 1 }
            ]}>
                <Text style={[styles.messageText, { color: item.isUser ? Colors.white : Colors.text }]}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]} edges={['top', 'bottom']}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            
            {/* Header */}
            <View style={[styles.header, { backgroundColor: Colors.primary }]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuBtn}>
                    <Icon name="bars" size={20} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text style={styles.title}>{Strings.AI_CAREER_COACH}</Text>
                    <Text style={styles.status}>Online | Smart Guidance</Text>
                </View>
                <Icon name="robot" size={24} color={Colors.white} />
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.chatArea}
                />

                <View style={[styles.inputContainer, { backgroundColor: Colors.surface, borderTopColor: Colors.divider }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: isDarkTheme ? Colors.background : '#f8f9fa', color: Colors.text, borderColor: Colors.divider }]}
                        placeholder="Ask me anything..."
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor={Colors.grey}
                    />
                    <TouchableOpacity 
                        style={[styles.sendButton, { backgroundColor: Colors.primary }]} 
                        onPress={sendMessage}
                    >
                        <Icon name="paper-plane" size={18} color={Colors.white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
        padding: 15,
        elevation: 4,
    },
    menuBtn: {
        padding: 10,
    },
    headerText: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    status: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
    },
    chatArea: {
        padding: 15,
        paddingBottom: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 15,
        maxWidth: '85%',
    },
    userRow: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    aiRow: {
        alignSelf: 'flex-start',
    },
    aiIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 1,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 15,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 15,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        marginRight: 10,
        borderWidth: 1,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
});

export default AICareerCoachScreen;
