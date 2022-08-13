import { useState } from 'react';
import { Recipe } from '../../firebase/models/Recipe';

export default function RecipeForm({}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');

  function createRecipe(e) {
    e.preventDefault();
    Recipe.add({ name, description, imageFile, ingredients });
  }

  function addIngredient() {
    setIngredients([...ingredients, ingredientName]);
    setIngredientName('');
  }

  return (
    <form
      action=""
      className="flex flex-col w-96 border p-3 gap-3"
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

      <ul className="border-4 p-2">
        <li>Ingredients:</li>
        {ingredients.map((ingredient) => (
          <li
            key={ingredient}
            onClick={() =>
              setIngredients(
                ingredients.filter((element) => element !== ingredient)
              )
            }
          >
            {ingredient}
          </li>
        ))}
      </ul>

      <div>
        <label htmlFor="ingredient-name">Ingredient Name</label>
        <div className="flex">
          <input
            type="text"
            name="ingredientName"
            id="ingredient-name"
            className="border w-full"
            onChange={(e) => setIngredientName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addIngredient();
              }
            }}
            value={ingredientName}
          />
          <button
            type="button"
            className="bg-red-300 px-2"
            onClick={addIngredient}
          >
            Add
          </button>
        </div>
      </div>

      <button type="submit" className="self-end bg-green-500 px-2 mt-4">
        Create Recipe
      </button>
    </form>
  );
}
