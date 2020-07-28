import React from 'react'
import {connect} from 'react-redux'
import { TouchableHighlight } from 'react-native';
import { Card, Text, ButtonGroup } from 'react-native-elements'
import Contact from './Contact'
import filterContacts from '../selectors/selectors'
import { sortByName, sortByEmail } from '../actions/filterActions'

// Component that renders Contacts.
// 'Sort by Name' and 'Sort by Email' buttons fire
// actions that modify 'filter' state. 
// Filtered Contacts are mapped through, and their 
// details are passed to <Contact /> component

const ContactList = (props) => {
    const buttons = ['Sort By Name', 'Sort By Email']
    return (
        <Card>
            {/* If contacts belong to user, they are displayed.
            If not, 'No contacts' is displayed. */}
            {props.contacts.length > 0 ?
            <ButtonGroup
                onPress={(selectedIndex) => {
                    if(selectedIndex == 0){
                        props.dispatch(sortByName())
                    }else{
                        props.dispatch(sortByEmail())
                    }
                }}
                buttons={buttons}
                containerStyle={{height: 50}}
            />
            :
            <Text>No contacts.</Text> }
                {
                    props.contacts.map((item) =>
                        (
                            <TouchableHighlight key={item.id} onPress={(e) => {
                                props.navigation.navigate('Edit', {
                                    id: item.id
                                })
                            }}>
                                <Contact {...item}/>
                            </TouchableHighlight>
                        )
                    )
                }
        </Card>
    )
}

// Pulls Contacts from 'contact' state, and uses
// 'filter' state to filter/sort them
const mapStatetoProps = (state) => ({
    contacts: filterContacts(state.contacts, state.filters)
})

export default connect(mapStatetoProps)(ContactList)