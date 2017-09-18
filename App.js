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


let styles
const { width } = Dimensions.get('window')
class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Camera Roll App'
  }

  state = {
    modalVisible: false,
    photos: [],
    index: null
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first:30,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  navigate = (params) => {
    const { navigate } = this.props.navigation
    navigate('ImageBrowser', params)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='View Photos'
          onPress={() => { this.toggleModal(); this.getPhotos() } }
        />
        <Button
          title='Take Picture'
          onPress={() => { this.navigate({user: 'Lucy'}) } }
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}>
              {
                this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      style={{opacity: i === this.state.index ? 0.5 : 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
                      <Image
                        style={{
                          width: width/3,
                          height: width/3
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  ImageBrowser: { screen: ImageBrowser },
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
    alignItems: 'center'
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
