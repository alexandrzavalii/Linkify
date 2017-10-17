import React, { Component } from 'react'
import { Image , View, StyleSheet} from 'react-native'

export default Avatar = () => {
    return (
        <View style={styles.avatarContainer}>
            <View style={styles.avatarShadow}>
            <Image style={styles.image} source={require("../../images/ava.jpg")}/>        
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    avatarContainer: {   
        flex: 1,
    },
    avatarShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        borderRadius: 75,
        shadowOpacity: 0.8,
        shadowRadius: 1,
        // marginLeft: 5,
        // marginRight: 5,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 8,
        borderColor: 'white',
        backgroundColor: 'transparent',
        
    }
})    