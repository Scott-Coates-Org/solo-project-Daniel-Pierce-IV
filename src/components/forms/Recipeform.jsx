import { useState } from 'react';
import { Recipe } from '../../firebase/models/Recipe';

export default function RecipeForm({}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  function createRecipe(e) {
    e.preventDefault();
    Recipe.add({ name, description, imageFile });
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
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button type="submit" className="self-end bg-green-500 px-2 mt-4">
        Create Recipe
      </button>
    </form>
  );
}
