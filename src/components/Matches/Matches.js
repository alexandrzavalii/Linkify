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
import LinearGradient from 'react-native-linear-gradient';
import Settings from '../Settings/Settings';
import { getMatches } from '../../api/matches';


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
    this.onSwipedAllCards = this.onSwipedAllCards.bind(this);

  }

  componentDidMount() {
    // getMatches(0).then(cards => {
    //   this.setState({ cards, loading: false, noCards: false })
    // });
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
  
  render() {
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