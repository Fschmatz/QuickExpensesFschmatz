import React from "react";
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
          backgroundColor: theme.colors.elevation.level3,
        },
        style,
      ]}
    >
      {childArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childArray.length - 1 && (
            <Divider
              style={{ backgroundColor: theme.colors.background, height: 1 }}
            />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
};

export default CardList;
