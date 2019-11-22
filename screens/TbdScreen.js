import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground, Button, Platform, FlatList,Alert } from 'react-native';
import bgImg from './images/background.jpg';
import Header from './components/header';
import InputBar from './components/InputBar';
import TodoItem2 from './components/TodoItem2';
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'firebase';



function addToFireBase(id,title)
{
  var user = firebase.auth().currentUser;

  var rootRef = firebase.database().ref();
  var feedRef = rootRef.child('feed');
  var newfeed = feedRef.push();
  newfeed.set({
    id:id,
    title:title,
    author:user["displayName"],
    hours:new Date().getHours()
  })



}


export default class App extends React.Component {

  constructor(){
    super();
    this.state={
      todoInput:'',
      todos: [
        {id: 0, title: "Quote of the Day: Hustle Until your HATERS ask if you are HIRING", done: false},
      ]
    }
    this.listenForFeed=this.listenForFeed.bind(this);
  }

  componentDidMount(){

    this.listenForFeed();

  }

  listenForFeed(){
    

    let ctx = this
    firebase.database().ref('/feed/').on('value', function (snapshot) {
      let todo=[]

      snapshot.forEach((event) => {
        let value=event.val()
        let key=event.key
         todo.unshift({
           id:key,
           title:value.title,
           done:false,
           author:value.author,
           hours:value.hours
         })
         
      })
    
      ctx.setState({
        todos:todo
      })

      
  })
}

 
 
  
addNewTodo(){
  let todos = this.state.todos;
  addToFireBase(todos.length+1,this.state.todoInput)

 
 this.setState({todoInput:''})
  
}


toggleDone(item){
  let todos = this.state.todos;
  todos = todos.map((todo)=>{
    if(todo.id==item.id){
      todo.done=!todo.done;
    }

    return todo;
  })

  this.setState({todos});
}

removeTodo(item){
 // let todos=this.state.todos;
  //todos=todos.filter((todo)=>todo.id !== item.id);
  //this.setState({todos});
//console.log(item)

  if (item.author==firebase.auth().currentUser["displayName"])
  {
    var user = firebase.auth().currentUser;
    var rootRef = firebase.database().ref();
    var feedRef = rootRef.child('feed');
    feedRef.child(item.id).remove(); 
  }else{
    Alert.alert(
      'Error',
      'OOPS !! You cannot delete your ROOMIES post.',
      {cancelable: true},
    )
  }
 
}



  render(){
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>

    return (
    <ImageBackground source={bgImg} style={{width: '100%', height: '100%'}}>
      <View style={styles.header}>
        <View>
        {statusbar}
        </View>
        <Header title='My Feed'/>

        <InputBar 
          textChange={todoInput => this.setState({todoInput})}
          addNewTodo={()=> {
              this.addNewTodo()
            }}
        />
        <FlatList 
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item,index}) => {
            return(
              <TodoItem2 todoItem2={item} toggleDone={()=>this.toggleDone(item)} removeTodo={()=>this.removeTodo(item)}/>
            )
          }}
        />
          <Button title='BACK' onPress={() => this.props.navigation.navigate('ProfileHome')}></Button>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },
    statusbar: {
        height: 20
    }
});


  

  