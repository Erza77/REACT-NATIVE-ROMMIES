import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import bgImg from './images/background.jpg';
import Header from './components/header';

let UserInfo = require('../Info');

import firebase from 'firebase';

class DashboardScreen extends Component {

    signOut() {
        UserInfo.userID = "";
        UserInfo.groupID = "";
        UserInfo.events = [];
        UserInfo.myMarkedDates = {};
        firebase.auth().signOut();
    }

  

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
            <Header title='DASHBOARD'/>
                <Button title='PROFILE' onPress={() => this.props.navigation.navigate('ProfileHome')}></Button>
                <Button title='Sign Out' onPress={() => this.signOut()}></Button>
            </View >
            </ImageBackground>
        );
    }
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroungContainer: {
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignContent:'center',
    }
});