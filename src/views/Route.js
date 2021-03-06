// @flow

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import BallAnimation from './BallAnimation';
import LottieAnimation from './LottieAnimation';
import CardInteraction from './CardInteraction';
// import SemiModalAnimation from './SemiModalAnimation';
import ImageInteraction from './ImageInteraction';
import AppStoreInteraction from './AppStoreInteraction';

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
          {/* <Text
            onPress={() => {
              this.props.navigator.push({
                component: SemiModalAnimation,
                title: 'SemiModalAnimation',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Semi Modal
          </Text> */}
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: ImageInteraction,
                title: 'Image Interaction',
                passProps: {},
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            Image Interaction
          </Text>
          <Text
            onPress={() => {
              this.props.navigator.push({
                component: AppStoreInteraction,
                title: 'App Store Interaction',
                passProps: {},
                navigationBarHidden: true,
                translucent: true,
              });
            }}
            style={[styles.text, { marginBottom: 16 }]}
          >
            App Store Interaction
          </Text>
        </View>
      </ScrollView>
    );
  }
}
