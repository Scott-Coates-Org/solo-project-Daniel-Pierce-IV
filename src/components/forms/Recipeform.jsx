import { addDoc, collection, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { db, storage } from '../../firebase/client';

export default function RecipeForm({}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadFile] = useUploadFile();

  async function createRecipe(e) {
    e.preventDefault();

    if (image) {
      try {
        const recipeData = {
          name: name,
          description,
        };

        const recipeRef = await addDoc(collection(db, 'recipes'), recipeData);

        const imageRef = ref(storage, `${recipeRef.id}/card`);

        const result = await uploadFile(imageRef, image);

        await setDoc(recipeRef, {
          ...recipeData,
          imageURL: await getDownloadURL(imageRef),
        });

        setName('');
        setDescription('');
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form
      action=""
      className="flex flex-col w-96 border p-3"
      onSubmit={createRecipe}
    >
      <h1 className="text-2xl">Add recipe to Database</h1>

      <div>
        <label htmlFor="recipe-name">Name</label>
        <input
          type="text"
          name="recipeName"
          id="recipe-name"
          className="border w-full"
          onChange={(e) => setName(e.target.value)}
          value={name}
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
  );
}
