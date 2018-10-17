// @flow

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
});

export default class CardInteraction extends Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>カード</Text>
      </View>
    );
  }
}
