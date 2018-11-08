// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const SEMI_MODAL_HEIGHT = 330;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151F2B',
  },
  semiModal: {
    backgroundColor: '#151F2B',
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - SEMI_MODAL_HEIGHT,
    borderRadius: 16,
    padding: 16,
  },
  semiModalScrollArea: {
    // backgroundColor: 'blue',
  },
  modalBackground: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#080A0FEE',
  },
  modalText: {
    color: '#FFF',
  },
  modalCancel: {
    borderRadius: 32,
    height: 32,
    backgroundColor: '#243347',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelButton: {
    borderRadius: 32,
    height: 32,
    backgroundColor: '#243347',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type State = {};
type Props = {
  modalPan: Animated,
  modalBgPan: Animated,
};

export default class SemiModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalPan: new Animated.ValueXY(0),
      modalBgPan: new Animated.ValueXY(0),
    };
    this.state.modalPan.setValue({ x: 0, y: SEMI_MODAL_HEIGHT * 2 });
    this.state.modalBgPan.setValue({ x: 0, y: Dimensions.get('window').height });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        this.state.modalPan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dy: this.state.modalPan.y,
        },
      ]),

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.moveY > 420) {
          this.modalClose();
        } else {
          this.modalOpen();
        }
      },
    });
  }

  componentDidMount() {}

  modalClose = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: SEMI_MODAL_HEIGHT * 2 },
        useNativeDriver: true,
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: Dimensions.get('window').height },
        duration: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  modalOpen = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: 0 },
        duration: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ color: '#FFF' }}
          onPress={() => {
            this.modalOpen();
          }}
        >
          モーダル
        </Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <Text style={{ color: '#FFF' }}>モーダル</Text>
        <TouchableWithoutFeedback onPress={() => this.modalClose()}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                backgroundColor: '#151F2BAA',
                top: 0,
                left: 0,
                height: Dimensions.get('window').height,
                width: '100%',
              },
              { transform: this.state.modalBgPan.getTranslateTransform() },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.semiModal, { transform: this.state.modalPan.getTranslateTransform() }]}
          {...this.panResponder.panHandlers}
        >
          <Text style={[styles.modalText, { marginBottom: 16 }]}>フォローを解除</Text>
          <Text style={[styles.modalText, { marginBottom: 16 }]}>ミュート</Text>
          <Text style={[styles.modalText, { marginBottom: 16 }]}>ブロック</Text>
          <Text style={[styles.modalText, { marginBottom: 16 }]}>報告</Text>
          <TouchableOpacity
            onPress={() => {
              this.modalClose();
            }}
            style={styles.modalCancelArea}
          >
            <View style={styles.modalCancelButton}>
              <Text style={[styles.modalText]}>キャンセル</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
