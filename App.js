/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, View } from 'react-native';

import TokenOauth from './lib/generic-token-oauth';

export default class App extends Component {
  handleLogin = () => {
    const tokenOauth = new TokenOauth({
      authType: 'accessToken',
      clientId: '518072664971-avgaarhc01pco9pkpchdmve3b64c2jmc.apps.googleusercontent.com',
      clientSecret: 'XqE3itZXB5R27qD-kGSJKdk7',
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    const authorizationCode = '4/3gGDqr7KbGGSALD5QsWSrJWKK2Dwl2An8VSEwpI6LaSDvTgsXWMbXGUdM6vjFT5dFJ2yf0CV16FxtSljcnS8mwM';
    tokenOauth.authenticate(authorizationCode).then(({ err, userProfile }) => {
      console.log('err', err);
      console.log('userProfile', userProfile);
    });
  }

  render = () => (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        title="Login"
        onPress={this.handleLogin}
      />
    </View>
  )
}
