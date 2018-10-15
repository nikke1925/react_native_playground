// @flow

import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
});

type State = {
  ballNum: number,
};
type Props = {};

export default class LottieAnimation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ballNum: 3, // 初期描画用
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Lottie</Text>
      </View>
    );
  }
}
