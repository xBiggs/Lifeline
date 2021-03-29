import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput } from "react-native"
import { ActivityIndicator, Button } from 'react-native-paper';
import { LifeLineBlue, LifeLineDarkBlue, VaultStackParamList } from '../../../types';
import VaultItemsMenu from './VaultItemsMenu';
import { User } from '../../../interfaces/User';
import { FirebaseController } from '../../../firebase/FirebaseController';
import { Video } from 'expo-av';
import { AddUserData } from '../../../firebase/UserDataHandler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props: StackScreenProps<VaultStackParamList, 'Manage'>) => {
    const {user} = props.route.params;
    user.vaultItems?null:user.vaultItems={
        photos:[],
        videos:[],
        quotes:[],
    }
    const [option, setOption] = useState<number>(0)
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow:1}}>
        <View  style={{backgroundColor:LifeLineBlue,flexGrow:1,flex:1}}>
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
        </View>
        </KeyboardAwareScrollView>
    )
}

const Content = (props: { option: number,user:User }) => {
    const [fileName,setFileName] = useState("");
    const [image,setImage] = useState<string>();
    const [video,setVideo] = useState<string>();
    const [loading,setLoading]= useState(false);
    const videoRef = useRef(null);
    const [fileInfo,setFileInfo] = useState<{filePath:string, type:string,  }>()
    const [quote, setQuote] = useState("");
    const [audio, setAudio] = useState(null);

    const addImageOrVideoToVault =async ()=>{
        setLoading(true);
        if(fileName.trim() =='') {
            alert("Please enter file name")
            setLoading(false);
            return;
        }
      if(fileInfo)
      {
         
        const entry =  await FirebaseController.AddPhotoToVault(props.user,fileInfo,fileName)
        switch(entry?.type)
        {
            case 'image':
                {
                    props.user.vaultItems?.photos.push(entry);
                    break;

                }
            case 'video':
                {
                    props.user.vaultItems?.videos.push(entry);
                    break;
                }
        }
        await AddUserData(props.user);
        

          setLoading(false);
          alert("You file has been added to the vault");
          setFileInfo(undefined)
          setImage(undefined)
          setVideo(undefined)
      }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled && (result.type=='image' || result.type =='video')) {
        
          setFileInfo({
              filePath:result.uri,
              type:result.type
          })
          switch(result.type)
          {
              case 'image':
                  {
                      setImage(result.uri);
                      setVideo(undefined);
                      break;
                  }
                case 'video':
                {
                    setVideo(result.uri);
                    setImage(undefined);
                    break;
                }
                default:
                    {
                        alert("please select image or video");
                    }
          }
          
        }
      };

      if(loading) return <ActivityIndicator size='large' color='white'></ActivityIndicator>

    switch (props.option) {
        case 0:
            {

                return (
                
                                <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:30 }}>
                      <Button mode='contained' color={LifeLineDarkBlue} onPress={pickImage}><Text>Choose Photo/Video</Text></Button>
                      {fileInfo?.filePath && <>
                     <TextInput style={{backgroundColor:LifeLineBlue,color:'white',fontSize:20, borderColor:LifeLineDarkBlue,borderWidth:5,alignSelf:'stretch',textAlign:'center'}} placeholder={'Enter file name'} onChangeText={(text)=>setFileName(text)}></TextInput>
                     <Button mode='contained' color={LifeLineDarkBlue} onPress={()=>{ addImageOrVideoToVault();}}>Add to Vault</Button>
                     </>}
                      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                      {video &&  <Video
            style={{height:200, width:350}}
            ref={videoRef}
            source={{
              uri: video,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            
          />}
                   
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
        flex: 2,
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