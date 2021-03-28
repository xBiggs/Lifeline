import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, Linking, ActivityIndicator } from "react-native";
import { SafetyPlanStackParamList } from "../../../types";
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { number } from "yup/lib/locale";



export default (props: StackScreenProps<SafetyPlanStackParamList, 'LocationServices'>) => {

    const { user } = props.route.params;

    const [location, setLocation] = useState<{coords:{latitude:number,longitude:number} }>();
    const [errorMsg, setErrorMsg] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState<{results:any[]}>({results:[]});
    const [latAndLong, setLatAndLong] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        //this gurantees that lat and long have the up to date value of location
      if(location) setLatAndLong(location.coords.latitude + ',' + location.coords.longitude);
    },[location])


    useEffect(() => {
    
       (async () => {
           console.log('getting location info')
          


            // TODO: Try Catch ??
            try{
                let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // TODO: Try Catch??
            const loca = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
            // FIXME: Error
            setLocation(loca);
          //  console.log(location);
            
           
            // setLatAndLong('@' + location.coords.latitude + ',' + location.coords.longitude);
           
          //  console.log(typeof(latAndLong));
            
            // setUrl('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs');


            }catch(e)
            {
                alert(e)
            }
            
        })()
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    useEffect(() => {
        // var term = searchTerm.split(' ').join('+')
        var term = searchTerm.split(' ').join('%20')

        setSearchTerm(term.toLowerCase());
        // console.log(searchTerm);
    }, [searchTerm])


    const renderItem = ({item}:{item:any}) => {
        return (
            <Text style={{textAlign:'center', alignSelf:'stretch', borderWidth:1,margin:2,borderColor:'blue'}}>{item.name}</Text>
        )
    };


  

    return (
        <View style={{flex:1}}>
            <View>
                <TextInput
                    placeholder="What can I help you with today!"
                    placeholderTextColor="blue"
                    onChangeText={value => setSearchTerm(value)}
                    style={{ borderColor: "black", backgroundColor: "orange", width: 350, height: 50, marginLeft: 20, marginRight: 20, marginTop: 10 }}
                />
                {/* <Text style={{ padding: 10, fontSize: 42 }}>
                    {searchTerm}

                </Text> */}
            </View>

            <View>
                <TouchableOpacity
                    style={{ marginTop: 20, marginLeft: 20, marginRight: 20,  height: 50 }}
                    onPress={
                        async () => {
                            setIsLoading(true);



                            // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.6141808,-97.5639936&type=hospital&radius=5000&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs
                            const domain = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
                            const location = `location=${latAndLong}`;
                            const type = `&type=${searchTerm}`
                            const radius = '&radius=5000&rankBy=distance';
                            const key = '&key=AIzaSyDh4-cp0UHt7qioUoPCh8zwVyA8JdmTxvs';
                            const emergencyServiceUrl = domain + location + type + radius + key
                            // console.log(emergencyServiceUrl);
                           /* fetch(emergencyServiceUrl)
                                .then(response => response.json())
                                .then(result => setSearchData(result))
                                .catch(e => console.log(e));*/
                            const result = await fetch(emergencyServiceUrl);
                            const json = await result.json();
                         //   console.log(json);
                            setSearchData(json);
                            setIsLoading(false);
                            console.log('printing data')
                        }}
                >
                    <Text>Search</Text>

                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                style={{justifyContent: "center", alignContent: "center", width: 200, height:50, backgroundColor: "purple", marginLeft: 100}}
                onPress={() => props.navigation.navigate('EmergencyLocations', { user })}>
                    <Text>My emergency providers</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2, backgroundColor:'pink' }}>
                {/* , backgroundColor: '#2f363c' */}
                {/* {this.state.isLoading ? ( */}
                {isLoading ? (
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size="large" color="#bad555" />
                    </View>
                ) : <>
                <FlatList style={{alignSelf:'stretch',borderWidth:1,alignContent:'center',margin:3}} data={searchData.results} keyExtractor={(item,index)=>index.toString()}
                renderItem={renderItem}></FlatList>
                </>}

            </View>

        </View>
    );
}
