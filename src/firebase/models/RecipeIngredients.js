import Ingredient from './Ingredient';
import Model from './Model';

export default class RecipeIngredients extends Model {
  static get collectionName() {
    return 'recipe_ingredients';
  }

  // Returns data structure in the format expected by database
  static toData(recipeId, ingredientNames) {
    return {
      recipeId,
      ingredientIds: ingredientNames.map(Ingredient.nameToId),
    };
  }
}
