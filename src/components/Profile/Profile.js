import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { Logout } from '../../auth';
import { getUserData, refreshAccessToken } from '../../api/linkedin';
import { updateUser, prepareUserData } from '../../api/firebase';
export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
        }
        this.LogoutFromLinkedin = this.LogoutFromLinkedin.bind(this);
        this.goBack = this.goBack.bind(this);

    }
    componentDidMount() {
        getUserData().then(prepareUserData).then((userData) => {
            updateUser(userData);
            this.setState({ user: userData });
        });
    }

    LogoutFromLinkedin() {
        // Logout();
        console.log("this.props", this);
        // this.props.navigation.navigate("LoggedOut")
    }

    goBack() {
        this.props.navigation.goBack();
    }
    render() {
        if (!this.state.user) {
            return <Text>Loading..</Text>
        }
        return (
            <View style={styles.container} behavior="padding">
                <View style={styles.logoContainer}>
                    <Text>Home Page</Text>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: this.state.user.pictureUrl }}
                    />
                    <Text>Family Name: {this.state.user.lastName}</Text>
                    <Text>First Name: {this.state.user.firstName}</Text>
                    {/* <Text>Location: {this.state.user.location}</Text> */}
                    <Text>Headline: {this.state.user.headline}</Text>
                    <Text>Connections: {this.state.user.numConnections}</Text>
                    <Text>Summary: {this.state.user.summary}</Text>
                    <TouchableOpacity style={styles.buttonBack} onPress={this.goBack}>
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text> Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    buttonBack: {
        width: 100,
        height: 100,
        alignItems: 'center',
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    title: {
        color: "#ffffff",
        marginTop: 20,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    }
})
