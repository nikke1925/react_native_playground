// @flow

import React, { Component } from "react";
import {
  YellowBox,
  Modal,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";

const IMAGE_1 =
  "https://images.unsplash.com/photo-1539783559030-94d253662acd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc2790e76eddcb04d43e7c47b489c735&auto=format&fit=crop&w=1300&q=80";

const DEFAULT_BORDER_RADIUS = 16;
const DEFAULT_CARD_HEIGHT = 268;
const DEFAULT_CARD_WIDTH = Dimensions.get("window").width - 48;
const DEFAULT_IMAGE_WIDTH = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    shadowColor: "#00000040",
    shadowOffset: {
      width: 10,
      height: 20
    },
    shadowOpacity: 1.0,
    shadowRadius: 20
  },
  cardBodyArea: {
    padding: 16
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#007aff"
  },
  bodyText: {
    fontWeight: "400"
  },
  footerText: {
    fontWeight: "400",
    color: "gray"
  }
});

type Props = {};
type State = {
  isOpen: boolean,
  cardWidth: Animated,
  cardHeight: Animated,
  cardBorderRadius: Animated,
  cardTranslateX: Animated,
  cardTranslateY: Animated,
  height: Animated,
  borderRadius: Animated
};

export default class AppStoreInteraction extends Component<Props, State> {
  image: Image;
  card: View;

  constructor(props: Props) {
    YellowBox.ignoreWarnings([
      "Warning: isMounted(...) is deprecated",
      "Module RCTImageLoader"
    ]);
    super(props);
    this.state = {
      isOpen: false,
      cardWidth: new Animated.Value(DEFAULT_CARD_WIDTH),
      cardHeight: new Animated.Value(DEFAULT_CARD_HEIGHT),
      cardBorderRadius: new Animated.Value(16),
      cardTranslateX: new Animated.Value(0),
      cardTranslateY: new Animated.Value(0),
      height: new Animated.Value(DEFAULT_IMAGE_WIDTH),
      borderRadius: new Animated.Value(DEFAULT_BORDER_RADIUS)
    };
  }

  componentDidMount() {}

  onPressInImage = () => {};

  onPressCard = () => {
    if (!this.state.isOpen) {
      this.openCardAnimation();
      this.setState({ isOpen: true });
    } else {
      this.closeCardAnimation();
      this.setState({ isOpen: false });
    }
  };

  openCardAnimation = () => {
    if (this.card) {
      this.card.measure((fx, fy, width, height, px, py) => {
        Animated.parallel([
          // カードのアニメーション
          Animated.spring(this.state.cardWidth, {
            toValue: Dimensions.get("window").width
          }),
          Animated.spring(this.state.cardHeight, {
            toValue: Dimensions.get("window").height
          }),
          Animated.spring(this.state.cardBorderRadius, { toValue: 0 }),
          Animated.spring(this.state.cardTranslateX, { toValue: -fx }),
          Animated.spring(this.state.cardTranslateY, { toValue: -fy }),

          // 画像のアニメーション
          Animated.spring(this.state.height, { toValue: 300 }),
          Animated.spring(this.state.borderRadius, { toValue: 0 })
        ]).start(() => {
          // 別のビューに遷移させる記述
        });
      });
    }
  };

  closeCardAnimation = () => {
    Animated.parallel([
      // カードのアニメーション
      Animated.spring(this.state.cardWidth, {
        toValue: DEFAULT_CARD_WIDTH
      }),
      Animated.spring(this.state.cardHeight, {
        toValue: DEFAULT_CARD_HEIGHT
      }),
      Animated.spring(this.state.cardBorderRadius, {
        toValue: DEFAULT_BORDER_RADIUS
      }),
      Animated.spring(this.state.cardTranslateX, { toValue: 0 }),
      Animated.spring(this.state.cardTranslateY, { toValue: 0 }),

      // 画像のアニメーション
      Animated.spring(this.state.height, { toValue: DEFAULT_IMAGE_WIDTH }),
      Animated.spring(this.state.borderRadius, {
        toValue: DEFAULT_BORDER_RADIUS
      })
    ]).start(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={false}
          animationType={"slide"}
          onRequestClose={() => {}}
        >
          <Text>hoge</Text>
        </Modal>
        <View style={{ padding: 24 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.onPressCard();
            }}
          >
            <View
              ref={ref => {
                this.card = ref;
              }}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [
                      { translateX: this.state.cardTranslateX },
                      { translateY: this.state.cardTranslateY }
                    ],
                    borderRadius: this.state.cardBorderRadius,
                    width: this.state.cardWidth,
                    height: this.state.cardHeight
                  }
                ]}
              >
                <View
                  style={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: "hidden"
                  }}
                >
                  <Animated.Image
                    style={{
                      width: "100%",
                      height: this.state.height
                    }}
                    source={require("../assets/images/hireo.jpeg")}
                  />
                </View>
                <View style={styles.cardBodyArea}>
                  <Text style={[styles.titleText, { marginBottom: 4 }]}>
                    Title
                  </Text>
                  <Text style={[styles.bodyText, { marginBottom: 4 }]}>
                    This is card component sample.
                  </Text>
                  <Text
                    numberOfLines={!this.state.isOpen ? 1 : null}
                    style={[styles.footerText, { marginBottom: 4 }]}
                  >
                    samplesample samplesample samplesample samplesample
                    samplesample samplesample samplesample samplesample
                    samplesample samplesample samplesample samplesample
                    samplesample samplesample
                  </Text>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
