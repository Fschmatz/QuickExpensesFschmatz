import React from "react";
import { View } from "react-native";

export interface SizedBoxProps {
  height?: number;
  width?: number;
}

const SizedBox: React.FC<SizedBoxProps> = ({ height, width }) => {
  return <View style={{ height: height ?? 0, width: width ?? 0 }} />;
};

export default SizedBox;
