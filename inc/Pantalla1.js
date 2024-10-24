import React, { useState, useEffect } from 'react';
import { withExpoSnack } from 'nativewind';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import datos from '../inc/libros.json';

const Pantalla1 = ({ navigateToScreen }) => {
  const [libros, setLibros] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [esModalVisible, setEsModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLibros(datos);
      setCargando(false);
    }, 500);
  }, []);

  const librosFiltrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())||
    libro.autor.toLowerCase().includes(terminoBusqueda.toLowerCase()),
  );

  const mostrarDetalles = (libro) => {
    setLibroSeleccionado(libro);
    setEsModalVisible(true);
  };

  const cerrarModal = () => {
    setEsModalVisible(false);
  };

  const descargarLibro = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View>
        <Text style={estilos.titulo}>Mis libros</Text>
        <View style={estilos.contenedorBusqueda}>
        <TextInput
          style={estilos.input}
          placeholder="Buscar libros"
          onChangeText={(text) => setTerminoBusqueda(text)}
          value={terminoBusqueda}
        />
        <Image source={require('../img/buscar.png')} style={estilos.iconoBusqueda} accessible={true}
  accessibilityLabel="Icono de búsqueda"/>
          </View>
        
        
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {cargando ? (
            <ActivityIndicator size="large" color="#F2BE5C"/>
          ) : librosFiltrados.length > 0 ? (
            librosFiltrados.map((libro, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  estilos.caja,
                  index === librosFiltrados.length - 1
                    ? { marginBottom: 70 }
                    : null,
                ]}
                onPress={() => {
                  mostrarDetalles(libro);
                }}>
                <View style={estilos.contenedorLibro}>
                  <ImageBackground style={estilos.imagen}>
                    <View style={estilos.cajaTexto}>
                      <Text style={estilos.paragraph}>{libro.titulo}</Text>
                    </View>
                    <Image
                      source={{
                        uri:
                          'https://espacio199.com/biblioteca/img/' +
                          libro.nombre_archivo +
                          '.jpg',
                      }}
                      style={estilos.imagenlibro}
                    />
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            ))
          ) : terminoBusqueda ? (
            <Text style={estilos.textoNoEncontrado}>
              No se ha encontrado ningún libro con esos criterios de búsqueda. Intenta con otro título o autor.
            </Text>
          ) : null}
        </View>

        <Modal visible={esModalVisible} transparent={true} accessibilityLabel="Modal de descarga de libros">
          <View style={estilos.modalContainer}>
            <View style={estilos.modalContenido}>
              {libroSeleccionado && (
                <>
                  <Text style={estilos.h2}>{libroSeleccionado.titulo}</Text>
                  <Text style={estilos.autor}>{libroSeleccionado.autor}</Text>
                  <TouchableOpacity
                    style={estilos.botonDescarga}
                    onPress={() =>
                      descargarLibro(
                        'https://espacio199.com/biblioteca/libros/' +
                          libroSeleccionado.nombre_archivo
                      )
                    }>
                    <Text style={estilos.textoBotonModal}>Descargar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={estilos.botonVolver}
                    onPress={cerrarModal}>
                    <Text style={estilos.textoBotonVolver}>Volver</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'RobotoSlab',
    color: '#0D0D0D',
    fontWeight: 'bold',
    marginTop: 35,
  },

  contenedorLibro: {
    alignItems: 'center',
  },

  input: {
    flex:1,
    padding: 10,
    //marginHorizontal: 5,
    marginLeft:30,
    width:'100%',
    borderRadius: 10,
    //backgroundColor: 'rgba(242, 190, 92, 0.7)',
    fontFamily: 'RobotoSlab',
    color: '#0D0D0D',
    fontSize: 18,
  },
  cajaTexto: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  imagen: {
    width: 150,
    height: 260,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#517369',
    borderRadius: 10,
  },
  imagenlibro: {
    width: 110,
    height: 160,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  caja: {
    width: '50%',
    marginBottom: 20,
    alignItems: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Raleway',
    color: '#0D0D0D',
  },

  autor: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Raleway',
    color: '#0D0D0D',
  },

  botonDescarga: {
    backgroundColor: '#517369',
    marginBottom: 10,
    margin: 10,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: '#517369',
    borderWidth: 1,
  },

  botonVolver: {
    backgroundColor: '#F2EDE4',
    borderColor: '#517369',
    borderWidth: 1,
    marginBottom: 10,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },

  textoBotonModal: {
    textAlign: 'center',
    fontFamily: 'RobotoSlab',
    fontSize: 17,
    color: '#F2EDE4',
    justifyContent: 'center',
  },

  textoBotonVolver: {
    textAlign: 'center',
    fontFamily: 'RobotoSlab',
    fontSize: 17,
    color: '#517369',
    justifyContent: 'center',
  },

  paragraph: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F2EDE4',
    fontSize: 17,
    fontFamily: 'Raleway',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },

  modalContenido: {
    width: '80%',
    backgroundColor: '#F2EDE4',
    padding: 20,
    borderRadius: 10,
  },

  textoNoEncontrado: {
    color: '#f56d49',
    margin: 20,
    fontSize: 18,
  },
  
  contenedorBusqueda: {
  flexDirection: 'row', 
  alignItems: 'center', 
  borderRadius: 10,
  borderColor:'#517369',
  borderWidth:1,
  margin: 25,
  backgroundColor:'rgba(242, 190, 92, 0.7)',
  },

  iconoBusqueda:{
    position:'absolute',
    marginLeft:7,
  }
});

export default withExpoSnack(Pantalla1);
