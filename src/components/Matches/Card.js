import React, { Component } from 'react'
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import Avatar from './Avatar';

export default Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.avatarContainer}>
                <Avatar />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.textFlexContainer}>
                    <Text style={styles.text}>
                        <Text style={styles.textFieldName}>Name:</Text> {props.firstName} {props.secondName}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.textFieldName}>Headline:</Text> {props.headline}</Text>
                    <Text style={styles.text}><Text style={styles.textFieldName}>Industry:</Text> {props.industry}</Text>
                    <Text style={styles.text}><Text style={styles.textFieldName}>Connections:</Text> {props.numConnections}</Text>
                    <Text style={styles.text}><Text style={styles.textFieldName}>Summary:</Text> {props.headline}</Text>
                    
                </View>
                <View style={styles.counterContainer}>
                  <Text style={[styles.text, styles.textCounter]}>{props.index + 1}/{props.totalNumber}</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity style={[styles.button, styles.buttonSkip]} onPress={props.swipeLeft}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonConnect]} onPress={props.swipeRight}>
                    <Text style={styles.buttonText}>Connect</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: -50,
    },
    textContainer: {
        flex: 2,
        width: '80%',
        paddingTop: 20,
        borderColor: '#283E4A',
        borderTopWidth: 1,
        alignItems: 'center',
        flexDirection: 'column',        
        justifyContent: 'space-between',
    },
    counterContainer: {
      top: 10  
    },
    textCounter: {
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: 4
    },
    textFlexContainer: {
        flexDirection: 'column',        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        color: '#283E4A',
        ...Platform.select({
            ios: { fontFamily: 'Bangla Sangam MN' },
            android: { fontFamily: 'Roboto' }
        }),
        fontSize: 18,
    },
    textFieldName: {
        fontWeight: 'bold'
    },
    footerContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    button: {
        flex: 1,
        height: 50,
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Bangla Sangam MN' },
            android: { fontFamily: 'Roboto' }
        }),
    },
    buttonSkip: {
        backgroundColor: '#283E4A',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
    },
    buttonConnect: {
        backgroundColor: '#0084BF',
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
    }
})    