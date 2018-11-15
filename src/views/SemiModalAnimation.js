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
import SemiModal from './Component/Organisms/SemiModal';

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
    paddingTop: 8,
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

type State = {
  isVisible: boolean,
};
type Props = {};

export default class SemiModalAnimation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  modalClose = () => {
    this.setState({ isVisible: false });
  };

  modalOpen = () => {
    this.setState({ isVisible: true });
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
        <SemiModal isVisible={this.state.isVisible} onModalClose={() => this.modalClose()}>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginBottom: 24,
                justifyContent: 'center',
              }}
            >
              <View style={[styles.bar, styles.leftBar]} />
              <View style={[styles.bar, styles.rightBar]} />
            </View>
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
        </SemiModal>
      </View>
    );
  }
}
