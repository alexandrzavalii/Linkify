import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';


export default ProfileButton = (props) => {
    return (
        <TouchableHighlight style={styles.profileButtonContainer} onPress={props.goTo} underlayColor="#0084BF">
            <Icon name="linkedin" size={30} color="#FFFFFF"/>
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
    text: {
        color: 'white',
        fontSize: 35,
    }
})
