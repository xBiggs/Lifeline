import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Text } from 'react-native'

export default ()=>
{
    const nav = useNavigation();

    return (
        <Text>Settings Screen</Text>
    )

}