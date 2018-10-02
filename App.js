// @flow

import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';

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

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ballNum: 3, // 初期描画用
    };
  }

  // Add ボタンを押したときにボールを1個追加する
  onPressAddButton = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    // LayoutAnimation.easeInEaseOut();
    this.setState({ ballNum: this.state.ballNum + 1 });
  };

  // Delete ボタンを押したときにボールを1個削除する
  onPressDeleteButton = () => {
    if (this.state.ballNum === 0) return;
    LayoutAnimation.configureNext(CustomLayoutSpring);
    // LayoutAnimation.easeInEaseOut();
    this.setState({ ballNum: this.state.ballNum - 1 });
  };

  // ボールをレンダリングする
  renderBalls = () => {
    const balls = [];
    for (let i = 0; i < this.state.ballNum; i += 1) {
      balls.unshift(<Ball key={i} style={{ marginBottom: 16 }} />);
    }
    return <View>{balls}</View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonArea}>
          <Text
            onPress={this.onPressAddButton}
            style={[styles.addButton, { marginRight: 16 }]}
          >
            Add
          </Text>
          <Text onPress={this.onPressDeleteButton} style={styles.deleteButton}>
            Delete
          </Text>
        </View>
        <View style={styles.mainArea}>
          <View style={{ alignItems: 'center' }}>{this.renderBalls()}</View>
        </View>
      </View>
    );
  }
}
