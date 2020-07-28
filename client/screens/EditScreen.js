import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Card, Button } from 'react-native-elements';
import {connect} from 'react-redux'
import {editContact} from '../actions/contactActions'

// Component that handles editing Contact using
// <Form /> component.
// When form is submitted, editContact action
// is fired with input contact info, then page is
// 'refreshed' using 'this.props.history.push('/')'

class EditContact extends Component {
    state = {
        name: this.props.contact ? this.props.contact.name : '',
        email: this.props.contact ? this.props.contact.email : '',
        phone: this.props.ontact ? this.props.contact.phone : '',
    }
    
    onSubmit = () => {
        this.props.editContact(this.props.route.params.id, this.state)
        this.props.navigation.navigate('Home');
    }
    render(){
        return (
            <View style={styles.container}>
                <Card>
                    <Text>Name</Text>
                    <Input 
                        name="name" 
                        value={this.state.name} 
                        onChange={(e)=>{
                            this.setState({name: e.nativeEvent.text})
                        }}
                        ref={input => { this.nameInput = input }}
                    />

                        {this.state.nError && <Text>{this.state.nError}</Text>}
                        <View>
                            <Text></Text>
                        </View>
                        
                        <Text>Email</Text>

                        <Input 
                            name="email"
                            value={this.state.email} 
                            onChange={(e)=>{
                                this.setState({email: e.nativeEvent.text})
                            }}
                            ref={input => { this.emailInput = input }}
                        />

                        {this.state.eError && <Text>{this.state.eError}</Text>}
                        <View>
                            <Text></Text>
                        </View>
                        
                        <Text>Phone</Text>

                        <Input 
                            name="phone" 
                            value={this.state.phone} 
                            onChange={(e)=>{
                                this.setState({phone: e.nativeEvent.text})
                            }}
                            ref={input => { this.phoneInput = input }}
                        />
                        
                        <View>
                            <Text></Text>
                        </View>

                        <Button title="Submit"
                            onPress={() => {
                                this.onSubmit()
                            }}
                            style={{
                                marginTop:5
                            }}
                        />
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    }
})

// finds Contact in state that matches dynamic URL parameter
const mapStateToProps = (state, props) => ({
    contact : state.contacts.find((item) => item.id == props.route.params.id)
})
const mapDispatchToProps = (dispatch) => ({
    editContact : (id, contact) => dispatch(editContact(id, contact))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContact)