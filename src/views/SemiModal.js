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
} from 'react-native';

const SEMI_MODAL_HEIGHT = 330;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  semiModal: {
    backgroundColor: '#151F2B',
    height: SEMI_MODAL_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height - SEMI_MODAL_HEIGHT,
    borderRadius: 16,
    padding: 16,
  },
  semiModalScrollArea: {
    // backgroundColor: 'blue',
  },
  modalText: {
    color: '#FFF',
  },
  modalCancel: {
    borderRadius: 32,
    backgroundColor: '#243347',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type State = { isShowModal: boolean, backgroundColor: string };
type Props = {
  pan: Animated,
};

export default class SemiModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShowModal: false,
      pan: new Animated.ValueXY(0),
      backgroundColor: '#151F2B',
    };
    this.state.pan.setValue({ x: 0, y: SEMI_MODAL_HEIGHT * 2 });

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        // console.log('Grant');
        // console.log(gestureState);
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y,
        },
      ]),

      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState.moveY);
        if (gestureState.moveY > 420) {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: SEMI_MODAL_HEIGHT * 2 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            this.setState({ isShowModal: false, backgroundColor: '#151F2B' });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  componentDidMount() {}

  modalClose = () => {
    this.setState({ isShowModal: false, backgroundColor: '#151F2B' }, () => {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: SEMI_MODAL_HEIGHT * 2 },
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
        <View>
          <Text
            style={{ color: '#FFF' }}
            onPress={() => {
              if (this.state.isShowModal) {
                this.modalClose();
              } else {
                this.setState({ isShowModal: true, backgroundColor: '#080A0F' }, () => {
                  Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                });
              }
            }}
          >
            モーダル
          </Text>
        </View>
        {this.state.isShowModal && (
          <Animated.View
            style={[styles.semiModal, { transform: this.state.pan.getTranslateTransform() }]}
            {...this.panResponder.panHandlers}
          >
            <Text style={[styles.modalText, { marginBottom: 16 }]}>フォローを解除</Text>
            <Text style={[styles.modalText, { marginBottom: 16 }]}>ミュート</Text>
            <Text style={[styles.modalText, { marginBottom: 16 }]}>ブロック</Text>
            <Text style={[styles.modalText, { marginBottom: 16 }]}>報告</Text>
            <TouchableOpacity onPress={() => {}} style={styles.modalCancel}>
              <View>
                <Text style={[styles.modalText]}>キャンセル</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  }
}
