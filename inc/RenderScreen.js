import React from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';

const RenderScreen = () => (
    <View style={styles.capaColor}>
      <Image source={require('../img/logo.png')} style={styles.logo} />
    </View>
);

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
  },
});

export default RenderScreen;
