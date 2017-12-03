import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class LoginButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity disabled={this.props.disabled} onPress={this.props.handleLoginClick} style={styles.buttonContainer}>
          {!this.props.disabled ?
            <Text style={styles.buttonText}>
              Login with Linkedin
          </Text> :
            <Text style={styles.buttonText}>Loading..</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
