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
  StatusBar,
  Button
} from 'react-native';
import Dialogflow from "react-native-dialogflow"

import Dialogflow_V2 from "react-native-dialogflow"
import { TextInput } from 'react-native-gesture-handler';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "hello",
      myMessage: "",
      botMessage: ""
    }
    Dialogflow.setConfiguration(
      "cec9711b9662437686a454a19496065d", Dialogflow.LANG_ENGLISH
    );
  }


  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View
            style={{ height: "100%" }}>
            <Text style={{ fontSize: 20, alignSelf: "flex-end", borderWidth: 1, padding: 20 }}>{this.state.myMessage}</Text>
            <Text style={{ fontSize: 20 }}>{this.state.botMessage}</Text>



            {/* <Button
              title="start"
              onPress={() => {
                Dialogflow_V2.onListeningStarted(result => {
                  console.log(result);
                })
              }}
            /> */}
            {/* 
            <View style={{ marginTop: 20 }}
            >
              <Button
                title="Stop"
                onPress={() => {
                  Dialogflow_V2.onListeningFinished(result => {
                    console.log("stop", result);
                  });
                }}
              />


              <View style={{ marginTop: 20 }}>

                


              </View>

            </View> */}

            <View style={{ flexDirection: "row", alignSelf: "flex-end", position: "absolute", bottom: 15 }}>
              <TextInput
                style={{ borderWidth: 2, width: "80%" }}
                value={this.state.message}
                onChangeText={message => this.setState({
                  message
                })}
              />

              <View style={{ margin: 5, marginTop: 10, width: "15%" }}>
                <Button
                  title="Send"
                  onPress={() => {
                    Dialogflow.requestQuery(
                      this.state.message,
                      res =>
                        this.setState({
                          myMessage: res.result.resolvedQuery,
                          botMessage: res.result.fulfillment.speech
                        }),
                      error => console.log(error));
                  }
                  }
                />
              </View>
            </View>


          </View>
        </SafeAreaView>
      </>
    );
  };
}

export default App;
