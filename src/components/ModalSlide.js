import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updatePost} from '../store/action';

const ModalSlide = ({
  title,
  text,
  userId,
  setModalVisible,
  modalVisible,
  postId,
}) => {
  const [titleInput, setTitleInput] = useState();
  const [description, setDescription] = useState();
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const handleSave = () => {
    const trimmedTitle = titleInput ? titleInput.trim() : '';
    const trimmedDescription = description ? description.trim() : '';

    if (!trimmedTitle) {
      setTitleError('Title cannot be empty');
      return;
    }

    if (!trimmedDescription) {
      setDescriptionError('Description cannot be empty');
      return;
    }

    setTitleError('');
    setDescriptionError('');

    dispatch(
      updatePost({
        userId: postId,
        newTitle: titleInput,
        newText: description,
      }),
    );
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder={title}
              style={styles.titleInput}
              value={titleInput}
              ref={titleRef}
              onSubmitEditing={() => bodyRef.current.focus()}
              onChangeText={text => setTitleInput(text)}
            />
            {titleError ? (
              <Text style={styles.errorText}>{titleError}</Text>
            ) : null}
            <TextInput
              placeholder={text}
              style={styles.textInput}
              value={description}
              ref={bodyRef}
              onChangeText={text => setDescription(text)}
            />
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.save}
                onPress={() => handleSave()}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#737475',
    width: 276,
    height: 300,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    textAlign: 'center',
  },
  titleInput: {
    width: 244,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BEC0C2',
    paddingBottom: 20,
    paddingLeft: 10,
  },
  textInput: {
    width: 244,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BEC0C2',
    marginTop: 16,
    paddingBottom: 70,
    paddingLeft: 10,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  cancel: {
    flex: 1,
    marginRight: 8,
    width: 100,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BEC0C2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    flex: 1,
    marginLeft: 8,
    width: 100,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#FFCC2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 1,
  },
});
export default ModalSlide;
