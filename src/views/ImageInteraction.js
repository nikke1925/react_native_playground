// @flow

import React, { Component } from "react";
import {
  YellowBox,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  View
} from "react-native";

const IMAGE_1 =
  "https://images.unsplash.com/photo-1539783559030-94d253662acd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc2790e76eddcb04d43e7c47b489c735&auto=format&fit=crop&w=1300&q=80";

const DEFAULT_WIDTH = 64;
const DEFAULT_HEIGHT = 64;
const DEFAULT_BORDER_RADIUS = DEFAULT_WIDTH / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333"
  }
});

type Props = {};
type State = {
  isOpen: boolean,
  width: Animated,
  height: Animated,
  borderRadius: Animated,
  translateX: Animated,
  translateY: Animated
};

export default class ImageInteraction extends Component<Props, State> {
  image: Image;

  constructor(props: Props) {
    YellowBox.ignoreWarnings([
      "Warning: isMounted(...) is deprecated",
      "Module RCTImageLoader"
    ]);
    super(props);
    this.state = {
      isOpen: false,
      width: new Animated.Value(DEFAULT_WIDTH),
      height: new Animated.Value(DEFAULT_HEIGHT),
      borderRadius: new Animated.Value(DEFAULT_BORDER_RADIUS),
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0)
    };
  }

  componentDidMount() {}

  onPressInImage = () => {};

  onPressImage = () => {
    if (!this.state.isOpen) {
      this.openAnimation();
    } else {
      this.closeAnimation();
    }
  };

  openAnimation = () => {
    if (this.image) {
      this.image.measure((fx, fy, width, height, px, py) => {
        Animated.parallel([
          Animated.spring(this.state.width, {
            toValue: Dimensions.get("window").width
          }),
          Animated.spring(this.state.height, { toValue: 300 }),
          Animated.spring(this.state.borderRadius, { toValue: 0 }),
          Animated.spring(this.state.translateX, { toValue: -fx }),
          Animated.spring(this.state.translateY, { toValue: -fy })
        ]).start(() => {
          this.setState({ isOpen: true });

          // 別のビューに遷移させたいときはここに記述する
        });
      });
    }
  };

  closeAnimation = () => {
    this.image.measure((fx, fy, width, height, px, py) => {
      Animated.parallel([
        Animated.spring(this.state.width, { toValue: DEFAULT_WIDTH }),
        Animated.spring(this.state.height, { toValue: DEFAULT_WIDTH }),
        Animated.spring(this.state.borderRadius, {
          toValue: DEFAULT_BORDER_RADIUS
        }),
        Animated.spring(this.state.translateX, { toValue: 0 }),
        Animated.spring(this.state.translateY, { toValue: 0 })
      ]).start(() => {
        this.setState({ isOpen: false });
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 24 }}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              this.onPressInImage();
            }}
            onPress={() => {
              this.onPressImage();
            }}
          >
            <View
              ref={ref => {
                this.image = ref;
              }}
            >
              <Animated.Image
                style={{
                  transform: [
                    { translateX: this.state.translateX },
                    { translateY: this.state.translateY }
                  ],
                  width: this.state.width,
                  height: this.state.height,
                  borderRadius: this.state.borderRadius
                }}
                source={{ uri: IMAGE_1 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
