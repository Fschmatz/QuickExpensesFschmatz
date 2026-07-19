import { View } from "react-native";

const SizedBox = ({ height, width }) => {
  return <View style={{ height: height ?? 0, width: width ?? 0 }} />;
};

export default SizedBox;