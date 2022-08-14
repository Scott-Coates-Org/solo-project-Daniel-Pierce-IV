import { seedIngredientData } from './seeds/Ingredient';
import { seedRecipeData } from './seeds/Recipe';

export default async function seedDatabase() {
  seedRecipeData();
  seedIngredientData();
}
