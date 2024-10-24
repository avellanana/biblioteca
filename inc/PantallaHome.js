import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const PantallaHome = ({ navigateToScreen }) => {
  return (
    <View style={estilos.containerFondo}>
      <View style={estilos.contenidoCentrado}>
        <Text style={estilos.parrafo}>
          Descarga gratis tu próximo libro en formato epub
        </Text>
        <TouchableOpacity
          style={estilos.boton}
          onPress={() => navigateToScreen('Screen2')}>
          <Text style={estilos.textoBoton}>Explorar</Text>
        </TouchableOpacity>
      </View>
      <View style={estilos.contenedorImagen}>
        <Image
          source={require('../img/leyendo.png')}
          style={estilos.imagen}
          accessible={true}
          accessibilityLabel="Imagen de mujer leyendo"
        />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  containerFondo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 70,
  },
  contenidoCentrado: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 100,
  },
  imagen: {
    width: 280,
    height: 280,
  },
  parrafo: {
    color: '#0D0D0D',
    fontFamily: 'Raleway',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    marginTop: 150,
  },
  boton: {
    //borderWidth:2,
    borderColor: '#0D0D0D',
    borderRadius: 7,
    width: 200,
    height: 50,
    backgroundColor: '#517369',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textoBoton: {
    color: '#F2EDE4',
    fontFamily: 'RobotoSlab',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  contenedorImagen: {
    paddingTop: 20,
  },
});

export default PantallaHome;
