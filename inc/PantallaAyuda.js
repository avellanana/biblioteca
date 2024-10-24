import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

const PantallaAyuda = () => {
  const [esModalVisible, setEsModalVisible] = useState(false);
  const [mostrarFAQ, setMostrarFAQ] = useState(false);
  const [mostrarContacto, setMostrarContacto] = useState(false);
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const toggleFAQ = () => {
    setMostrarFAQ(!mostrarFAQ);
  };

  const toggleContacto = () => {
    setMostrarContacto(!mostrarContacto);
  };

  const cerrarModal = () => {
    setEsModalVisible(false);
  };

  const validarFormulario = () => {
    let valido = true;
    setErrorCorreo('');
    setErrorMensaje('');

    if (!correoElectronico.includes('@')) {
      setErrorCorreo('El correo no es válido');
      valido = false;
    }
    if (mensaje.trim() === '') {
      setErrorMensaje('El mensaje no es válido');
      valido = false;
    }

    if (valido) {
      setMensajeEnviado(true);
      setCorreoElectronico('');
      setMensaje('');
    }
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedorPrincipal}>
      <View style={estilos.cajaContenido}>
        <Text style={estilos.titulo}>Ayuda</Text>
        <TouchableOpacity onPress={toggleFAQ}>
          <Text style={estilos.subtitulo}>
            {mostrarFAQ ? '▲' : '▼'} Preguntas frecuentes
          </Text>
        </TouchableOpacity>
        {mostrarFAQ && (
          <View>
            <Text style={estilos.pregunta}>
              ¿Cómo puedo buscar y descargar un libro?
            </Text>
            <Text style={estilos.respuesta}>
              Para buscar un libro, simplemente utiliza la barra de búsqueda en
              la parte superior de la pantalla e ingresa el título, del libro
              que deseas encontrar. Una vez que encuentres el libro en los
              resultados de búsqueda, haz clic en él y en la pantalla emergente
              presiona el botón "Descargar".{' '}
            </Text>
            <Text style={estilos.pregunta}>
              ¿Es necesario crear una cuenta para descargar libros?
            </Text>
            <Text style={estilos.respuesta}>
              No, no es necesario crear una cuenta para descargar libros, Booke
              es un sitio de búsqueda gratuita y disponible para todos.{' '}
            </Text>
            <Text style={estilos.pregunta}>
              ¿Qué hago si un libro no se descarga correctamente?
            </Text>
            <Text style={estilos.respuesta}>
              Si experimentas problemas al descargar un libro, intenta lo
              siguiente: verifica tu conexión a internet, asegúrate de tener
              suficiente espacio de almacenamiento en tu dispositivo y prueba
              reiniciar la app. Si el problema persiste, por favor, contacta a
              nuestro equipo de soporte técnico a través de la sección
              "¿Necesitas ayuda adicional?" en el botón "Contáctanos",
              proporcionando detalles sobre el problema y el título del libro.{' '}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={toggleContacto}>
          <Text style={estilos.subtitulo}>
            {mostrarContacto ? '▲' : '▼'} ¿Necesitas ayuda adicional?
          </Text>
        </TouchableOpacity>

        {mostrarContacto && (
          <View>
            <Text style={estilos.respuesta}>
              Si tienes una pregunta o sugerencia, nos encantaría escucharte
            </Text>
            <View style={estilos.contenedor}>
              <TouchableOpacity onPress={() => setEsModalVisible(true)}>
                <Text style={estilos.textoBoton}>Contáctanos</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={estilos.contenedorImagen}>
          <Image
            source={require('../img/dudas.png')}
            style={estilos.imagen}
            accessible={true}
            accessibilityLabel="Imagen de persona con preguntas"
          />
        </View>
      </View>

      <Modal transparent={true} visible={esModalVisible} accessibilityLabel="Modal de contacto">
        <View style={estilos.containerModal}>
          <View style={estilos.containerFormulario}>
            {mensajeEnviado ? (
              <>
                <Text style={estilos.exito}>Mensaje enviado exitosamente</Text>
                <TouchableOpacity
                  style={estilos.botonAtras}
                  onPress={() => {
                    setEsModalVisible(false);
                    setMensajeEnviado(false);
                  }}>
                  <Text style={estilos.textoBotonAtras}>Volver</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={estilos.titulo}>Contáctanos</Text>
                <Text style={estilos.parrafo}>
                  Escribe tu duda o sugerencia y la atenderemos lo más pronto
                  posible.
                </Text>
                <TextInput
                  style={estilos.campo1}
                  placeholder="Correo electrónico *"
                  value={correoElectronico}
                  onChangeText={setCorreoElectronico}
                  accessible={true}
                  accessibilityLabel="Campo para correo electrónico"
                />
                {errorCorreo ? (
                  <Text style={estilos.error}>{errorCorreo}</Text>
                ) : null}
                <TextInput
                  style={estilos.campo2}
                  placeholder="Mensaje *"
                  multiline={true}
                  value={mensaje}
                  onChangeText={setMensaje}
                  accessible={true}
                  accessibilityLabel="Campo para mensaje"
                />
                {errorMensaje ? (
                  <Text style={estilos.error}>{errorMensaje}</Text>
                ) : null}
                <Text style={estilos.notaObligatorios}>
                  Los campos marcados con * son obligatorios.
                </Text>
                <TouchableOpacity
                  style={estilos.botonEnviar}
                  onPress={validarFormulario}>
                  <Text style={estilos.textoBotonEnviar}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={estilos.botonAtras}
                  onPress={cerrarModal}>
                  <Text style={estilos.textoBotonAtras}>Volver</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contenedorImagen: {
    alignItems: 'center',
    height: 480,
    resizeMode: 'contain',
  },
  imagen: {
    flex: 1,
    width: 480,
    height: 480,
    resizeMode: 'contain',
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.9)',
    width: '100%',
  },
  containerFormulario: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2EDE4',
    borderRadius: 10,
    width: '90%',
    marginBottom: 60,
    marginTop: 60,
    padding: 10,
    //paddingHorizontal:15,
    //paddingTop:5,
    //marginBottom:50,
  },
  titulo: {
    fontSize: 25,
    color: '#0D0D0D',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RobotoSlab',
  },
  parrafo: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginVertical: 10,
    fontFamily: 'RobotoSlab',
    marginTop: 20,
  },
  campo1: {
    height: 40,
    backgroundColor: 'rgba(81, 115, 105, 0.4)',
    width: '100%',
    borderWidth: 1,
    marginVertical: 10,
    borderColor: '#517369',
    color: 'black',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'RobotoSlab',
  },
  campo2: {
    height: 120,
    backgroundColor: 'rgba(81, 115, 105, 0.4)',
    width: '100%',
    borderWidth: 1,
    marginVertical: 10,
    borderColor: 'gray',
    color: 'black',
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'RobotoSlab',
  },
  botonEnviar: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#517369',
  },
  textoBotonEnviar: {
    color: '#F2EDE4',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlab',
  },
  botonAtras: {
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F2EDE4',
    borderColor: '#517369',
    borderWidth: 1,
  },
  textoBotonAtras: {
    color: '#517369',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'RobotoSlab',
  },
  subtitulo: {
    color: '#0D0D0D',
    marginTop: 30,
    margin: 10,
    fontWeight: 'bold',
    fontSize: 21,
    fontFamily: 'RobotoSlab',
  },
  pregunta: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#517369',
  },
  respuesta: {
    fontSize: 18,
    marginLeft: 20,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  cajaContenido: {
    //marginBottom: 80,
    marginTop: 35,
    //justifyContent:'center',
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
  contenedor: {
    borderWidth: 2,
    borderColor: '#517369',
    borderRadius: 7,
    width: 200,
    height: 50,
    backgroundColor: '#517369',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  notaObligatorios: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  exito: {
    fontSize: 22,
    marginLeft: 20,
    marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: '#f56d49',
  },
});

export default PantallaAyuda;
