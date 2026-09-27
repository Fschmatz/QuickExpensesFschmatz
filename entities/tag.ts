export interface TagItem {
  id?: number;
  name: string;
  color: string;
  icon: string;
}

export class Tag {
  id?: number;
  name: string;
  color: string;
  icon: string;

  constructor(id?: number, name: string = "", color: string = "", icon: string = "") {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
  }
}

export const createTag = (
  id?: number,
  name: string = "",
  color: string = "",
  icon: string = ""
): TagItem => ({
  id,
  name,
  color,
  icon,
});

export default { Tag, createTag };
