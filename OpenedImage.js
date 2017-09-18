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
  Modal
} from 'react-native'

const { width, height } = Dimensions.get('window')
let styles
export default class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: 'Image Browser',
  }

  state = {
    modalVisible: false,
    index: null,
    image: null,
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }


  toggleModal = (image) => {
    this.setState({ modalVisible: !this.state.modalVisible });
    this.setState({ image: image })
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.modalContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {
            params.photos.map((p, i) => {
              return (
                <TouchableHighlight
                  style={{opacity: i === this.state.index ? 0.5 : 1}}
                  key={i}
                  underlayColor='transparent'
                  onPress={() => {this.setIndex(i); this.toggleModal(p.node.image.uri) } }
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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ image: null })}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <Image
              style={{
                flex: 1
              }}
              source={{uri: this.state.image}}
            />
          </View>
        </Modal>
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
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})
