import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";

// import Icon from 'react-native-vector-icons/FontAwesome'

import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";

import Settings from "./components/Settings/Settings";
import Matches from "./components/Matches/Matches";


export const LoggedOut = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login"
        }
    }
},
{
    headerMode: "none"
});

const LoggedIn = StackNavigator(
    {
        Matches: {
            screen: Matches,
            navigationOptions: {
                //   title: "Matches",
                // tabBarIcon: ({ tintColor }) => <Icon size={ 20 } name={ 'users' } color={ tintColor }/>
            }
        },
        Profile: {
            screen: Profile,
        }
    },
    {
        headerMode: "none"
    }
);

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            LoggedIn: {
                screen: LoggedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            LoggedOut: {
                screen: LoggedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "LoggedIn" : "LoggedOut"
        }
    );
};
