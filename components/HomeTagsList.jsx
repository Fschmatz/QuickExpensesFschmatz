import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { appColors } from "@constants";
import { darkenColor } from "@utils";

const StyledScrollView = styled(ScrollView)``;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0px 8px;
`;

const HomeTagChip = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || appColors.background};
  border-radius: 50px;
  padding: 8px 12px;
  gap: 6px;
`;

const ChipText = styled.Text`
  color: ${appColors.text};
  font-size: 14px;
  font-weight: 500;
`;

const HomeTagsList = ({ tags, selectedTag, onSelectTag }) => {
  const isSelected = (tagId) => selectedTag?.id === tagId;

  const getBackgroundColor = (tag) =>
    isSelected(tag.id) ? safeDarkenColor(tag.color, 40) : appColors.background;

  const getTextColor = (tag) =>
    isSelected(tag.id) ? appColors.text : tag.color;

  const safeDarkenColor = (color, percent) => {
    const darkened = darkenColor(color, percent);
    const rgbMatch = darkened.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);

      if (r <= 30 && g <= 30 && b <= 30) {
        return color;
      }
    }
    return darkened;
  };

  return (
    <StyledScrollView>
      <TagsContainer>
        {tags.map((tag) => (
          <HomeTagChip
            key={tag.id}
            backgroundColor={getBackgroundColor(tag)}
            onPress={() => onSelectTag(tag)}
            activeOpacity={0.5}
          >
            <Ionicons name={tag.icon} size={18} color={getTextColor(tag)} />
            <ChipText>{tag.name}</ChipText>
          </HomeTagChip>
        ))}
      </TagsContainer>
    </StyledScrollView>
  );
};

export default HomeTagsList;
