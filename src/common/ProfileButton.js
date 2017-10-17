import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';



export default ProfileButton = (props) => {
    return (
        <TouchableHighlight style={styles.profileButtonContainer} onPress={props.goToProfile} underlayColor="#0084BF">
            <Image style={styles.profileButtonImage} source={require("../images/profile-icon.png")} />
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    profileButtonContainer: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    },
    profileButtonImage: {
        width: 30,
        height: 30,
    }
})
