// @flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import loading from '../assets/loading.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
});

export default class LottieAnimation extends Component {
  loadingAnimation: LottieView;

  componentDidMount() {
    if (this.loadingAnimation) this.loadingAnimation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          style={{
            width: 100,
            height: 120,
            paddingTop: 90,
            alignSelf: 'center',
          }}
          ref={(refs) => {
            this.loadingAnimation = refs;
          }}
          source={loading}
        />
      </View>
    );
  }
}
