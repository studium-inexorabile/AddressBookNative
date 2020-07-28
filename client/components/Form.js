import React from 'react'
import {connect} from 'react-redux'
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

import {addContact} from '../actions/contactActions'

// Form component that is used in <AddContact /> and
// <EditContact /> components. 

class Form extends React.Component {
    // Internal state keeps track of inputted data and
    // errors.
    state = {
        nError: undefined,
        eError: undefined,
        name: this.props.contact ? this.props.contact.name : "",
        email: this.props.contact ? this.props.contact.email : "",
        phone: this.props.contact ? this.props.contact.phone : ""
    }
    // validates data, then passes data to 'onSubmit' function
    // passed from parent to submit that data.
    validate = (e) => {
        if(!this.state.name){
            this.setState({nError: 'Please enter a valid name'})
        }else if(!this.state.email){
            this.setState({eError: 'Please enter a valid email'})
        }else{
            this.props.dispatch(addContact({name: this.state.name, email: this.state.email, phone: this.state.phone}))
            this.props.navigation.navigate('Home');
            this.emailInput.clear()
            this.nameInput.clear()
            this.phoneInput.clear()
        }
    }
    render(){
        return(
            <View>

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

                <View>
                    <Text></Text>
                </View>
                
                <Button title="Submit"
                    onPress={() => {
                        this.validate()
                    }}
                    style={{
                        marginTop:5
                    }}
                />
            </View>
        )
    }
}


export default connect()(Form)