// @flow

import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import Card from './Component/Atoms/Card';

const IMAGE_1 =
  'https://images.unsplash.com/photo-1539783559030-94d253662acd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc2790e76eddcb04d43e7c47b489c735&auto=format&fit=crop&w=1300&q=80';
const IMAGE_2 =
  'https://images.unsplash.com/photo-1539553296722-f41aa0d2d184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1ea590d8dd6c9247b9a2d2237b198d5f&auto=format&fit=crop&w=934&q=80';
const IMAGE_3 =
  'https://images.unsplash.com/photo-1539765398826-caf9e08732c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c8680afeec51fa57b02d8f9b11ee50dd&auto=format&fit=crop&w=934&q=80';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091332',
  },
  cardBodyArea: {
    padding: 16,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#007aff',
  },
  bodyText: {
    fontWeight: '400',
  },
  footerText: {
    fontWeight: '400',
    color: 'gray',
  },
});

export default class CardInteraction extends Component {
  componentDidMount() {}

  renderCards = () => (
    <View style={{ alignItems: 'center' }}>
      <Card
        style={{ marginBottom: 64 }}
        onPress={() => {
          alert('関数を渡す場合');
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: 120,
            }}
            source={{ uri: IMAGE_1 }}
          />
          <View style={styles.cardBodyArea}>
            <Text style={[styles.titleText, { marginBottom: 4 }]}>Title</Text>
            <Text style={[styles.bodyText, { marginBottom: 4 }]}>
              This is card component sample.
            </Text>
            <Text style={[styles.footerText, { marginBottom: 4 }]}>sample</Text>
          </View>
        </View>
      </Card>
      <Card style={{ marginBottom: 64 }}>
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: 120,
            }}
            source={{ uri: IMAGE_2 }}
          />
          <View style={styles.cardBodyArea}>
            <Text style={[styles.titleText, { marginBottom: 4 }]}>Title</Text>
            <Text style={[styles.bodyText, { marginBottom: 4 }]}>
              This is card component sample.
            </Text>
            <Text style={[styles.footerText, { marginBottom: 4 }]}>sample</Text>
          </View>
        </View>
      </Card>
      <Card style={{ marginBottom: 64 }}>
        <View
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Image
            style={{
              width: '100%',
              height: 120,
            }}
            source={{ uri: IMAGE_3 }}
          />
          <View style={styles.cardBodyArea}>
            <Text style={[styles.titleText, { marginBottom: 4 }]}>Title</Text>
            <Text style={[styles.bodyText, { marginBottom: 4 }]}>
              This is card component sample.
            </Text>
            <Text style={[styles.footerText, { marginBottom: 4 }]}>sample</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.innerContent}>{this.renderCards()}</View>
      </ScrollView>
    );
  }
}
