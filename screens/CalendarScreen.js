import React, { Component } from 'react';
import { SafeAreaView, Image, View, Text, StyleSheet, TouchableHighlight, ImageBackground, Button, FlatList } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import bgImg from './images/background.jpg';
import Header from './components/header';
import firebase from 'firebase';

let UserInfo = require('../Info');

class CalendarScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: []
        }
        this.getEventsForDay.bind(this);
    }

    componentDidMount() {
        console.log("Calendar Mounted....");
    }

    getEventsForDay = (day) => {
        this.state.eventList = [];
        firebase.database().ref('/groups/' + UserInfo.groupID + '/events/').on("value", (snapshot) => {

            let count = 0;
            snapshot.forEach((event) => {
                if (event.child("date").val() == day.dateString) {
                    this.state.eventList.push({ id: count.toString(), title: event.child("name").val() });
                    count++;
                }
            });
            console.log(this.state.eventList);
            this.forceUpdate();
        });
    }

    render() {
        function Item({ title }) {
            return (

                <View>
                    <Text style={styles.item}>{title}</Text>
                </View>

            );
        }
        return (
            <ImageBackground source={bgImg} style={styles.backgroungContainer}>
            <SafeAreaView>
                <View style={{ flexDirection: 'column' }}>
                    <Text> {`\n`} {`\n`} {`\n`}{`\n`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('ProfileHome') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/left-arrow.png')}></Image>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate('EventFormScreen') }}>
                            <View style={styles.buttons}>
                                <Image style={styles.images} source={require('../assets/add.png')}></Image>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Header title='CALENDAR'/>
                    <Calendar
                        markedDates={
                            UserInfo.myMarkedDates
                        }
                        markingType={'multi-dot'}
                        onDayPress={(day) => this.getEventsForDay(day)}
                    />
                </View>
                <View style={{ alignItems: 'center', height: '50%' }}>
                    <Text style={styles.text}>Events:</Text>

                    <FlatList
                        style={{ width: '90%', marginBottom: 20 }}
                        contentContainerStyle={{ height: '90%', alignItems: 'center', padding: 4 }}
                        data={this.state.eventList}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
            </ImageBackground>

        );
    }
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: '#1f487e'
    },
    text: {
        fontSize: 24,
        color: 'white',
        padding: 10,
        fontWeight: 'bold',
        textDecorationLine:'underline'
    },
    buttons: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#6290c8",
        shadowColor: 'white',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: -2
        },
        elevation: 4
    },
    images: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 12,
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 2,
            width: -2
        }
    },
    item: {
        height: 35,
        color: 'black',
        fontSize: 30
    },
    backgroungContainer: {
        flex:1,
        width:null,
        height:null,
        justifyContent:'center',
        alignContent:'center',
    }
});