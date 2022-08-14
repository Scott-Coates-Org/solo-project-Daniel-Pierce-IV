import { addDoc, collection, getDocs } from 'firebase/firestore';
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

// Creates a new Ingredient as document in the ingredients collection
async function add(ingredientData) {
  try {
    await addDoc(collection(db, 'ingredients'), ingredientData);
  } catch (error) {
    console.log(error);
  }
}

async function addThen(ingredientData, callback) {
  callback(await add(ingredientData));
}

export const Ingredient = {
  add,
  addThen,
  getAll,
  getAllThen,
};
