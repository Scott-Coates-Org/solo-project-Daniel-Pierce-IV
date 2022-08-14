import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../client';
import { RecipeIngredients } from './RecipeIngredients';

function RecipeModel(document) {
  return {
    id: document.id,
    ...document.data(),
  };
}

// Database interaction functions

// Returns all documents as Recipes from recipes collection
async function getAll() {
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  return querySnapshot.docs.map(RecipeModel);
}

async function getAllThen(callback) {
  callback(await getAll());
}

// Returns documents with matching ids as Recipes from recipes collection
async function getByIds(ids) {
  const docs = await Promise.all(
    ids.map((id) => getDoc(doc(db, 'recipes', id)))
  );

  return docs.map(RecipeModel);
}

async function getByIdsThen(ids, callback) {
  callback(await getByIds(ids));
}

// Creates a new Recipe as document in the recipes collection,
// and stores its associated image in Storage as "{recipe_id}/card"
async function add(recipeData) {
  if (!recipeData.name || !recipeData.description || !recipeData.imageFile) {
    throw Error('Missing recipe data, not connecting to database');
  }

  const { imageFile } = recipeData;
  delete recipeData.imageFile;

  try {
    const recipeRef = await addDoc(collection(db, 'recipes'), recipeData);

    RecipeIngredients.add(recipeRef.id, recipeData.ingredients);

    const storageRef = ref(storage, `${recipeRef.id}/card`);
    await uploadBytes(storageRef, imageFile);

    await setDoc(recipeRef, {
      ...recipeData,
      imageURL: await getDownloadURL(storageRef),
    });
  } catch (error) {
    console.log(error);
  }
}

export const Recipe = {
  add,
  getAll,
  getAllThen,
  getByIds,
  getByIdsThen,
};
