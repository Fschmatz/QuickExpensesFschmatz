export interface Tag {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export const createTag = (id: number, name: string, color: string, icon: string): Tag => ({
  id,
  name,
  color,
  icon,
});

export default { createTag };