import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native"
import { Button } from 'react-native-paper';
import { LifeLineBlue, LifeLineDarkBlue, LifeLineOrange, VaultStackParamList } from '../../../types';
import VaultItemsMenu from './VaultItemsMenu';
import { FlingGestureHandler, TextInput } from 'react-native-gesture-handler';
import { User } from '../../../interfaces/User';
import { FirebaseController } from '../../../firebase/FirebaseController';

export default (props: StackScreenProps<VaultStackParamList, 'Manage'>) => {
    const {user} = props.route.params;
    user.vaultItems?null:user.vaultItems={
        photos:[],
        videos:[],
        quotes:[],
    }
    const [option, setOption] = useState<number>(0)
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={{ fontSize: 30, color: LifeLineBlue, alignSelf: 'center' }}>Select Option Below</Text>
                <VaultItemsMenu setOption={setOption}></VaultItemsMenu>
            </View>
            <View style={styles.content}>
                <Content user={props.route.params.user} option={option}></Content>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { props.navigation.goBack(); }}>
                    <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>Back to Vault</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

const Content = (props: { option: number,user:User }) => {
    const [fileName,setFileName] = useState("");
    const [image, setImage] = useState<string | undefined>();
    const [quote, setQuote] = useState("");
    const [audio, setAudio] = useState(null);

    const addImageOrVideoToVault =async ()=>{
      if(image)
      {
         
          await FirebaseController.AddPhotoToVault(props.user,image);
      }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    switch (props.option) {
        case 0:
            {

                return (
                    <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:30 }}>
                      <Button mode='contained' color={LifeLineDarkBlue} onPress={pickImage}><Text>Choose Photo/Video</Text></Button>
                      {image && <>
                     <TextInput placeholder={'Enter file name'} onChangeText={(text)=>setFileName(text)}></TextInput>
                     <Button mode='contained' color={LifeLineOrange} onPress={()=>{ addImageOrVideoToVault();}}>Add to Vault</Button>
                     </>}
                      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                   
                    </View>
                  );
            }

        case 1:
            {
                return(
                    <View>
                        <Text>Coming Soon</Text>
                    </View>
                )

             
            }
        case 2:
            {
                return(
                    <View>
                        <Text>Coming Soon</Text>
                    </View>
                )
            }
        default:
            {
                return(
                    <View></View>
                )

            }
    }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: LifeLineBlue,
        borderRadius: 15

    },
    container: {
        backgroundColor: LifeLineDarkBlue,
        flex:1,
        
       
    },
    content: {
        flex: 1,
        backgroundColor: LifeLineBlue
    },
    footer: {
        alignItems: 'stretch',
        margin: 10,
    },
    header: {
        marginTop: 5
    }


})