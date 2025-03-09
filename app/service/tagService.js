import TagDAO from "../dao/tagDAO";

class TagService {
  async insert(tag) {
    await TagDAO.insert(tag.name, tag.color, tag.icon);
  }

  async fetchAll() {
    return await TagDAO.fetchAll();
  }

  async deleteById(tag) {
    await TagDAO.deleteById(tag);
  }

  async deleteAll() {
    await TagDAO.deleteAll();
  }

  async update(tag) {
    await TagDAO.update(tag);
  }

  async importFromBackup(tags) {
    await TagDAO.importFromBackup(tags);
  }
}

export default new TagService();
