import React from 'react'
import { FlatList,TouchableOpacity,StyleSheet,Text, View } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'


const generatedCopingStrategies = [
    'Color',
    'Cook a meal',
    'Do yoga',
    'Draw',
    'Drink tea',
    'Garden',
    'Give yourself a pep talk',
    'Go for a walk',
    'Engage in a hobby',
    'Exercise',
    'Listen to music',
    'List the things you feel grateful for',
    'Look at landscape photos that help you feel relaxed',
    'Look at pictures to remind you of good things',
    'Meditate',
    'Picture your “happy place"',
    'Play a game with your kids',
    'Play with a pet',
    'Practice breathing exercises',
    'Put on lotion that smells good',
    'Read a book',
    'Reframe the way you are thinking about the problem',
    'Squeeze a stress ball',
    'Spend time in nature',
    'Take a bath',
    'Watch something funny',
    'Use aromatherapy',
    'Use progressive muscle relaxation',
    'Write in a journal',
    ]
    


export default (props:{addStrategy:(strategy:string)=>void})=>
{
    
    return (
        <FlatList style={{margin:5}} data={generatedCopingStrategies} renderItem={({item})=><_renderItem addStrategy={props.addStrategy} item={item}></_renderItem>} keyExtractor={(item)=>item}>
        </FlatList>
    )

}

const _renderItem = (props:{item:string,addStrategy:(strategy:string)=>void})=>{
    return (
        <View style={{flexDirection:'row',borderWidth:1}}>
            <Text style={[styles.buttonTitle,{flex:1}]}>{props.item}</Text>
            <TouchableOpacity onPress={()=>{
                props.addStrategy(props.item);
            }}><MaterialCommunityIcons size={30} style={{
                color:'white',
                alignSelf:'center'
            }} name='plus'></MaterialCommunityIcons></TouchableOpacity>

        </View>
    )
}

const styles= StyleSheet.create({
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    }
})
