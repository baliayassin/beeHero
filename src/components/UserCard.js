import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {ROUTES} from '../consts';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setPosts} from '../store/action';
import {getUserPosts} from '../services/ajax.service';

export default function UserCard({user, onDelete, navigation}) {
  const selectedUserState = useSelector(state => state.selectedUser);
  const {posts} = useSelector(state => state);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);

  const handleSelectUser = async () => {
    if (selectedUserState?.id === user.id) {
      dispatch(selectUser(null));
    } else {
      dispatch(selectUser(user));
      const isUserPostsPresent = posts.some(item => item.userId === user.id);
      if (!isUserPostsPresent && !isFetching) {
        try {
          const data = await getUserPosts(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
          );
          dispatch(setPosts(data));
        } catch (error) {
          console.error('Error fetching user posts:', error);
        } finally {
          setIsFetching(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isFetching) {
      return;
    }
    navigation.navigate(ROUTES.POST_CARD);
  }, [selectedUserState, isFetching]);

  const handleGeo = () => {
    navigation.navigate('map_page', {
      latitude: parseFloat(user.address.geo.lat),
      longitude: parseFloat(user.address.geo.lng),
    });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleSelectUser();
      }}>
      <View
        style={[
          styles.card,
          Platform.OS === 'ios' && styles.cardIOS,
          selectedUserState?.id === user.id && styles.selectedCard,
        ]}>
        <Text style={styles.text}>{user.name}</Text>
        <Text style={styles.text}>{user.username}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <TouchableOpacity onPress={() => handleGeo()}>
          <Text style={[styles.text, styles.textCordenate]}>
            {user.address.geo.lat}, {user.address.geo.lng}
          </Text>
        </TouchableOpacity>

        <Text style={styles.text}>{user.company.name}</Text>
        <TouchableOpacity
          onPress={() => onDelete(user.id)}
          style={styles.deleteButton}>
          <Text style={styles.close}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  cardIOS: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  text: {
    fontSize: 6,
  },
  textCordenate: {
    fontWeight: 'bold',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: 'black',
  },
  close: {
    position: 'absolute',
    right: 1,
  },
});
