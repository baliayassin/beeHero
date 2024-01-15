import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function PostEditCard({user, onDelete}) {
  return (
    <View style={styles.card}>
      <Text>{`${user.name} (${user.username})`}</Text>
      <Text>Email: {user.email}</Text>
      <Text>
        Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
      </Text>
      <Text>Company: {user.company.name}</Text>
      <TouchableOpacity
        onPress={() => onDelete(user.id)}
        style={styles.deleteButton}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
      },
      deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
      },
})
