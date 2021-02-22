import { useScrollToTop } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Login, GetUserData } from '../../firebase/auth';
import styles from './styles';

// Bad Any Type
export default function LoginScreen({navigation}: StackScreenProps<RouteList,'Login'>) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorText,setErrorText] = useState('');

    const onFooterLinkPress = () => {
        navigation.replace('Signup')
    }

    const onLoginPress = async () => {

        try {
            const userCredential = await Login(email, password);
            const user = await GetUserData(userCredential);
            if(user) navigation.navigate('Home',user);
            console.log(navigation)
        } catch (error) {
            // Do something with error here
            setErrorText((error as Error).message)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <Text style={styles.errorText}>{errorText}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}