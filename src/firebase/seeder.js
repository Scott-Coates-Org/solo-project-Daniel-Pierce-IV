import { seedIngredientData } from './seeds/Ingredient';
import { seedRecipeData } from './seeds/Recipe';
import { seedRecipeIngredientsData } from './seeds/RecipeIngredients';

export default async function seedDatabase() {
  await Promise.all([
    seedRecipeData(),
    seedIngredientData(),
    seedRecipeIngredientsData(),
  ]);

  console.log('Database seeded successfully');
}
