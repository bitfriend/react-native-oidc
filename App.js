/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class App extends Component {
  render = () => (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        title="Test Login"
        onPress={() => console.log(123)}
      />
    </View>
  )
}
