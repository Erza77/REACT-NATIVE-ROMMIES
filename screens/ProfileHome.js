import React, { Component } from 'react';
import bgImg from './images/background.jpg';
import { Constants } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  Linking,
  TouchableHighlight
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Iconc from 'react-native-vector-icons/Octicons';
import Icona from 'react-native-vector-icons/Entypo';
import Icont from 'react-native-vector-icons/FontAwesome5';





import firebase from 'firebase';


export default class ProfileHome extends Component {


  componentDidMount(){
    var user = firebase.auth().currentUser;

    if (user) {
      console.log("Signed in User",user)
      console.log("Name",user["displayName"])
      console.log("URI",user["photoURL"])
      this.setState({name:user["displayName"],uri:user["photoURL"]})
      } else {
        // No user is signed in.
        console.log("Oops")
      }
  }
    constructor(props){
        super(props);

  this.state={
    name:'',
    uri:'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  }
    }
  render() {
    return (
      <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: this.state.uri}}/>
                <Text style={styles.name}>
                  {this.state.name}
                </Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.bodyContent}>


              <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('CalendarScreen')
                  }}>
              <View style={styles.menuBox}>
              <Iconc name="calendar" size={50}/>
              </View>
              </TouchableHighlight>

            <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('EventFormScreen')
                  }}>
              <View style={styles.menuBox}>
              <Icona name="add-to-list" size={50}/>
              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={()=>{
                  this.props.navigation.navigate('FeedScreen')
                  }}>
              <View style={styles.menuBox}>
                <Iconc name="comment-discussion" size={50}/>

              </View>
              </TouchableHighlight>

              
              <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://www.splitwise.com/')}}>

              <View style={styles.menuBox}>
              <Icon2 name="attach-money" size={50}/>

              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://www.dominos.com/en/')}}>
              <View style={styles.menuBox}>
              <Icon name="food" size={50}/>

              </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://www.walmart.com')}}>
              <View style={styles.menuBox}>
               
                <Icon2 name="local-grocery-store" size={50}/>

              </View>
              </TouchableHighlight>


            </View>
        </View>
        <Button title='BACK' onPress={() => this.props.navigation.navigate('DashboardScreen')}></Button>

      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "purple",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
});
  