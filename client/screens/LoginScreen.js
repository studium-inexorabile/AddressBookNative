import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight} from 'react-native';
import { Text, Card, Input, Image} from 'react-native-elements';
import {connect} from 'react-redux'

import {login} from '../actions/loginActions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }
  componentDidUpdate(){
    this.props.creds.token && this.props.navigation.navigate('Home');
  }
  onClickListener = (element) => {
    switch(element){
      case 'login':
        const username = this.state.email
        const password = this.state.password
        this.props.login(username, password).then(() => {
          this.emailInput.clear()
          this.passwordInput.clear()
        }).catch((e) => {
          this.setState({email: '', password: ''})
          console.log(e)
        })
        this.props.navigation.navigate('Home');
        break
      case 'register':
        this.props.navigation.navigate('Signup');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Card>
          <View style={styles.inputContainer}>
            
            <Input style={styles.inputs}
                ref={input => { this.emailInput = input }}
                placeholder="Email"
                keyboardType="default"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            
            <Input style={styles.inputs}
                ref={input => { this.passwordInput = input }}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          {
            this.props.creds.error &&
            <Text style={styles.loginText}>{this.props.creds.error}</Text>
          }
          
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer, styles.registerButton} onPress={() => this.onClickListener('register')}>
              <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      // width:250,
      height:55,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'center'
  },
  inputs:{
      height:55,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center'
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    // width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  registerButton: {
    backgroundColor: "#00b5ec",
    width:200,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 68,
    borderRadius:30,
  },
  loginText: {
    color: 'white',
  }
});

const mapDispatchToProps = (dispatch) => ({
  login : (username, password) => dispatch(login(username, password))
})

const mapStatetoProps = (state) => ({
  creds: state.login
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login)