import React from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    Platform,
    TouchableOpacity,
} from 'react-native';


export default Item = ({ givenName, familyName, headline, industry, picture, publicProfileUrl, summary }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: picture }}
                    style={styles.thumbnail}
                />
                <Text style={styles.timeText}>10min ago</Text>
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.title}>{givenName} {familyName}</Text>
                <Text style={styles.year}>{headline}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    avatarContainer: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center',
        ...Platform.select({
            ios: { fontFamily: 'Bangla Sangam MN' },
            android: { fontFamily: 'Roboto' }
        }),
    },
    year: {
        textAlign: 'center',
        ...Platform.select({
            ios: { fontFamily: 'Bangla Sangam MN' },
            android: { fontFamily: 'Roboto' }
        }),
    },
    timeText: {
        fontSize: 12,
        borderWidth: 0.5,
        borderColor: 'white',
        ...Platform.select({
            ios: { fontFamily: 'Bangla Sangam MN' },
            android: { fontFamily: 'Roboto' }
        }),
    },
    thumbnail: {
        width: 35,
        height: 35,
        borderWidth: 0.5,
        borderColor: 'white',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});