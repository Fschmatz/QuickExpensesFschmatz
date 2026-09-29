import { TagItem } from "../../entities/tag";

export const selectTagById = (id: number | string) => (state: any): TagItem | undefined => {
  return state.tags.list.find((tag: TagItem) => Number(tag.id) === Number(id));
};

export default { selectTagById };
