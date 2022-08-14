import { collection, getDocs } from 'firebase/firestore';
import { db } from '../client';

function IngredientModel(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Database interaction functions

// Returns all documents as Ingredients from ingredients collection
async function getAll() {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));
  return querySnapshot.docs.map(IngredientModel);
}

async function getAllThen(callback) {
  callback(await getAll());
}

export const Ingredient = {
  getAll,
  getAllThen,
};
