export class Tag {
  constructor(id, name, color, icon) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
  }
}

export const createTag = (id, name, color, icon) => ({
  id,
  name,
  color,
  icon,
});

export default { Tag, createTag };