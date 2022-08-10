import { addDoc, collection, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { db, storage } from '../../firebase/client';
import { useUploadFile } from 'react-firebase-hooks/storage';

export default function AdminPage({}) {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientName, setIngredientName] = useState('');

  const [image, setImage] = useState(null);
  const [uploadFile] = useUploadFile();

  async function createRecipe(e) {
    e.preventDefault();

    if (image) {
      try {
        const recipeData = {
          name: recipeName,
          description,
        };

        const recipeRef = await addDoc(collection(db, 'recipes'), recipeData);

        const imageRef = ref(storage, `${recipeRef.id}/card`);

        const result = await uploadFile(imageRef, image);

        await setDoc(recipeRef, {
          ...recipeData,
          imageURL: await getDownloadURL(imageRef),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function createIngredient(e) {
    e.preventDefault();

    try {
      const ingredientData = {
        name: ingredientName,
      };

      setIngredientName('');

      const ingredientRef = await addDoc(
        collection(db, 'ingredients'),
        ingredientData
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center gap-5">
      <form action="" className="flex flex-col w-96" onSubmit={createRecipe}>
        <h1 className="text-2xl">Add recipe to Database</h1>

        <div>
          <label htmlFor="recipe-name">Name</label>
          <input
            type="text"
            name="recipeName"
            id="recipe-name"
            className="border w-full"
            onChange={(e) => setRecipeName(e.target.value)}
            value={recipeName}
          />
        </div>

        <div>
          <label htmlFor="recipe-description">Description</label>
          <textarea
            className="border w-full"
            name="recipeDescription"
            id="recipe-description"
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div>
          <label htmlFor="recipe-image">Name</label>
          <input
            type="file"
            name="recipeImage"
            id="recipe-image"
            className="border w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="self-end bg-green-500 px-2 mt-4">
          Create Recipe
        </button>
      </form>

      <form
        action=""
        className="flex flex-col w-96"
        onSubmit={createIngredient}
      >
        <h1 className="text-2xl">Add ingredient to Database</h1>

        <div>
          <label htmlFor="ingredient-name">Name</label>
          <input
            type="text"
            name="ingredientName"
            id="ingredient-name"
            className="border w-full"
            onChange={(e) => setIngredientName(e.target.value)}
            value={ingredientName}
            required
          />
        </div>

        <button type="submit" className="self-end bg-green-500 px-2 mt-4">
          Create Ingredient
        </button>
      </form>
    </div>
  );
}
