export const selectTagById = (id) => (state) => {
  return state.tags.list.find((tag) => Number(tag.id) === Number(id));
};

export default { selectTagById };
