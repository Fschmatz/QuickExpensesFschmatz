import TagDAO from "../dao/tagDAO";
import { TagItem } from "../entities/tag";

class TagService {
  async insert(tag: TagItem): Promise<void> {
    await TagDAO.insert(tag.name, tag.color, tag.icon);
  }

  async fetchAll(): Promise<TagItem[]> {
    return await TagDAO.fetchAll();
  }

  async deleteById(tag: { id?: number } | number): Promise<void> {
    await TagDAO.deleteById(tag);
  }

  async deleteAll(): Promise<void> {
    await TagDAO.deleteAll();
  }

  async update(tag: TagItem): Promise<void> {
    await TagDAO.update(tag);
  }

  async importFromBackup(tags: TagItem[]): Promise<void> {
    await TagDAO.importFromBackup(tags);
  }
}

export default new TagService();
