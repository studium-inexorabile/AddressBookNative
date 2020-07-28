// In App.js in a new project

import * as React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { logout } from './actions/loginActions'
import Home from './screens/HomeScreen'
import Login from './screens/LoginScreen'
import Signup from './screens/SignupScreen'
import Search from './screens/SearchScreen'
import Edit from './screens/EditScreen'
import Add from './screens/AddScreen'
import storeCreator from './store/configureStore'
import { View } from 'react-native';

const Stack = createStackNavigator();

// uses function in 'configureStore.js' to create store
const store = storeCreator()
console.log(store.getState())
store.subscribe(() => {
    // logs state after any changes occur
    const state = store.getState()
    console.log(state)
})


let MyComponent = (props) => {
  let headerOptions = {
    headerTitle: props.login.username + "'s Address Book",
    headerRight: () => (
      <View style={{flexDirection: "row",justifyContent: "flex-end",paddingRight:10,width: 120}}>
        <Button
        onPress={() => {
          props.dispatch(logout())
        }}
        raised={true}
        title="Log Out"
        style={{
          marginHorizontal: 5,
        }}
        />
      </View>
      
      ),
    }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" options={headerOptions} component={Home} />
        <Stack.Screen name="Search" options={headerOptions}  component={Search} />
        <Stack.Screen name="Edit" options={headerOptions}  component={Edit} />
        <Stack.Screen name="Add" options={headerOptions}  component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  login : state.login
})

// const mapDispatchToProps = (dispatch) => ({
//   logout : () => dispatch(logout()),
// })

MyComponent = connect(mapStateToProps)(MyComponent)

class App extends React.Component {
  render(){
    return (
      <Provider store={ store }>
        <MyComponent />
      </Provider>  
    );
  }
}

export default App