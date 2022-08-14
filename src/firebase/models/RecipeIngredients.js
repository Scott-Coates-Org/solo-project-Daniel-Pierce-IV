import { addDoc, collection } from 'firebase/firestore';
import { db } from '../client';
import Ingredient from './Ingredient';
import Model from './Model';

export default class RecipeIngredients extends Model {
  static get collectionName() {
    return 'recipe_ingredients';
  }

  static async add(recipeId, ingredientNames) {
    if (!recipeId || !ingredientNames) {
      throw Error('Missing recipeIngredients data, not connecting to database');
    }

    try {
      await addDoc(collection(db, this.collectionName), {
        recipeId,
        ingredientIds: ingredientNames.map(Ingredient.nameToId),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
