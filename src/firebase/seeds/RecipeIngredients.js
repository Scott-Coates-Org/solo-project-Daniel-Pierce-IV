import RecipeIngredients from '../models/RecipeIngredients';
import { recipeNameAsId, recipeSeeds } from './Recipe';

export async function seedRecipeIngredientsData() {
  return Promise.all(
    recipeSeeds.map((recipe) =>
      RecipeIngredients.add(
        RecipeIngredients.toData(
          recipeNameAsId(recipe.name),
          recipe.ingredients
        )
      )
    )
  );
}
