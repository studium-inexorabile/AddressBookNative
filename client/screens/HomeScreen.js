import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import ContactList from '../components/ContactList'

const Home = (props) => {
  !props.login.token && props.navigation.navigate('Login');
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Button
          title="Add a Contact"
          onPress={() => {
            props.navigation.navigate('Add');
          }}
        />
        <Button
          title="Search Contacts"
          onPress={() => {
            props.navigation.navigate('Search');
          }}
        />
      </View>
      <ContactList navigation={props.navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 30,
    marginBottom: 20
  }
});

const mapStateToProps = (state) => ({
  login : state.login
})

export default connect(mapStateToProps)(Home)