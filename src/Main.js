/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { isLoggedin } from "./auth";
import { createRootNavigator } from "./router";


import firebase from 'react-native-firebase';
import { getUserData } from './api/linkedin';
import { prepareUserData, updateUser } from './api/firebase';

const defaultApp = firebase.app();

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }
  componentWillMount() {
    isLoggedin()
      .then(signedIn => this.setState({ signedIn, checkedSignIn: true }))
      .then(getUserData().then(prepareUserData).then(updateUser))
      .catch(err => console.log('err', err));
  }


  render() {
    const { checkedSignIn, signedIn } = this.state;
    if (!checkedSignIn) {
      return <Text>Loading...</Text>;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
