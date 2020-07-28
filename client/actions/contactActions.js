import uuid from 'uuid'
import { AsyncStorage } from 'react-native';

import axios from '../axios/axios';

export const _addContact = (contact) => ({
    // action for adding contact to Redux store
    type:'ADD_CONTACT',
    contact
})
export const addContact = ({name, email, phone} = {}) => {
    let token = AsyncStorage.getItem('jwt')
    return (dispatch) => {
        // creates contact object from passed in contact details
        const contact = {
            uuid: uuid(),
            name,
            email,
            phone
        }
        // makes call to API to create contact and
        // passes token in header
        return AsyncStorage.getItem('jwt').then((token) => {
            axios.post('contacts/create', contact, {
                headers:{
                    'AUTHORIZATION' : `Bearer ${token}`
                }
            }).then(result => {
                // passes contact details to '_addContact' action
                // and dispatches action for setting contacts
                // in Redux store
                dispatch(_addContact(result.data))
                dispatch(setContacts());
            })
        }).catch((e) => {
            console.log(e)
        })
    }
}

export const _removeContact = (id) => ({
    // action for removing contact from Redux store
    type:'REMOVE_CONTACT',
    id
})
export const removeContact = ({ id } = {}) => {
    return (dispatch) => {
        // makes call to API to delete contact and
        // passes token in header
        return AsyncStorage.getItem('jwt').then((token) => {
            axios.delete(`contacts/${id}`, {
                headers:{
                    'AUTHORIZATION' : `Bearer ${token}`
                }
            }).then(() => {
                // passes ID to '_removeContact' action
                // and dispatches action for setting contacts
                // in Redux store
                dispatch(_removeContact(id));
                dispatch(setContacts());
            })
        }).catch((e) => {
            console.log(e)
        })
    }
};

export const _editContact = (id, updates) => ({
    // action for editing contact in Redux store
    type:'EDIT_CONTACT',
    id,
    updates
})
export const editContact = (id, updates) => {
    return (dispatch) => {
        // makes call to API to edit contact and
        // passes token in header
        return AsyncStorage.getItem('jwt').then((token) => {
            axios.put(`contacts/${id}`, updates, {
                headers:{
                    'AUTHORIZATION' : `Bearer ${token}`
                }
            }).then(() => {
                // passes ID and 'updates' object to '_editContact' action
                // and dispatches action for setting contacts in Redux store
                dispatch(_editContact(id, updates));
                dispatch(setContacts());
            });
        }).catch((e) => {
            console.log(e)
        })
    }
};

export const _setContacts = (contacts) => ({
    // action for setting contacts in Redux store
    type: 'SET_CONTACTS',
    contacts
})
export const setContacts = () => {
    return (dispatch) => {
        // makes call to API to get contacts and
        // passes token in header
        AsyncStorage.getItem('jwt').then((token) => 
            axios.get('contacts', {
                headers:{
                    'AUTHORIZATION' : `Bearer ${token}`
                }
            }).then(result => {
                // creates array of resulting contacts
                const contacts = [];
                result.data.forEach(item => {
                    contacts.push(item);
                });
                // passes contact array to '_setContacts' action
                dispatch(_setContacts(contacts));
            }).catch((e) => {
                console.log(e)
            })
        ).catch((e) => {
            console.log(e)
        })
    };
};