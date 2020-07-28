import React from 'react'
import {connect} from 'react-redux'
import { View } from 'react-native';
import {Card, Text } from 'react-native-elements'
import { removeContact } from '../actions/contactActions'

// Component that holds inViewidual Contacts.
// Clicking on 'name' of contact will lead to edit page
// for that contact.
// Clicking on 'remove' will fire 'removeContact' action.

const Contact = ({name, email, phone, id, ...props}) => (
        <Card>
            <View>
                <Text>{name}</Text>
            </View>
            <View>
                <Text>{email}</Text>
                {
                    phone != "" && <Text>{phone}</Text>
                }
            </View>
            
        </Card>
)

export default connect()(Contact)