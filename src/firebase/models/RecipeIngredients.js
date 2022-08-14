import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../client';
import { ingredientNameToId } from './Ingredient';

function RecipeIngredientsModel(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Database interaction functions

// Returns all documents as RecipeIngredients from recipe_ingredients collection
async function getAll() {
  const querySnapshot = await getDocs(collection(db, 'recipe_ingredients'));
  return querySnapshot.docs.map(RecipeIngredientsModel);
}

async function getAllThen(callback) {
  callback(await getAll());
}

// Creates a new RecipeIngredients as document in the recipe_ingredients collection
async function add(recipeId, ingredientNames) {
  if (!recipeId || !ingredientNames) {
    throw Error('Missing recipeIngredients data, not connecting to database');
  }

  try {
    await addDoc(collection(db, 'recipe_ingredients'), {
      recipeId,
      ingredientIds: ingredientNames.map(ingredientNameToId),
    });
  } catch (error) {
    console.log(error);
  }
}

export const RecipeIngredients = {
  add,
  getAll,
  getAllThen,
};
