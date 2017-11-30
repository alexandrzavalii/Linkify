import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import {shareComment} from '../api/linkedin';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ShareButton extends Component {

    shareOnLinkedin() {
        shareComment();
    }
    render() {
        return (
            <TouchableHighlight style={styles.shareButtonContainer} onPress={this.shareOnLinkedin} underlayColor="#0084BF">
                <Icon name="share" size={40} color="#FFFFFF"/>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    shareButtonContainer: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'white',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
