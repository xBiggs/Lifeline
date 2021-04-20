import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Button, Modal, Dimensions } from 'react-native';
import * as Contacts from 'expo-contacts';
import styles from "../screens/ContactScreen/styles";
import { StackScreenProps } from '@react-navigation/stack';
import { SafetyPlanStackParamList } from '../types'
import { AddContacts, GetAllUser } from '../firebase/UserDataHandler';
import { ContactDetails } from '../interfaces/ContactDetails';
import { TextInput } from 'react-native-gesture-handler';
import { DemographicContacts } from '../interfaces/DemographicContacts';


export default (props: StackScreenProps<SafetyPlanStackParamList, 'AccessDeviceContacts'>) => {

  const { user } = props.route.params;

  const { width } = Dimensions.get("window");

  // state variable used to save contacts from device
  const [contacts, setContacts] = useState<Contacts.Contact[]>();
  // copy of contats for reseting after search box is cleared
  const [inMemoryContacts, setInMemoryContacts] = useState<Contacts.Contact[]>();
  // activity indicator
  const [isLoading, setIsLoading] = useState(false);
  // search box state variable
  const [searchTerm, setSearchTerm] = useState("");

  // variable that toggles modal visibility
  const [isModalVisible, setModalVisible] = useState(false);
  // modal fields
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [phoneNum, setPhoneNumber] = useState("");

  // function that sets the visibility of the modal
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  // holds emergency contacts from firebase. this state prop is used to check is a contact already exist or not and to add new contact to user object
  const [firebaseContacts, setFirebaseContacs] = useState(user.emergencyContacts || []);
  // state prop for holding demographic contacts
  const [contactSuggestions, setContactSuggestions] = useState<DemographicContacts[]>();

  // getting contacts from device
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
          setInMemoryContacts(data);
          setIsLoading(false);
        }
      } catch (e) {
        throw (e as Error).message;
      }
    })();
  }, []);

  // if firebaseContacts state changes, it updates user object and firebase
  useEffect(() => {
    (async () => {
      user.emergencyContacts = firebaseContacts;
      await AddContacts(user);
    })();

  }, [firebaseContacts]);

  // filters contacts based on search term.
  useEffect(() => {
    (async () => {
      var filteredDeviceContacts = inMemoryContacts?.filter(
        item => {
          var contactLowercase = (item.firstName + " " + item.lastName).toLowerCase();
          var searchTermLowerCase = searchTerm.toLowerCase();

          return contactLowercase.indexOf(searchTermLowerCase) > -1;
        }
      );
      setContacts(filteredDeviceContacts);
    })();
  }, [searchTerm]);

  // gets all users from firebased and filters using the same sexual orientation
  useEffect(() => {
    (async () => {
      try {
        let lst: DemographicContacts[] = await GetAllUser(user);
        if (lst) {
          let tmpList: DemographicContacts[] = [];
          lst.forEach(element => {
            if (element.persInfo && element.persInfo?.sexualOrientation && element.persInfo?.phone && user.personalInfo?.sexualOrientation) {
              if (element.persInfo?.sexualOrientation === user.personalInfo?.sexualOrientation) {
                tmpList.push(element);
              }
            }
          });
          setContactSuggestions(tmpList);
        } else {
          lst = [];
          setContactSuggestions(lst);
        }
      } catch (e) {
        throw (e as Error).message
      }
    })();
  }, [])

  // format phone number in the format (xxx) xxx-xxxx
  const formatPhoneNumber = (phone: string) => {
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return "";
  }

  // adds contact to firebaseContacts state varialble
  const addContactToUser = (contact: ContactDetails) => {
    try {
      if(contact.digits) contact.digits = formatPhoneNumber(contact.digits.toString());
      // check if state variable is not empty.
      if (firebaseContacts) {
        let userExist = false;
        firebaseContacts.forEach(ele => { // check if the user already exist
          if (contact.digits == ele.digits) {
            userExist = true;
          }
        });

        if (userExist) {  // alert if contact already exist
          alert("Contact already exist");
          return;
        } else { // if not update the state variable
          var tmpContactList: ContactDetails[] = [];
          firebaseContacts.forEach(ele => {
            tmpContactList.push(ele);
          });
          tmpContactList.push(contact);
          setFirebaseContacs(tmpContactList);
        }
      } else {  // check if state variable is empty.
        var tmpContactList: ContactDetails[] = [];
        tmpContactList.push(contact);
        setFirebaseContacs(tmpContactList);
      }
    } catch (err) {
      throw (err as Error).message
    }
  }

  // render the filtered demographic contacts
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

            if (item.persInfo && item.persInfo.phone) {
              var contact: ContactDetails = {
                firstName: item.firstName,
                lastName: item.lastName,
                digits: item.persInfo.phone,//formatPhoneNumber(item.persInfo.phone),
                id: item.id
              }
              addContactToUser(contact);
            }
            else {
              alert("Failed to add. This user might not have a contact info listed");
              return;
            }
          } catch (er) {
            throw (er as Error).message;
          }

        }}
      >
        <Text style={{ fontSize: 20 }}>Add {item.firstName} {item.lastName}</Text>
        {/* <Text>Age: {item.persInfo.age}    Orientation: {item.persInfo.sexualOrientation}</Text> */}
      </TouchableOpacity>
    </View >
  );

  // render device contacts
  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <View style={styles.renderItemView}>
      <Text style={styles.renderItemText}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>

      <TouchableOpacity style={{
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#51a4e8', height: 30,
        borderRadius: 15, width: 100,
        marginTop: 5, marginBottom: 15, marginLeft: 150
      }}
        onPress={async () => {
          try {
            if (item.phoneNumbers) {
              var contact: ContactDetails = {
                firstName: item.firstName,
                lastName: item.lastName,
                digits: item.phoneNumbers[0].number + "", // formatPhoneNumber(item.phoneNumbers[0].number + ""),
                id: item.id
              }
              addContactToUser(contact);
            }
            else {

              alert("This user has no phone number!");
              return;
            }
          } catch (err) {
            throw (err as Error).message;
          }

        }}
      >
        <Text style={{ fontSize: 20 }}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <SafeAreaView style={{ marginTop: 10 }} />

      {/* Modal for adding contacts manually */}
      <Button title="Add contact manually" onPress={toggleModalVisibility} />
      <Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={{
          flex: 1,
          // paddingTop: 10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}>
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            elevation: 5,
            transform: [{ translateX: -(width * 0.4) },
            { translateY: -90 }],
            height: 250,
            width: width * 0.8,
            backgroundColor: "#fff",
            borderRadius: 7,
          }}>
            <TextInput placeholder="Enter first name"
              value={fName}
              style={{
                width: "80%",
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setFirstName(value)} />

            <TextInput placeholder="Enter last name"
              value={lName}
              style={{
                width: "80%",
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setLastName(value)} />

            <TextInput placeholder="Enter phone number (10 digits only)"
              style={{
                width: "80%",
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                marginBottom: 8,
              }}
              onChangeText={(value) => setPhoneNumber(value)} />

            {/** This button is responsible to close the modal */}
            <Button title="Close" onPress={() => {
              setFirstName("");
              setLastName("");
              setPhoneNumber("");
              toggleModalVisibility();
            }
            } />

            {/** This button is responsible to adding the data to state variable */}
            <Button title="Add" onPress={() => {

              // check if firstname and last name is empty
              if(fName.length == 0 || phoneNum.length == 0){
                alert("Fields must not be empty");
                return;
              }
              // check if phone number has the correct type of values and length
              if (!Number(phoneNum) || phoneNum.length != 10) {
                alert("Please check phone number:\n\t* Must be all number.\n\t* Must have 10 digits.");
                return;
              }

              // const num = formatPhoneNumber(phoneNum);
              setPhoneNumber(formatPhoneNumber(phoneNum));
              // create an id for the contact
              const tId = () => {
                var S4 = function () {
                  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
              }

              const cont: ContactDetails = {
                firstName: fName,
                lastName: lName,
                id: tId(),
                digits: phoneNum // num
              }
              // add contact to state variable
              addContactToUser(cont);

              toggleModalVisibility(); // change the visibility to false
              // clear the fields
              setFirstName("");
              setLastName("");
              setPhoneNumber("");

            }} />
          </View>
        </View>
      </Modal>

      <TextInput
        style={{ alignContent: "center", justifyContent: "center", margin: 10, padding: 10, backgroundColor: "cyan", borderRadius: 10 }}
        onChangeText={(text) => setSearchTerm(text)}
        placeholder={"Search for contact"}
      />

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={styles.activityIndicatorView}
          >
            <ActivityIndicator size="large" color="#bad555" />
          </View>
        ) : null}
        <FlatList
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

      <View style={{ flex: 1, paddingBottom: 20 }}>
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