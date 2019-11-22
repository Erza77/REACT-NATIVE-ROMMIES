import React, { Component } from 'react';
import { View, TextInput, StyleSheet,ImageBackground, Button, Text, DatePickerIOS } from 'react-native';
import bgImg from './images/background.jpg';
import Header from './components/header';

let UserInfo = require('../Info');

import firebase from 'firebase';

class EventFormScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventDate: new Date(),
            eventName: '',
            eventDesc: ''
        }

        this.setDate = this.setDate.bind(this);
    }

    createEvent() {
        console.log("creating event with...");
        console.log(this.state.eventName);
        console.log(this.state.eventDesc);
        console.log(this.state.eventDate);
        console.log(this.state.owner);

        let date = this.state.eventDate.toLocaleDateString();
        let year = date.match(/\d{4}/g)[0];
        let month = date.match(/\d{1,2}/g)[0];
        let day = date.match(/\d{1,2}/g)[1];
        date = year + '-' + month + '-' + day;

        firebase.database().ref('/groups/' + UserInfo.groupID + '/events/').push({

            date: date,
            name: this.state.eventName,
            desc: this.state.eventDesc,
            requestee: '',
            owner: UserInfo.userID,
            isClaimable: false
        });

        this.setState({ eventName: '', eventDesc: '', eventDate: new Date() });
        this.props.navigation.navigate('ProfileHome');
    }

    setDate(newDate) {
        this.setState({ eventDate: newDate });
    }

    render() {
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <View style={styles.container} >
            <Header title='ADD TASK'/>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter Task Name</Text>
                    <TextInput style={{ fontSize: 28 }} value={this.state.eventName} onChangeText={eventName => this.setState({ eventName })} placeholder="event name"></TextInput>
                </View>
                <View style={styles.eventInfo}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter Task Description</Text>
                    <TextInput style={{ fontSize: 28 }} value={this.state.eventDesc} onChangeText={eventDesc => this.setState({ eventDesc })} placeholder="event description" ></TextInput>
                </View>
                <View style={styles.datepicker}>
                    <DatePickerIOS date={this.state.eventDate} onDateChange={this.setDate} />
                </View>
                <Button title="SUBMIT" onPress={() => this.createEvent()} />
                <Button title="BACK" onPress={() => this.props.navigation.navigate('ProfileHome')} />
            </View >
            </ImageBackground>
        );
    }
}

export default EventFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    backgroungContainer: {
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignContent:'center',
    },
    eventInfo: {
        alignItems: 'center',
        padding: 10
    }
});

