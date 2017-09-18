import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  CameraRoll,
  TouchableHighlight,
  Image,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import ImageBrowser from './ImageBrowser'
import OpenedImage from './OpenedImage'


let styles
const { width } = Dimensions.get('window')
class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Camera Roll App'
  }

  state = {
    photos: []
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first:30,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  navigate = (route, params) => {
    const { navigate } = this.props.navigation
    params === null ? navigate(route) : navigate(route, params);
  }

  render() {
    this.getPhotos()
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={() => { this.navigate('OpenedImage', {photos: this.state.photos }) } }
        />
        <Button
          title='Take Picture'
          onPress={() => { this.navigate('ImageBrowser') } }
        />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  ImageBrowser: { screen: ImageBrowser },
  OpenedImage: { screen: OpenedImage },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})
