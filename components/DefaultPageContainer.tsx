import React, { ReactNode } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import SizedBox from "./SizedBox";

export interface DefaultPageContainerProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DefaultPageContainer: React.FC<DefaultPageContainerProps> = ({ children, style }) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingHorizontal: 16,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
      <SizedBox height={50} />
    </ScrollView>
  );
};

export default DefaultPageContainer;
