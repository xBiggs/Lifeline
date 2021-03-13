
import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Icon } from 'react-native-elements'
import {BrandIcons} from 'react-native-fontawesome'
import { Text, View } from "react-native"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

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

export default (props:{strats:string[],setStrats:React.Dispatch<React.SetStateAction<string[]>>   })=>{
    
const _renderItem = ({item}:{item:string}) => (
    
    <View style={{flexDirection:'row'}}>
        <Text style={{flex:2}}>{item}</Text>
        <TouchableOpacity onPress={()=>{
            props.setStrats(prev=>{
                return [item,...prev]
            })
          
        }}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></TouchableOpacity>

    </View>
     
   )
    return (
            <FlatList 
            collapsable
            keyExtractor={(item,index)=>item}
            data={generatedCopingStrategies.filter(value=>{
                if(props.strats.indexOf(value) == -1) return true;
                else return false;
            })}
            renderItem={_renderItem}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            extraData={props.strats}
            >
            </FlatList>   
    )
    
}