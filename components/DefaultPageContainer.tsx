import React, { ReactNode } from "react";
import { ScrollView, StyleProp, ViewStyle, StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";
import SizedBox from "./SizedBox";
import { useStyles } from "@utils";

export interface DefaultPageContainerProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DefaultPageContainer: React.FC<DefaultPageContainerProps> = ({
  children,
  style,
}) => {
  const styles = useStyles(createStyles);

  return (
    <ScrollView
      style={[styles.container, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
      <SizedBox height={50} />
    </ScrollView>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
  });

export default DefaultPageContainer;
