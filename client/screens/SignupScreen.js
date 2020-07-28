import { View, Button, AsyncStorage } from 'react-native';
import { Input, Text } from 'react-native-elements';
import React from 'react'
import {connect} from 'react-redux'
import {signup, _login} from '../actions/loginActions'

// Component for 'Sign Up'.
// Allows user to create user in database.
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            repeat: ''
        }
      }
    componentDidMount(){
        this.props.login(false, undefined, undefined)
    }
    render(){
        return (
            this.props.creds.token ? () => this.props.navigation.navigate('Login') :
            <View>
                <View>
                    <Text>Sign Up</Text>
                    <View>
                        <Text>Username</Text>
                        <Input name="username" onChange={(event) => {
                            this.setState({username: event.nativeEvent.text})
                        }}/>
                        <Text>Email</Text>
                        <Input name="email" onChange={(event) => {
                            this.setState({email: event.nativeEvent.text})
                        }}/>
                        <Text>Password</Text>
                        <Input name="password" onChange={(event) => {
                            this.setState({password: event.nativeEvent.text})
                        }}/>
                        <Text>Repeat Password</Text>
                        <Input name="repeat" onChange={(event) => {
                            this.setState({repeat: event.nativeEvent.text})
                        }}/>
                        {
                            // if error occurs, error is displayed
                            this.props.creds.error &&
                            <View>
                                    <Text id="error">{this.props.creds.error}</Text>
                            </View>
                            
                        }
                        <Button title="Submit"
                          onPress={() => {
                              // when submitted, data is passed to 'signup' action
                              if(this.state.password == this.state.repeat){
                                  this.props.signup(this.state.email, this.state.username, this.state.password)
                                  this.props.navigation.navigate('Home');
                              }else{
                                  this.props.login(false, undefined, "Passwords do not match.")
                              }
                        }} />
                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    signup : (email, username, password) => dispatch(signup(email, username, password)),
    login : (token, username, error) => dispatch(_login(token, username, error))
})

const mapStatetoProps = (state) => ({
    creds: state.login
})

export default connect(mapStatetoProps, mapDispatchToProps)(Signup)