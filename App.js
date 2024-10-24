import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import PantallaHome from './inc/PantallaHome';
import Pantalla1 from './inc/Pantalla1';
import PantallaAyuda from './inc/PantallaAyuda';
import { useFonts } from 'expo-font';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('PantallaHome');
  const [isLoading, setIsLoading] = useState(true);

  const [fonts] = useFonts({
    Raleway: require('./inc/font/Raleway.ttf'),
    RobotoSlab: require('./inc/font/RobotoSlab-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <View style={estilos.centrado}>
          <Image source={require('./img/logo.png')} style={estilos.logo} />
          <Text style={estilos.textoLogo}>Booke</Text>
          <ActivityIndicator
            size="large"
            color="orange"
            style={estilos.rueda}
          />
        </View>
      );
    }

    switch (currentScreen) {
      case 'PantallaHome':
        return <PantallaHome navigateToScreen={navigateToScreen} />;
      case 'Screen2':
        return <Pantalla1 navigateToScreen={navigateToScreen} />;
      case 'Screen3':
        return <PantallaAyuda navigateToScreen={navigateToScreen} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <View style={estilos.webContainer}>
        <TouchableHighlight
          onPress={() => navigateToScreen('PantallaHome')}
          style={estilos.button}
          underlayColor="#F2EDE4">
          <Image
            source={require('./img/casa.png')}
            style={{ width: 24, height: 24 }}
            accessible={true}
            accessibilityLabel="Home"
          />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigateToScreen('Screen2')}
          style={estilos.button}
          underlayColor="#F2EDE4">
          <Image
            source={require('./img/libro.png')}
            style={{ width: 24, height: 24 }}
            accessible={true}
            accessibilityLabel="Mis libros"
          />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigateToScreen('Screen3')}
          style={estilos.button}
          underlayColor="#F2EDE4">
          <Image
            source={require('./img/pregunta.png')}
            style={{ width: 24, height: 24 }}
            accessible={true}
            accessibilityLabel="Ayuda"
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  webContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 50,
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#F2EDE4',
    borderTopColor: '#f56d49',
    borderTopWidth: 1,
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  rueda: {
    marginTop: 80,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  textoLogo: {
    fontFamily: 'Raleway',
    fontSize: 25,
    color: '#517369',
    fontWeight: 'bold',
  },
});

export default App;
