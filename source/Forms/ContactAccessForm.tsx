import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Devices from 'expo-device';
import styles from "../screens/ContactScreen/styles";
import { StackScreenProps } from '@react-navigation/stack';
import { SafetyPlanStackParamList } from '../types'
import { AddContacts } from '../firebase/UserDataHandler';
import { ContactDetails } from '../interfaces/ContactDetails';

export default (props: StackScreenProps<SafetyPlanStackParamList, 'AccessDeviceContacts'>) => {

  const user = props.route.params.user;

  // TODO: Variable never used
  const device = Devices.osName;

  const [contacts, setContacts] = useState<Contacts.Contact[]>();
  // const [inMemoryContacts, setInMemoryContacts] = useState<Contacts.Contact[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  // TODO: Variables never used
  const [searchResults, setSearchResults] = useState<Contacts.Contact[]>();
  const [person, setPerson] = useState<Contacts.Contact>();

  // const loadContacts = async () => {
  //   const permissions = await Contacts.requestPermissionsAsync();

  //   if (permissions.status !== 'granted') {
  //     return;
  //   }

  //   const { data } = await Contacts.getContactsAsync({
  //     fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
  //   });

  //   setContacts(data);
  //   // setInMemoryContacts(data);
  //   setIsLoading(false);
  // };

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   this.loadContacts();
  // }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // TODO: Try Catch??
      const permissions = await Contacts.requestPermissionsAsync();

      if (permissions.status !== 'granted') {
        return;
      }

      // TODO: Try Catch??
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
      });

      if (data.length > 0) {
        setContacts(data);
        setIsLoading(false);
        // console.log(data);

      }

    })();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   loadContacts();
  // });

  useEffect(() => {
    const getSearchResult = async () => {
      contacts?.filter(person => {
        return person.firstName?.toLowerCase().includes(searchTerm.toLowerCase());
        // console.log(person.firstName?.toLowerCase().includes(searchTerm.toLowerCase()));
      })
    };
    // setContacts(getSearchResult);
    getSearchResult();
  }, []);



  // might throw an error here!!!
  // renderItem = ({ item }: { item: ContactDetails }) => (
  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <View style={styles.renderItemView}>
      <Text style={styles.renderItemText}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      {/* <Text style={{ color: '#79c96d', fontWeight: 'bold' }}>
                {item.phoneNumbers[0].digits}
            </Text> */}
      {/* <Button title="+ Add" onPress={() => { console.log(item.phoneNumbers[0].number) }} />  */}
      {/* style={{ alignItems: 'center', justifyContent: 'center' }} */}

      <TouchableOpacity style={{
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#51a4e8', height: 30,
        borderRadius: 15, width: 100,
        marginTop: 5, marginBottom: 15, marginLeft: 150
      }}
        onPress={async () => {
          let userExist = false;
          // TODO: user and emergencyContacts can be undefined here
          try {

            // user.emergencyContacts.forEach(element => {
            //   // TODO: item and phoneNumbers can be undefined here
            //   if (item.phoneNumbers[0].digits === element.phoneNumbers[0].digits) {
            //     userExist = true;
            //     alert("User ALREADY exist");
            //     props.navigation.navigate("EmergencyContact", { user });
            //   }
            // });

            var contact: ContactDetails = {
              firstName: item.firstName,
              lastName: item.lastName,
              digits: item.phoneNumbers[0].number + "",
              id: item.id
            }
            // console.log(contact);
            if (user.emergencyContacts) {

              user.emergencyContacts.forEach(ele => {
                if (contact.digits === ele.digits) {
                  // console.log("item.phoneNumbers[0].number = ", contact.digits);
                  // console.log("ele.digits = ", ele.digits);
                  userExist = true;
                  alert("User already exist");
                  // props.navigation.navigate("EmergencyContact", { user });
                }
              });

              if (!userExist) {
                user.emergencyContacts.push(contact);
                await AddContacts(user); 
              }
            } else {
              user.emergencyContacts = [];
              user.emergencyContacts.push(contact);
              await AddContacts(user);
            }
            
            props.navigation.navigate("EmergencyContact", { user });

          } catch (err) {
            throw (err as Error).message;
          }

        }}
      >
        <Text style={{ fontSize: 20 }}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );

  // IF NOT WORKING, REMOVE THE 'string'
  // const searchContacts = (value: string) => {
  //   // code changed here (original right below, modified one below the the original)
  //   // const filteredContacts = inMemoryContacts?.filter(contact => {
  //   const filteredContacts = inMemoryContacts?.filter(person => person.firstName?.toLowerCase().includes(value));
  //   //   (contact: { firstName: string; lastName: string; }) => {
  //   //   let contactLowercase = (
  //   //     contact.firstName +
  //   //     ' ' +
  //   //     contact.lastName
  //   //   ).toLowerCase();

  //   //   let searchTermLowercase = value.toLowerCase();

  //   //   return contactLowercase.indexOf(searchTermLowercase) > -1;

  //   // });
  //   setContacts(filteredContacts);
  // };


  // const searchContacts = (value: string) => {
  //   setSearchTerm(value);
  //   useEffect(() => {
  //     const result = contacts?.filter
  //   }, [searchTerm]);
  // };

  // useEffect(() => {
  //   const result = inMemoryContacts.filter()
  // }, [searchTerm]);


  // render() {

  // }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ marginTop: 10 }} />
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor="black"
        style={styles.searchBox}
        // onChangeText={value => searchContacts(value)}
        onChangeText={value => setSearchResults({ value })}
      /> */}
      <View style={{ flex: 1 }}>
        {/* , backgroundColor: '#2f363c' */}
        {/* {this.state.isLoading ? ( */}
        {isLoading ? (
          <View
            style={styles.activityIndicatorView}
          >
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
          // data={this.state.contacts}
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={styles.flatListView}
            >
              <Text style={{ color: 'blue' }}>No Contacts Found</Text>

            </View>

          )}
        />

      </View>
    </View>
  );
}
