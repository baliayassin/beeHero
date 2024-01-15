import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ROUTES} from '../consts';

const Home = ({navigation}) => {
  const handleEnterApp = () => {
    navigation.navigate(ROUTES.USERS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}></View>
      <TouchableOpacity style={styles.enterBtn} onPress={handleEnterApp}>
        <Text>Enter App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 325,
    paddingLeft: 98,
    paddingRight: 98,
    paddingBottom: 72,
    gap: 213,
  },
  card: {
    width: 194,
    height: 194,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
  },
  enterBtn: {
    display: 'flex',
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFCC2E',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Home;
