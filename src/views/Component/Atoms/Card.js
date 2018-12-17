// @flow

import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet
} from "react-native";

type Props = {
  style?: Object,
  children: React.Node,
  onPress?: Function
};

type State = {
  sizeRatio: Animated
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    width: Dimensions.get("window").width - 32,
    borderRadius: 16,
    borderWidth: 0,
    shadowColor: "#03091d",
    shadowOffset: {
      width: 10,
      height: 30
    },
    shadowOpacity: 1.0,
    shadowRadius: 20
  }
});

export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sizeRatio: new Animated.Value(1)
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          Animated.spring(this.state.sizeRatio, {
            toValue: 0.94,
            friction: 4, // 摩擦 (大きい方が振動が減衰しやすい)
            tension: 36 // ばね定数
          }).start();
        }}
        onPress={
          // なんか処理する
          this.props.onPress
        }
        onPressOut={() => {
          Animated.spring(this.state.sizeRatio, {
            toValue: 1,
            friction: 4, // 摩擦 (大きい方が振動が減衰しやすい)
            tension: 36 // ばね定数
          }).start();
        }}
      >
        <Animated.View
          style={[
            styles.card,
            this.props.style,
            {
              transform: [{ scale: this.state.sizeRatio }]
            }
          ]}
        >
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Card.defaultProps = {
  style: {},
  onPress: () => {} // デフォルト何もしない
};
