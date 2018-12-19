/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor() {
      super();
      this.state = {
          textArr: ['军事','新闻','音乐']
      }
  }
  render() {
    const texts = this.state.textArr.map((item,index)=>{
        return <Text 
                  onPress={() => {
                    Alert.alert(`你点击了${item}`);
                  }}
                  key={index}
                >{item}</Text>
    })
    return (
      <View style={styles.container}>
        <View style={{...styles.box, backgroundColor: 'powderblue'}} />
        <View style={styles.box}>
            {texts}
        </View>
        <View style={{...styles.box, backgroundColor: 'yellow'}}>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
