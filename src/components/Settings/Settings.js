import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import {Logout} from '../../auth';
// import Tinder from './Tinder';
import TimerToNextBatch from '../../common/TimerToNextBatch';


export default class SettingsComponent extends Component {

  constructor(props){
    super(props);
    this.LogoutFromLinkedin = this.LogoutFromLinkedin.bind(this);
  }

  LogoutFromLinkedin() {
    // Logout();
    console.log("this.props", this);
    // this.props.navigation.navigate("LoggedOut")
  }
  render() {
    return (
      <View style={styles.container} behavior="padding">
        <View style={styles.logoContainer}>
          {/* <Tinder/> */}
          <Text>Settings</Text>
          <Text>Untill your next suggestion:</Text>
          <TimerToNextBatch/>
          
          <TouchableOpacity>
          <Text>Tell a friend and get 10 more swipes</Text>
          </TouchableOpacity>
          <Text>Edit my Interests</Text>
          
        </View>
    </View>
    )}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: "#ffffff",
    marginTop: 20,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  }
})
