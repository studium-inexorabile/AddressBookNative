import React from 'react';
import { ScrollView } from 'react-native';
import { Input, Card } from 'react-native-elements';
import {connect} from 'react-redux'
import ContactList from '../components/ContactList'
import { setNameFilter, setEmailFilter, setPhoneFilter } from '../actions/filterActions'

const Search = (props) => {
    return (
      <ScrollView>
          <Card>
              <Input name="name" placeholder="Search by Name" onChange={(event) => {
                props.dispatch(setNameFilter(event.nativeEvent.text))
              }}/>
              <Input name="email" placeholder="Search by Email" onChange={(event) => {
                props.dispatch(setEmailFilter(event.nativeEvent.text))
              }}/>
              <Input name="phone" placeholder="Search by Phone" onChange={(event) => {
                props.dispatch(setPhoneFilter(event.nativeEvent.text))
              }}/>
          </Card>
          <ContactList navigation={props.navigation} />
      </ScrollView>
    );
}

export default connect()(Search)