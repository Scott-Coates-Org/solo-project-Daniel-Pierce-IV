import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../client';

const recipeSeeds = [
  {
    name: 'Chicken Pad Thai',
    description:
      'Noodles slathered in a savory sauce, served with crushed peanuts and your choice of protein',
    ingredients: ['Chicken', 'Noodles', 'Peanuts', 'Lime'],
    instructions: [
      'Cut up the chicken',
      'Do stuff with the noodles',
      'Make the Sauuuuuuce',
      'Assemble',
    ],
    imagePath: 'chicken-pad-thai/card.jpg',
  },
  {
    name: 'Sushi',
    description:
      'A culinary delight consisting of rice, seaweed, and your choice of fish',
    ingredients: ['Fish', 'Rice', 'Seaweed'],
    instructions: ['Go to a japanese restaurant', 'Order what you want'],
    imagePath: 'sushi/card.jpg',
  },
  {
    name: 'Butter Chicken',
    description: 'Filled with chicken and sauuuuuuuce',
    ingredients: ['Chicken', 'Tomato', 'Butter', 'Rice'],
    instructions: ['Cut up the chicken', '???', 'Profit'],
    imagePath: 'butter-chicken/card.jpg',
  },
  {
    name: 'Waffle Sandwich',
    description:
      'Peanut butter and jelly sandwich, but waffles instead of bread and maple syrup instead of jelly',
    ingredients: ['Peanut Butter', 'Waffle', 'Maple Syrup'],
    instructions: [
      'Throw a couple frozen waffles in the toaster',
      'Slather em with peanut butter',
      'Drench them in maple syrup',
    ],
    imagePath: 'waffle-sandwich/card.png',
  },
  {
    name: 'Breakfast Quesadilla',
    description: "For when you need Mexican food first thing in the mornin'",
    ingredients: ['Egg', 'Cheese', 'Chipotle Ranch', 'Flour Tortilla'],
    instructions: [
      'Crack 2 eggs',
      'Whisk',
      'Scramble in a skillet',
      'Remove the eggs from the skillet',
      'Melt some butter in the skillet',
      'Sear one side of a flour torilla in the skillet',
      'Flip the tortilla over in the skillet',
      'Place your eggs, cheese, and sauce on the tortilla in the skillet',
      'Fold in half and sear each side of the quesadilla in the skillet',
      'Remove the quasadilla from the skillet',
    ],
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
