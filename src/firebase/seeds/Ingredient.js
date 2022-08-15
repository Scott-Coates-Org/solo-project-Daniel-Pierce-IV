import Ingredient from '../models/Ingredient';
import { ingredientNames } from './Recipe';

// Uses all unique ingredients in the recipe seeder
export async function seedIngredientData() {
  return Promise.all(
    ingredientNames
      .map((ingredientName) => ({
        name: ingredientName,
      }))
      .map((ingredient) => Ingredient.add(ingredient))
  );
}
