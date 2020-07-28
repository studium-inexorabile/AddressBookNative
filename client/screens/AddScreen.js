import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import {connect} from 'react-redux'

import Form from '../components/Form'

const Add = (props) => {
    return (
      <View style={styles.container} >
        <Card>
          <Form navigation={props.navigation} />
        </Card>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})
export default connect()(Add)