import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { SafetyPlanStackParamList } from '../../../types'


export default (props:StackScreenProps<SafetyPlanStackParamList,'SocialEngagements'>)=>{

    return(
        <View>
            <Text>Social Engagement Screen</Text>
        </View>
    )


}