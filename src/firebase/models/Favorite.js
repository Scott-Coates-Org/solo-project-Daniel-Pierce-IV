import { auth } from '../client';
import Model from './Model';

export default class Favorite extends Model {
  static get collectionName() {
    return 'favorites';
  }

  // Doesnt accept a UID on purpose. This is built around the idea that
  // whenever the user changes, favorite recipe data will be re-fetched with new
  // user's uid. This prevents fetching user1's favorites when user2 signs in
  static async getByCurrentUser() {
    let favoriteObj = await super.getById(auth.currentUser.uid);

    if (Object.keys(favoriteObj).length < 2) {
      // the document doesnt exist, so create it with default data
      favoriteObj.recipes = [];
      Favorite.set(favoriteObj);
    }

    return favoriteObj;
  }
}
