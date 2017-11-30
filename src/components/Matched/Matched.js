import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getMatches } from '../../api/matches';
import BackButton from '../../common/BackButton';
import Item from './Item';

export default class MatchedComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    componentDidMount() {
        getMatches(20).then(people => {
            console.log('people',people);
            this.setState({ people })
        });
    }

    render() {
        return (
            <LinearGradient
                colors={['#FFFFFF', '#0084BF']}
                locations={[0, 0.8]}
                style={styles.container}>

                <Header goBack={()=>this.props.navigation.goBack()}/>

                <View style={styles.box2}>
                    <FlatList
                        data={this.state.people}
                        renderItem={({ item }) => <Item {...item} />}
                    />
                </View>


            </LinearGradient>
        )
    }
}

{/* <View style={styles.mainContainer}>


</View> */}

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftHeaderContainer}>
                <BackButton goBack={props.goBack}/>
            </View>
            <View style={styles.rightHeaderContainer}>
                <Text>Header</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    //content
    box2: {
        flex: 10,
    },
    //footer
    box3: {
        flex: .5,
        backgroundColor: '#e3aa1a'
    },
    bigText: {
        color: 'black',
        fontSize: 100
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 5,
        borderBottomColor: '#47315a',
        borderBottomWidth: 0.5
    },
    leftHeaderContainer: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "center"
    },
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row"
    },
})
