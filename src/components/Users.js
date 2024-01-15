import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {getUsers} from '../services/ajax.service';
import UserCard from './UserCard';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUser, setUsers} from '../store/action';

export default function Users({navigation}) {
  const dispatch = useDispatch();
  const {users} = useSelector(state => state);
  const itemsPerRow = 4;
  useEffect(() => {
    fetchUsers = async () => {
      try {
        const res = await getUsers(
          'https://jsonplaceholder.typicode.com/users',
        );
        dispatch(setUsers(res));
      } catch (error) {}
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = userId => {
    dispatch(deleteUser(userId));
  };

  const renderUserCard = ({item}) => (
    <UserCard
      style={styles.cardItem}
      user={item}
      onDelete={handleDeleteUser}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <FlatList
          data={users}
          keyExtractor={item => item?.id.toString()}
          renderItem={renderUserCard}
          numColumns={itemsPerRow}
          columnWrapperStyle={{margin: 8, gap: 15}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    alignItems: 'center',
  },
  cardItem: {
    flex: 1,
    width: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
