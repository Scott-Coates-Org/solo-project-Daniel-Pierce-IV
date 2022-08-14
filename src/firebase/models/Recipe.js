import { addDoc, collection, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../client';
import Model from './Model';
import { RecipeIngredients } from './RecipeIngredients';

export default class Recipe extends Model {
  static get collectionName() {
    return 'recipes';
  }

  static async add(data) {
    if (!data.name || !data.description || !data.imageFile) {
      throw Error('Missing recipe data, not connecting to database');
    }

    const { imageFile } = data;
    delete data.imageFile;

    try {
      const recipeRef = await addDoc(collection(db, this.collectionName), data);

      RecipeIngredients.add(recipeRef.id, data.ingredients);

      const storageRef = ref(storage, `${recipeRef.id}/card`);
      await uploadBytes(storageRef, imageFile);

      await setDoc(recipeRef, {
        ...data,
        imageURL: await getDownloadURL(storageRef),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
