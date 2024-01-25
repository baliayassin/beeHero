import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import Back from 'react-native-vector-icons/MaterialIcons';

const MapPage = ({route, navigation}) => {
  const {latitude, longitude} = route.params;
  const customMarkerImage = {uri: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png'};
  const {selectedUser} = useSelector(state => state);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Back name="arrow-back-ios" size={20} />
      </TouchableOpacity>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          coordinate={{latitude, longitude}}
          title={selectedUser.name}
          description={`latitude:${latitude} longitude:${longitude}`}>
          <Image source={customMarkerImage} style={styles.image} />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 400,
    height: 400,
    marginTop: 100,
  },
  backButton: {
    position: 'absolute',
    top: 140,
    left: 30,
    zIndex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default MapPage;
