// @flow

import React, { Component } from 'react';
import {
  PanResponder,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

type Props = {
  style?: Object,
  children: React.Node,
  onPress?: Function,
  isVisible: boolean,
  onModalClose: Function,
};

type State = {
  sizeRatio: Animated,
};

const MODAL_HEIGHT = 270;
const MODAL_CLOSE_THRESHOLD = -40; // 閾値(40px下に動かしたら閉じる)

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width - 32,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: '#03091d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1.0,
    shadowRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#151F2B',
  },
  modal: {
    position: 'absolute',
    backgroundColor: '#151F2B',
    height: Dimensions.get('window').height,
    width: '100%',
    top: Dimensions.get('window').height - MODAL_HEIGHT, // 初期位置
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  modalWrapper: {
    position: 'absolute',
    backgroundColor: '#000000',
    opacity: 0.64,
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: '100%',
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
  bar: {
    width: 16,
    borderBottomWidth: 4,
    borderColor: '#FFFFFF44',
  },
  leftBar: {
    borderRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightBar: {
    borderRadius: 16,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

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

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible === false && this.props.isVisible === true) {
      this.modalOpen();
    }
  }

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
    ]).start(() => {
      this.props.onModalClose();
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.modalBackground,
          { transform: this.state.modalBgPan.getTranslateTransform() },
        ]}
      >
        <TouchableOpacity onPress={() => this.modalClose()}>
          <View style={{ height: '100%' }}>
            <Animated.View
              style={[styles.modal, { transform: this.state.modalPan.getTranslateTransform() }]}
              {...this.panResponder.panHandlers}
            >
              {this.props.children}
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

SemiModal.defaultProps = {
  style: {},
  onPress: () => {}, // デフォルト何もしない
};
