import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../client';

const recipeSeeds = [
  {
    name: 'Chicken Pad Thai',
    description:
      'Noodles slathered in a savory sauce, served with crushed peanuts and your choice of protein',
    ingredients: ['Chicken', 'Noodles', 'Peanuts', 'Lime'],
    imagePath: 'chicken-pad-thai/card.jpg',
  },
  {
    name: 'Sushi',
    description:
      'A culinary delight consisting of rice, seaweed, and your choice of fish',
    ingredients: ['Fish', 'Rice', 'Seaweed'],
    imagePath: 'sushi/card.jpg',
  },
  {
    name: 'Butter Chicken',
    description: 'Filled with chicken and sauuuuuuuce',
    ingredients: ['Chicken', 'Tomato', 'Butter', 'Rice'],
    imagePath: 'butter-chicken/card.jpg',
  },
  {
    name: 'Waffle Sandwich',
    description:
      'Peanut butter and jelly sandwich, but waffles instead of bread and maple syrup instead of jelly',
    ingredients: ['Peanut Butter', 'Waffle', 'Maple Syrup'],
    imagePath: 'waffle-sandwich/card.png',
  },
  {
    name: 'Breakfast Quesadilla',
    description: "For when you need Mexican food first thing in the mornin'",
    ingredients: ['Egg', 'Cheese', 'Chipotle Ranch', 'Flour Tortilla'],
    imagePath: 'breakfast-quesadilla/card.png',
  },
];

function getUniqueIngredientNames() {
  const ingredientNameSet = new Set();

  recipeSeeds.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) =>
      ingredientNameSet.add(ingredient)
    );
  });

  return Array.from(ingredientNameSet);
}

export const ingredientNames = getUniqueIngredientNames();

export async function seedRecipeData() {
  // images are already pre-uploaded to storage. Just get the URL
  const URLs = await Promise.all(
    recipeSeeds.map((recipe) => getDownloadURL(ref(storage, recipe.imagePath)))
  );

  recipeSeeds.forEach((recipe, i) => {
    delete recipe.imagePath;
    recipe.imageURL = URLs[i];
    setDoc(doc(db, 'recipes', recipe.name), recipe);
  });
}
