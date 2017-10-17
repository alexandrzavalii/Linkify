import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import { getDateToNextBatch } from '../api/firebase';


export default class TimerToNextBatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: '',
            hours: '',
            minutes: '',
            seconds: '',
            dateToNextBatch: '',
            loading: true,
        }
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        getDateToNextBatch().then(date => {
            const seconds = date.getSeconds();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            this.setState({
                seconds, minutes, hours, loading: false, dateToNextBatch: date
            })

            const intervalId = setInterval(this.timer, 1000);
            this.setState({ intervalId });

        });



    }

    timer() {
        this.setState((state, props) => {
            const oldDate = state.dateToNextBatch;
            let newDate = new Date(oldDate.getTime() - 1000);

            const seconds = newDate.getSeconds();
            const minutes = newDate.getMinutes();
            const hours = newDate.getHours();

            return {
                seconds, hours, minutes, dateToNextBatch: newDate
            }
           });

    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        if (this.state.loading) {
            return <Text>XX-XX</Text>;
        }
        return (
            <View>
                <Text style={styles.timerText}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    timerText: {
        color: 'white',
        fontSize: 25
    },
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
