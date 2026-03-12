import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../common/Color';

const MessageItem = ({item}) => (
  <TouchableOpacity style={styles.messageItem} activeOpacity={0.7}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Icon name="account" size={24} color={Colors.primary} />
      </View>
      {item.online && <View style={styles.onlineBadge} />}
    </View>
    <View style={styles.itemContent}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={[styles.lastMsg, item.unread && styles.unreadMsg]} numberOfLines={1}>
        {item.lastMessage}
      </Text>
    </View>
    {item.unread && (
      <View style={styles.unreadCounter}>
        <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const MessageScreen = () => {
  const messages = [
    {
      id: '1',
      name: 'Nitin Joglekar',
      lastMessage: 'Your application has been received!',
      time: '10:30 AM',
      unread: true,
      unreadCount: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Snehal Patil',
      lastMessage: 'Can you provide more information about your previous projects?',
      time: '09:15 AM',
      unread: false,
      online: false,
    },
    {
      id: '3',
      name: 'Raj Patil',
      lastMessage: 'Hello Raj, welcome to PMInternship!',
      time: 'Yesterday',
      unread: false,
      online: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Messages</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="magnify" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="dots-vertical" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statItem, styles.activeStat]}>
          <Text style={[styles.statText, styles.activeStatText]}>All Chats</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>Unread</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statText}>Groups</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <MessageItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyView}>
            <Icon name="message-outline" size={80} color={Colors.divider} />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingTop: 16,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  statItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  activeStat: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  activeStatText: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary + '20',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemContent: {
    flex: 1,
    marginLeft: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  lastMsg: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  unreadMsg: {
    fontWeight: '700',
    color: Colors.text,
  },
  unreadCounter: {
    backgroundColor: Colors.accent,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadCountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: Colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyView: {
    paddingTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});

export default MessageScreen;
