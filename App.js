/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  StatusBar,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Dialogflow_V2 from 'react-native-dialogflow';
import FeatherIcons from 'react-native-vector-icons/Feather';

let chatArray = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ isPressed: false });
      },
    );

    this.state = {
      message: null,
      myMessage: null,
      botMessage: null,
      animated: new Animated.Value(0),
      opacityA: new Animated.Value(1),
      chatData: [],
    };
    Dialogflow.setConfiguration(
      'cec9711b9662437686a454a19496065d',
      Dialogflow.LANG_ENGLISH,
    );
  }

  _runAnimation() {
    const { animated, opacityA } = this.state;

    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1000,

        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,

        }),
      ])
    ).start();
  }
  _stopAnimation() {
    const { animated, opacityA } = this.state;
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated),
        Animated.timing(opacityA),
      ])
    ).stop();
  }

  _onPress = () => {
    this.setState({
      isPressed: !this.state.isPressed,
    });
  }

  handleResponse = res => {
    chatArray.push({
      send: res.result.resolvedQuery,
      receive: res.result.fulfillment.speech,
    });
    this.setState({
      message: null,
      chatData: chatArray,
    });
  };

  renderChats = ({ item }) => {
    return (
      <View>
        <View style={{ marginTop: 10, marginRight: 3 }}>
          <Text
            style={{
              fontSize: 13,
              alignSelf: 'flex-end',
              borderRadius: 14,
              padding: item.send ? 7 : 0,
              backgroundColor: '#22AAEB',
              color: 'white',
              minWidth: 20,
            }}>
            {item.send}
          </Text>
        </View>

        {item.receive && (
          <View style={{ marginTop: 10, marginLeft: 3 }}>
            <Text
              style={{
                fontSize: 13,
                borderRadius: 14,
                padding: item.receive ? 7 : 0,
                backgroundColor: 'gray',
                color: 'white',
                marginBottom: 15,
                width: '70%',
              }}>
              {item.receive}
            </Text>
          </View>
        )}
      </View>
    );
  };

  renderChatBox = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <View style={{}}>
          <TouchableOpacity onPress={this._onPress}>
            {this._micButton()}
          </TouchableOpacity>
        </View>
        <TextInput
          style={{ borderWidth: 2, height: 35, width: '70%' }}
          value={this.state.message}
          onChangeText={message =>
            this.setState({
              message,
            })
          }
        />
        <View style={{ marginLeft: 5 }}>
          <Button
            title="Send"
            onPress={() => {
              Dialogflow.requestQuery(
                this.state.message,
                this.handleResponse,
                error => console.log(error),
              );
            }}
          />
        </View>
      </View>
    );
  };

  _micButton() {
    const { isPressed, animated, opacityA } = this.state;
    if (isPressed) {
      //some function
      this._runAnimation();
      return (
        <View style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Animated.View style={{
            width: 40,
            position: 'absolute',
            bottom: 0,
            height: 40,
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: opacityA,
            backgroundColor: '#900',
            transform: [
              {
                scale: animated,
              },
            ],
          }} />
          <FeatherIcons name="mic" size={25} color="#fff" />
        </View >
      );
    } else {
      return (
        <View style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
          <FeatherIcons name="mic" size={25} color="#900" />
        </View>
      );
    }
  }

  renderFooter = () => {
    return <View style={{ padding: 50 }} />;
  };
  render() {
    const { chatData } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{ height: '99%' }}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({ animated: true });
              }}>
              <FlatList
                data={chatData}
                extraData={chatData}
                renderItem={this.renderChats}
                keyExtractor={index => console.log('---->index', index)}
                ListEmptyComponent={this.renderFooter}
              />
            </ScrollView>
            {this.renderChatBox()}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
