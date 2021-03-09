import { useNavigation } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View,Text } from 'react-native'
import { SafetyPlanStackParamList } from '../../../types';

export default (props:StackScreenProps<SafetyPlanStackParamList,'CopingStrategies'>)=>
{
    const {user} = props.route.params
    const nav = useNavigation();

    return (
        <View>
            {user.copingStrategies? <Text>Coping Strategies</Text>: <Text>No Coping Strategies</Text>}
            

        </View>
        
    )

}