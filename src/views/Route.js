// @flow

import React, { Component } from 'react';
import {
  ScrollView,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BallAnimation from './BallAnimation';
import LottieAnimation from './LottieAnimation';

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
type BallProps = {
  style: Object,
};

// ボール
const Ball = (props: BallProps) => <View style={[styles.ball, props.style]} />;

// アニメーション
const CustomLayoutSpring = {
  duration: 400,
  // ボール追加時のアニメーション
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.6,
  },
  // ボール移動時のアニメーション
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
  delete: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.2,
  },
};

export default class Route extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text
          onPress={() => {
            this.props.navigator.push({
              component: BallAnimation,
              title: 'ボール',
              passProps: {},
            });
          }}
        >
          ボールアニメーション
        </Text>
        <Text
          onPress={() => {
            this.props.navigator.push({
              component: LottieAnimation,
              title: 'Lottie',
              passProps: {},
            });
          }}
        >
          Lottie アニメーション
        </Text>
      </ScrollView>
    );
  }
}
