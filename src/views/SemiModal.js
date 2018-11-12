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
  TouchableWithoutFeedback,
} from 'react-native';

const MODAL_HEIGHT = 270;
const MODAL_CLOSE_THRESHOLD = -40; // 閾値(40px下に動かしたら閉じる)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151F2B',
  },
  modal: {
    backgroundColor: '#151F2B',
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - MODAL_HEIGHT, // 初期位置
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  modalBackground: {
    position: 'absolute',
    backgroundColor: '#000000',
    opacity: 0.64,
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: '100%',
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
    height: 40,
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
    this.state.modalPan.setValue({ x: 0, y: MODAL_HEIGHT * 2 });
    this.state.modalBgPan.setValue({ x: 0, y: Dimensions.get('window').height });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.modalPan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dy: this.state.modalPan.y,
        },
      ]),

      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.y0 - gestureState.moveY < MODAL_CLOSE_THRESHOLD) {
          this.modalClose();
        } else {
          this.modalOpen();
        }
      },
    });
  }

  modalClose = () => {
    Animated.parallel([
      Animated.spring(this.state.modalPan, {
        toValue: { x: 0, y: MODAL_HEIGHT * 2 },
        useNativeDriver: true,
      }),
      Animated.timing(this.state.modalBgPan, {
        toValue: { x: 0, y: Dimensions.get('window').height },
        duration: 50,
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
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 32 }}>
          <Text
            style={{ color: '#FFF', textAlign: 'center' }}
            onPress={() => {
              this.modalOpen();
            }}
          >
            モーダルを開く
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.modalClose()}>
          <Animated.View
            style={[
              styles.modalBackground,
              { transform: this.state.modalBgPan.getTranslateTransform() },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, { transform: this.state.modalPan.getTranslateTransform() }]}
          {...this.panResponder.panHandlers}
        >
          {/* TODO ここの View を外部から注入できるようにする */}
          <View>
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>フォローを解除</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>ミュート</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>ブロック</Text>
              <Text style={[styles.modalText, { marginBottom: 16 }]}>報告</Text>
            </View>
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
          </View>
        </Animated.View>
      </View>
    );
  }
}
