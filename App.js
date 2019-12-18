/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, View, Text, StatusBar, Button, ScrollView, FlatList } from 'react-native';
import Dialogflow from 'react-native-dialogflow';
import Dialogflow_V2 from 'react-native-dialogflow';
import { TextInput } from 'react-native-gesture-handler';

let chatArray = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      myMessage: null,
      botMessage: null,
      chatData: [],
    };
    Dialogflow.setConfiguration(
      'cec9711b9662437686a454a19496065d',
      Dialogflow.LANG_ENGLISH,
    );
  }

  handleResponse = res => {
    chatArray.push({
      send: res.result.resolvedQuery,
      receive: res.result.fulfillment.speech,
    });
    this.setState({
      chatData: chatArray,
    });
  };

  renderChats = ({ item }) => {
    console.log('---->item', item);
    return (
      <ScrollView>
        <View style={{ marginTop: 10, marginRight: 3 }}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'flex-end',
              borderRadius: 14,
              padding: item.send ? 7 : 0,
              backgroundColor: '#22AAEB',
              color: 'white',
            }}>
            {item.send}
          </Text>
        </View>

        {item.receive && (
          <View style={{ marginTop: 10, marginLeft: 3 }}>
            <Text
              style={{
                fontSize: 20,
                borderRadius: 14,
                padding: item.receive ? 7 : 0,
                backgroundColor: 'gray',
                color: 'white',
              }}>
              {item.receive}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  };

  render() {
    const { chatData } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{ height: '100%' }}>
            <FlatList
              data={chatData}
              extraData={chatData}
              renderItem={this.renderChats}
              keyExtractor={index => console.log('---->index', index)}
            />

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: 15,
              }}>
              <TextInput
                style={{ borderWidth: 2, width: '80%' }}
                value={this.state.message}
                onChangeText={message =>
                  this.setState({
                    message,
                  })
                }
              />
              <View style={{ margin: 5, marginTop: 10, width: '15%' }}>
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
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
