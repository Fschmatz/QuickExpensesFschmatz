import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { KEYPAD_BUTTON } from "@constants";

export interface UseAnimatedPressRadiusOptions {
  initialRadius?: number;
  pressedRadius?: number;
  pressInDuration?: number;
  pressOutDuration?: number;
}

export const useAnimatedPressRadius = (
  options?: UseAnimatedPressRadiusOptions
) => {
  const initialRadius = options?.initialRadius ?? KEYPAD_BUTTON.radius.initial;
  const pressedRadius = options?.pressedRadius ?? KEYPAD_BUTTON.radius.pressed;
  const pressInDuration =
    options?.pressInDuration ?? KEYPAD_BUTTON.animationDuration.pressIn;
  const pressOutDuration =
    options?.pressOutDuration ?? KEYPAD_BUTTON.animationDuration.pressOut;

  const radius = useSharedValue(initialRadius);

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: radius.value,
  }));

  const onPressIn = () => {
    radius.value = withTiming(pressedRadius, {
      duration: pressInDuration,
      easing: Easing.out(Easing.ease),
    });
  };

  const onPressOut = () => {
    radius.value = withTiming(initialRadius, {
      duration: pressOutDuration,
      easing: Easing.out(Easing.ease),
    });
  };

  return { animatedStyle, onPressIn, onPressOut };
};
