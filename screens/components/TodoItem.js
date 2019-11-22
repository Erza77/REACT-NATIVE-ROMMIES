import React from 'react';
import {StyleSheet, Text, Button, TouchableOpacity, View} from 'react-native';

export default class TodoItem extends React.Component{
    constructor (props){
        super(props);
    }

    render (){
        const todoItem = this.props.todoItem;

        return(
            <View>
            <TouchableOpacity 
                style ={styles.todoItem}
                onPress={()=>this.props.toggleDone()}>
                
                <Text style={(todoItem.done) ? {color: '#AAAAAA'} : {color : '#313131'}}>
                <Text style={{ textTransform: 'uppercase'},{fontWeight: 'bold'}}>
                    {`\n`}
                    {`${todoItem.author}\n`}
                    {`\n`}
                </Text>
                    {`${todoItem.title}\n`}
                    {`\n`}
                    {todoItem.hours}:00
                </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style ={styles.button}
                onPress={()=>this.props.toggleDone()}>
                <Button
                    title="REMOVE"
                    color={(todoItem.done) ? 'rgba(0,0,200,0.5)' : 'rgba(0,0,210,1)'}
                    onPress={()=>this.props.removeTodo()}/>
            </TouchableOpacity>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    todoItem: {
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