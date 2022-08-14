import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../client';

function IngredientModel(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Ingredient ids are made to be easily readable in Firestore console
function ingredientNameToId(name) {
  return name.toLowerCase().split(' ').join('_');
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

// Creates (or updates) an Ingredient as document in the ingredients collection
async function add(ingredientData) {
  try {
    const ingredientId = ingredientNameToId(ingredientData.name);
    const ingredientRef = doc(db, 'ingredients', ingredientId);

    await setDoc(ingredientRef, ingredientData);
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
