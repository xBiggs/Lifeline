import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Devices from 'expo-device';
import styles from "../screens/ContactScreen/styles";
import { StackScreenProps } from '@react-navigation/stack';
import { SafetyPlanStackParamList } from '../types'
import { AddContacts } from '../firebase/UserDataHandler';
import { ContactDetails } from '../interfaces/ContactDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { DemographicContacts } from '../interfaces/DemographicContacts';

export default (props: StackScreenProps<SafetyPlanStackParamList, 'AccessDeviceContacts'>) => {

  // const { user } = props.route.params.user;
  const { user, contactSuggestions } = props.route.params;

  // TODO: Variable never used
  const device = Devices.osName;

  const [contacts, setContacts] = useState<Contacts.Contact[]>();
  // const [inMemoryContacts, setInMemoryContacts] = useState<Contacts.Contact[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  // TODO: Variables never used
  const [searchResults, setSearchResults] = useState<Contacts.Contact[]>();
  const [person, setPerson] = useState<Contacts.Contact>();

  const populateInitialContact = () => {
    const list: ContactDetails[] = [];
    if (user.emergencyContacts) {
      user.emergencyContacts.forEach((ele) => {
        list.push(ele);
      });
    }
    // console.log(list);
    return list;
  };
  const initialContacts: ContactDetails[] = populateInitialContact();
  const [firebaseContacts, setFirebaseContacs] = useState(initialContacts);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const permissions = await Contacts.requestPermissionsAsync();

      if (permissions.status !== 'granted') {
        return;
      }

      try {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
        });
        if (data.length > 0) {
          setContacts(data);
          setIsLoading(false);
          // console.log(data);
        }
      } catch (e) {
        throw (e as Error).message;
      }
      // console.log(contactSuggestions);

    })();
  }, []);

  useEffect(() => {
    (async () => {
      user.emergencyContacts = firebaseContacts;
      await AddContacts(user);
      // console.log("INSIDE ASYNC FIREBASE");
    })();
    
  }, [firebaseContacts]);

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

  const formatPhoneNumber = (phone: string) => {
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return "";
  }

  const renderDemographicSuggestions = ({ item }: { item: DemographicContacts }) => (
    <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
      <TouchableOpacity style={{
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#51a4e8', height: 50,
        borderRadius: 15, width: 300,
        marginTop: 5, marginBottom: 15, marginLeft: 40
      }}
        onPress={async () => {

          try {

            if (item.persInfo.phone) {
              var contact: ContactDetails = {
                firstName: item.firstName,
                lastName: item.lastName,
                digits: formatPhoneNumber(item.persInfo.phone),
                id: item.id
              }

              if (firebaseContacts) {
                let userExist = false;
                firebaseContacts.forEach(ele => {
                  if (contact.digits == ele.digits) {
                    userExist = true;
                  }
                });

                if (userExist) {
                  alert("Contact already exist");
                  return;
                } else {
                  var tmpContactList: ContactDetails[] = [];
                  firebaseContacts.forEach(ele => {
                    tmpContactList.push(ele);
                  });
                  tmpContactList.push(contact);
                  setFirebaseContacs(tmpContactList);
                  props.navigation.navigate("EmergencyContact", { user });
                }
              } else {
                var tmpContactList: ContactDetails[] = [];
                tmpContactList.push(contact);
                setFirebaseContacs(tmpContactList);
                props.navigation.navigate("EmergencyContact", { user });
              }

            }
            else {

              alert("This user has no phone number!");
              return;
            }


            // if (user.emergencyContacts) {
            //   let userExist = false;
            //   user.emergencyContacts.forEach(ele => {
            //     if (contact.digits === ele.digits) {
            //       // console.log("item.phoneNumbers[0].number = ", contact.digits);
            //       // console.log("ele.digits = ", ele.digits);
            //       userExist = true;
            //       alert("Contact already exist");
            //       // props.navigation.navigate("EmergencyContact", { user });
            //     }
            //   });

            //   if (!userExist) {
            //     user.emergencyContacts.push(contact);
            //     await AddContacts(user);
            //     props.navigation.navigate("EmergencyContact", { user });
            //   }

            // } else {
            //   user.emergencyContacts = [];
            //   user.emergencyContacts.push(contact);
            //   await AddContacts(user);
            //   props.navigation.navigate("EmergencyContact", { user });
            // }

          } catch (er) {
            throw (er as Error).message;
          }

        }}
      >
        <Text style={{ fontSize: 20 }}>Add {item.firstName} {item.lastName}</Text>
        <Text>Age: {item.persInfo.age}    Orientation: {item.persInfo.sexualOrientation}</Text>
      </TouchableOpacity>
    </View >
  );

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
          // let userExist = false;
          try {

            if (item.phoneNumbers[0].number) {
              var contact: ContactDetails = {
                firstName: item.firstName,
                lastName: item.lastName,
                digits: formatPhoneNumber(item.phoneNumbers[0].number + ""),// item.phoneNumbers[0].number + "",
                id: item.id
              }

              if (firebaseContacts) {
                let userExist = false;
                firebaseContacts.forEach(ele => {
                  if (contact.digits == ele.digits) {
                    userExist = true;
                  }
                });

                if (userExist) {
                  alert("Contact already exist");
                  return;
                } else {
                  var tmpContactList: ContactDetails[] = [];
                  firebaseContacts.forEach(ele => {
                    tmpContactList.push(ele);
                  });
                  tmpContactList.push(contact);
                  setFirebaseContacs(tmpContactList);
                  props.navigation.navigate("EmergencyContact", { user });
                }
              } else {
                var tmpContactList: ContactDetails[] = [];
                tmpContactList.push(contact);
                setFirebaseContacs(tmpContactList);
                props.navigation.navigate("EmergencyContact", { user });
              }

            }
            else {

              alert("This user has no phone number!");
              return;
            }

            // var contact: ContactDetails = {
            //   firstName: item.firstName,
            //   lastName: item.lastName,
            //   digits: formatPhoneNumber(item.phoneNumbers[0].number + ""),// item.phoneNumbers[0].number + "",
            //   id: item.id
            // }
            // if (user.emergencyContacts) {

            //   user.emergencyContacts.forEach(ele => {
            //     if (contact.digits === ele.digits) {
            //       // console.log("item.phoneNumbers[0].number = ", contact.digits);
            //       // console.log("ele.digits = ", ele.digits);
            //       userExist = true;
            //       alert("Contact already exist");
            //       props.navigation.navigate("EmergencyContact", { user });
            //     }
            //   });

            //   if (!userExist) {
            //     user.emergencyContacts.push(contact);
            //     await AddContacts(user);
            //   }
            // } else {
            //   user.emergencyContacts = [];
            //   user.emergencyContacts.push(contact);
            //   await AddContacts(user);
            // }
            // // addContact(contact);

            // props.navigation.navigate("EmergencyContact", { user });

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
      <View style={{ flex: 1 }}>
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

      <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />
      <Text style={{ backgroundColor: "#e6e69c", paddingLeft: 20, fontSize: 20, marginLeft: 10, marginRight: 10 }}>Suggestions</Text>
      <View style={{ borderWidth: 0.7, borderColor: 'black', margin: 10 }} />

      <View style={{ flex: 1 }}>
        <FlatList
          // data={this.state.contacts}
          data={contactSuggestions}
          renderItem={renderDemographicSuggestions}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={styles.flatListView}
            >
              <Text style={{ color: 'blue' }}>No Suggestions</Text>

            </View>

          )}
        />
      </View>

    </View>
  );
}