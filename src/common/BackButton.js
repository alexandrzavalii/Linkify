import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default BackButton = (props) => {
    return (
        <TouchableOpacity onPress={props.goBack}>
            <Icon name="ios-arrow-round-back-outline" size={60} color="#000"/>
        </TouchableOpacity>
    )
}
