import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import styles from "../screens/ContactScreen/styles";
import { ContactDetails } from "../interfaces/ContactDetails";
import * as Device from 'expo-device'

// if crash, change 'any' to 'ContactDetails'
export default class ContactAccessForm extends React.Component<{}, any> {

    // if crash, change 'any' to 'ContactDetails'
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            contacts: []
        };
    }

    loadContacts = async () => {
        const permissions = await Contacts.requestPermissionsAsync();

        if (permissions.status !== 'granted') {
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
        });

        // console.log(data);
        this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        this.loadContacts();
    }

    // might throw an error here!!!
    renderItem = ({ item }: { item: ContactDetails}) => (
        <View style={ styles.renderItemView }>
            <Text style={ styles.renderItemText }>
                {item.firstName + ' '}
                {item.lastName}
            </Text>
            {/* <Text style={{ color: '#79c96d', fontWeight: 'bold' }}>
                {item.phoneNumbers[0].digits}
            </Text> */}
            {/* <Button title="+ Add" onPress={() => { console.log(item.phoneNumbers[0].number) }} />  */}
            {/* style={{ alignItems: 'center', justifyContent: 'center' }} */}

            {/* <TouchableOpacity style={{
          alignItems: 'center', justifyContent: 'center', 
          backgroundColor: '#51a4e8', height: 30,
          borderRadius: 15, width: 100,
          marginTop: 5, marginBottom: 15, marginLeft: 150}}
          onPress={this.addToFirebase}>
        <Text style={{fontSize: 20}}>+ Add</Text>
      </TouchableOpacity> */}
        </View>
    );

    // IF NOT WORKING, REMOVE THE 'string'
    searchContacts = (value: string )=> {
        // code changed here (original right below, modified one below the the original)
        // const filteredContacts = this.state.inMemoryContacts.filter(contact => {
        const filteredContacts = this.state.inMemoryContacts.filter((contact: { firstName: string; lastName: string; }) => {
          let contactLowercase = (
            contact.firstName +
            ' ' +
            contact.lastName
          ).toLowerCase();
    
          let searchTermLowercase = value.toLowerCase();
    
          return contactLowercase.indexOf(searchTermLowercase) > -1;
        });
        this.setState({ contacts: filteredContacts });
      };

    render() {
        return (
          <View style={{ flex: 1 }}>
            <SafeAreaView style={{marginTop:10}}/>
            <TextInput
              placeholder="Search"
              placeholderTextColor="black"
              style={styles.searchBox}
              onChangeText={value => this.searchContacts(value)}
            />
            <View style={{ flex: 1 }}>
            {/* , backgroundColor: '#2f363c' */}
              {this.state.isLoading ? (
                <View
                  style={styles.activityIndicatorView}
                >
                  <ActivityIndicator size="large" color="#bad555" />
                </View>
              ) : null}
              <FlatList
                data={this.state.contacts}
                renderItem={this.renderItem}
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
}