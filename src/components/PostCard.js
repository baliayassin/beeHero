import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import UserCard from './UserCard';
import {deletePost, deleteUser} from '../store/action';
import ModalSlide from './ModalSlide';
import Icons from 'react-native-vector-icons/FontAwesome5';

export default function PostCard({navigation} = props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const dispatch = useDispatch();

  const selectedUserState = useSelector(state => state.selectedUser);
  const postsState = useSelector(state => state.posts);
  const usersState = useSelector(state => state.users);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const itemsPerRow = 4;

  const onDeleteUser = item => {
    dispatch(deleteUser(item.id));
  };

  const onDeletePost = postId => {
    dispatch(deletePost(postId));
  };

  useEffect(() => {
    setSelectedPostId(null);
  }, [selectedUserState]);

  const renderUserCard = ({item}) => {
    const cardItemStyle =
      item.id === selectedUserState?.id ? styles.selectedCardItem : null;
    return (
      <UserCard
        style={[styles.cardItem, cardItemStyle]}
        user={item}
        onDelete={() => onDeleteUser(item)}
        navigation={navigation}
      />
    );
  };

  const toggleModal = postId => {
    setSelectedPostId(prevId => (prevId === postId ? null : postId));
    setModalVisible(prevVisible => !prevVisible);
  };

  const handelModal = post => {
    setTitle(post.title);
    setDescription(post.body);
    toggleModal(post.id);
  };

  const renderPostCard = ({item: post}) => {
    const isSelected = selectedPostId === post.id;
    const {title, body} = post;

    if (selectedUserState && post.userId === selectedUserState.id) {
      return (
        <View
          style={[
            styles.postCard,
            isSelected ? styles.selectedPostCard : null,
          ]}>
          <TouchableOpacity
            style={styles.editIconButton}
            onPress={() => handelModal(post)}>
            <Icons name="edit" size={15} />
          </TouchableOpacity>
          <Text style={styles.title}>
            Title: {title.length > 10 ? `${title.slice(0, 5)}...` : title}
          </Text>
          <Text style={styles.body}>
            Body: {body.length > 10 ? `${body.slice(0, 5)}...` : body}
          </Text>
          <TouchableOpacity
            onPress={() => onDeletePost(post.id)}
            style={styles.deleteButton}>
            <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const handleData = () => {
    if (!postsState || !selectedUserState) {
      return [];
    }

    const filterData = postsState.filter(
      item => item.userId === selectedUserState.id,
    );
    return filterData;
  };

  return (
    <View>
      <View style={styles.userList}>
        <FlatList
          data={usersState}
          keyExtractor={item => item.id.toString()}
          renderItem={item => renderUserCard(item)}
          numColumns={itemsPerRow}
          columnWrapperStyle={styles.flatlistWrapper}
        />
      </View>
      <View style={styles.postsContainer}>
        {selectedUserState && (
          <View style={styles.postList}>
            <Text style={styles.userNamePostsTitle}>
              User: {selectedUserState.name} Posts
            </Text>
            <View style={styles.postWrapper}>
              <FlatList
                data={handleData()}
                keyExtractor={item => item.id.toString()}
                renderItem={renderPostCard}
                numColumns={3}
                columnWrapperStyle={styles.flatlistWrapper}
              />
            </View>
            {modalVisible && (
              <ModalSlide
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                title={title}
                text={description}
                userId={selectedUserState.id}
                postId={selectedPostId}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 20,
  },
  editButton: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  selectedCardItem: {
    borderWidth: 1,
    borderColor: '#000',
  },
  postWrapper: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postCard: {
    minHeight: 62,
    minWidth: 100,
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 8,
    marginTop: 10,
  },
  body: {
    fontSize: 8,
  },
  closeButton: {
    position: 'absolute',
  },
  postList: {
    width: '90%',
    alignItems: 'center',
  },
  userNamePostsTitle: {
    marginTop: 28,
    marginBottom: 28,
  },
  editIconButton: {
    marginBottom: 10,
    width: 25,
  },
  userList: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  flatlistWrapper: {
    margin: 8,
    gap: 15,
  },
  postsContainer: {
    width: '100%',
  },
  selectedPostCard: {
    borderWidth: 2,
    borderColor: '#000',
  },
});
