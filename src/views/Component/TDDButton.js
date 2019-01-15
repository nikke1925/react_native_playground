// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C5EFF7',
    flex: 1,
  },
});

export default class TDDButton extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text>TDD-Button</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
