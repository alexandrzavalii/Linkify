import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { Logout } from '../../auth';
import Tinder from './Tinder';
import ProfileButton from '../../common/ProfileButton';
import ShareButton from '../../common/ShareButton';
import MatchesButton from '../../common/MatchesButton';

import LinearGradient from 'react-native-linear-gradient';
import Settings from '../Settings/Settings';
import { getMatches } from '../../api/matches';

import { getCards } from '../../api/firebase';



export default class MatchesComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      noCards: true,
      loading: true,
      cards: []
    }

    this.LogoutFromLinkedin = this.LogoutFromLinkedin.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToMatched = this.goToMatched.bind(this);
    this.onSwipedAllCards = this.onSwipedAllCards.bind(this);

  }


  componentDidMount() {
    getCards().then(users => {
      if (users.length) {
        this.setState({ 
          cards: users, 
          noCards: false 
        })
      }
    });
  }


  onSwipedAllCards() {
    this.setState({
      noCards: true
    })
  }

  LogoutFromLinkedin() { }

  goToProfile() {
    this.props.navigation.navigate('Profile');
  }
  goToMatched() {
    this.props.navigation.navigate('Matched');    
  }
  render() {
    console.log('snap.val()', this.state.cards);
    
    return (
      <LinearGradient
        colors={['#FFFFFF', '#0084BF']}
        locations={[0, 0.8]}
        style={styles.container}>
        <View style={styles.tinderContainer}>

          {this.state.noCards ?
            <Settings /> :
            <Tinder onSwipedAllCards={this.onSwipedAllCards} cards={this.state.cards} goToProfile={this.goToProfile} />
          }
        </View>
        <View style={styles.buttonsContainer}>
          <ProfileButton goToProfile={this.goToProfile} />
          <MatchesButton goTo={this.goToMatched}/>
          <ShareButton />
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
  tinderContainer: {
    flex: 5,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 10
  },
})