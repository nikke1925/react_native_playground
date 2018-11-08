// @flow

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import BallAnimation from './BallAnimation';
import LottieAnimation from './LottieAnimation';
import CardInteraction from './CardInteraction';
import SemiModal from './SemiModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  text: {
    color: '#DDD',
    fontWeight: '400',
  },
});

type State = {};
type Props = {};

export default class Route extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ width: 300, alignSelf: 'center' }}>
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: BallAnimation,
                title: 'Ball',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Ball Animation
          </Text>
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: LottieAnimation,
                title: 'Lottie',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Lottie Animation
          </Text>
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: CardInteraction,
                title: 'Card',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Card Interaction
          </Text>
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: SemiModal,
                title: 'SemiModal',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Semi Modal
          </Text>
        </View>
      </ScrollView>
    );
  }
}
