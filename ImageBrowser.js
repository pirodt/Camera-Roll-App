import React from 'react'

import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  CameraRoll,
  TouchableHighlight,
  Platform,
  Alert,
} from 'react-native'

import Camera from 'react-native-camera';

const { width, height } = Dimensions.get('window')
let styles
export default class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: 'Image Browser',
  }

  takePicture() {
     this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
