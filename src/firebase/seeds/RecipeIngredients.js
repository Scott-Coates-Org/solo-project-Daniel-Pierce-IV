import RecipeIngredients from '../models/RecipeIngredients';

export async function seedRecipeIngredientsData() {
  return Promise.all(
    recipeSeeds.map((recipe) =>
      RecipeIngredients.add(
        RecipeIngredients.toData(recipe.name, recipe.ingredients)
      )
    )
  );
}
