// @flow

import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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

const Ball = (props: BallProps) => <View style={[styles.ball, props.style]} />;

const CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ballNum: 3, // 初期描画用
    };
  }

  onPressAddButton = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    this.setState({ ballNum: this.state.ballNum + 1 });
  };

  onPressDeleteButton = () => {
    if (this.state.ballNum === 0) return;
    this.setState({ ballNum: this.state.ballNum - 1 });
  };

  renderBalls = () => {
    const balls = [];
    for (let i = 0; i < this.state.ballNum; i += 1) {
      balls.push(<Ball key={i} style={{ marginBottom: 16 }} />);
    }
    return <View>{balls}</View>;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonArea}>
          <Text onPress={this.onPressAddButton}>Add</Text>
          <Text onPress={this.onPressDeleteButton}>Delete</Text>
        </View>
        <View style={styles.mainArea}>{this.renderBalls()}</View>
      </View>
    );
  }
}
