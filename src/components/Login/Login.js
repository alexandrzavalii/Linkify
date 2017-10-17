import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import LoginButton from './LoginButton';
import LinkedInModal from 'react-native-linkedin'
import { saveSession } from '../../auth';
import { getLinkedinCredentials } from '../../api/firebase';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { clientID: '', clientSecret: '', redirectUri: '', permissions: [], gettingCredentials: true }
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.openLinkedinModal = this.openLinkedinModal.bind(this);
  }

  componentDidMount() {
    getLinkedinCredentials().then(credentials => this.setState({ ...credentials, gettingCredentials: false }))
  }

  onSuccess(data) {
    saveSession(data);
    this.props.navigation.navigate('Matches');
  }

  onError(error) {
    console.log("ERROR", error);
  }

  openLinkedinModal() {
    this.modal.open()
  }
  render() {
    const {clientID, clientSecret, redirectUri, permissions, gettingCredentials} = this.state;

    return (
      <View style={styles.container} behavior="padding">
        <LinkedInModal
          ref={ref => {
            this.modal = ref
          }}
          clientID={clientID}
          clientSecret={clientSecret}
          permissions={permissions}
          redirectUri={redirectUri}
          onSuccess={this.onSuccess}
          onError={this.onError}
          linkText={''}
        />

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/logo.png')} />
          <Text style={styles.title}>This app lets you find new connections on Linkedin</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginButton disabled={gettingCredentials} handleLoginClick={this.openLinkedinModal} navigation={this.props.navigation} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
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
