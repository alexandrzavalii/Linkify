import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import {shareComment} from '../api/linkedin';


export default class ShareButton extends Component {

    shareOnLinkedin() {
        shareComment();
    }
    render() {
        return (
            <TouchableHighlight style={styles.shareButtonContainer} onPress={this.shareOnLinkedin} underlayColor="#0084BF">
                <Image style={styles.shareButtonImage} source={require("../images/share-icon.png")} />
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
    },
    shareButtonImage: {
        width: 30,
        height: 30
    }
})
