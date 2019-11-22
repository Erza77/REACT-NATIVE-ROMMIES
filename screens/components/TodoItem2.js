import React from 'react';
import {StyleSheet, Text, Button, TouchableOpacity, View} from 'react-native';

export default class TodoItem2 extends React.Component{
    constructor (props){
        super(props);
    }

    render (){
        const todoItem2 = this.props.todoItem2;

        return(
            <View>
            <TouchableOpacity 
                style ={styles.todoItem2}
                onPress={()=>this.props.toggleDone()}>
                
                <Text style={(todoItem2.done) ? {color: '#AAAAAA'} : {color : '#313131'}}>
                <Text style={{ textTransform: 'uppercase'},{fontWeight: 'bold'}}>
                    {`\n`}
                    {`${EventFormScreen.eventName}\n`}
                    {`\n`}
                </Text>
                    {`${todoItem2.title}\n`}
                    {`\n`}
                    {todoItem2.hours}:00
                </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style ={styles.button}
                onPress={()=>this.props.toggleDone()}>
                <Button
                    title="REMOVE"
                    color={(todoItem2.done) ? 'rgba(0,0,200,0.5)' : 'rgba(0,0,210,1)'}
                    onPress={()=>this.props.removeTodo()}/>
            </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    todoItem2: {
        width: '100%',
        flex:1,
        //borderBottomColor: '#DDD',
        //borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    button: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        color: 'black',
    }
})