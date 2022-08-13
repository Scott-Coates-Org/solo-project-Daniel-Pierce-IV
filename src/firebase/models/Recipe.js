import { collection, getDocs } from 'firebase/firestore';
import { db } from '../client';

function RecipeModel(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Database interaction functions

// Returns all documents from recipe collection
async function getAll() {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  return querySnapshot.docs.map(RecipeModel);
}

async function getAllThen(callback) {
  callback(await getAll());
}

export const Recipe = {
  getAll,
  getAllThen,
};
