import { doc, setDoc } from 'firebase/firestore';
import { db } from '../client';
import Model from './Model';

export default class Ingredient extends Model {
  static get collectionName() {
    return 'ingredients';
  }

  // Ingredient ids are made to be easily readable in Firestore console
  static nameToId(name) {
    return name.toLowerCase().split(' ').join('_');
  }

  static async add(data) {
    const ingredientRef = doc(
      db,
      Ingredient.collectionName,
      this.nameToId(data.name)
    );

    await setDoc(ingredientRef, data);
  }
}
