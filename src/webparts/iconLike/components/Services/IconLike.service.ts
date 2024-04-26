import { sp } from '@pnp/sp';

export interface ILike {
  numLikes: number;
  id: number;
}

export default class IconLikeService {
  async getNumLikes(): Promise<number> {
    try {
      const response = await sp.web.lists.getByTitle("IconLike").items.select("numLikes").filter("Title eq '1'").get();
      return response.length > 0 ? response[0].numLikes : 0;
    } catch (error) {
      throw new Error('Error fetching likes');
    }
  }

  async postLike(): Promise<void> {
    try {
      const currentLikes = await this.getNumLikes();
      await sp.web.lists.getByTitle("IconLike").items.filter("Title eq '1'").top(1).get().then(async (items) => {
        if (items.length > 0) {
          const itemId = items[0].Id;
          await sp.web.lists.getByTitle("IconLike").items.getById(itemId).update({
            numLikes: currentLikes + 1,
          });
        }
      });
    } catch (error) {
      throw new Error('Error posting like');
    }
  }
}
