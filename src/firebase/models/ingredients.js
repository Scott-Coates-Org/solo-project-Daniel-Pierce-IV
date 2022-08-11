import { collection, getDocs } from 'firebase/firestore';
import { db } from '../client';

function IngredientFactory(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Database interaction functions

// Retrieves all documents from ingredient collection
async function all() {
  const querySnapshot = await getDocs(collection(db, 'ingredients'));

  const ingredients = [];

  querySnapshot.forEach((doc) => ingredients.push(IngredientFactory(doc)));

  return ingredients;
}

async function allThen(callback) {
  callback(await all());
}

export const Ingredients = {
  all,
  allThen,
};
