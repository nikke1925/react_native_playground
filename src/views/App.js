// @flow

import React, { Component } from 'react';
import {
  NavigatorIOS,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Route from './Route';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonArea: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#28cd41',
    color: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  deleteButton: {
    color: '#ff3b30',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  mainArea: {
    flex: 1,
    padding: 24,
  },
  ball: {
    backgroundColor: '#007aff',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

type State = {
  ballNum: number,
};
type Props = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          style={{ flex: 1 }}
          itemWrapperStyle={{ flex: 1, paddingTop: 64 }}
          initialRoute={{
            component: Route,
            title: '',
            passProps: {
              index: 0,
            },
          }}
          barStyle="black"
        />
      </View>
    );
  }
}
