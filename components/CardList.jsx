import React from "react";
import { View } from "react-native";
import { useTheme, Divider, Card } from "react-native-paper";

const CardList = ({ children, style, mode = "contained" }) => {
  const childArray = React.Children.toArray(children).filter(Boolean);
  const theme = useTheme();

  return (
    <Card
      mode={mode}
      style={[
        {
          elevation: 0,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: theme?.colors?.elevation?.level3 || theme?.colors?.surfaceVariant || theme?.colors?.surface,
        },
        style,
      ]}
    >
      {childArray.map((child, index) => (
        <View key={index}>
          {child}
          {index < childArray.length - 1 && (
            <Divider
              style={{ backgroundColor: theme?.colors?.background || "#00000020", height: 1 }}
            />
          )}
        </View>
      ))}
    </Card>
  );
};

export default CardList;
