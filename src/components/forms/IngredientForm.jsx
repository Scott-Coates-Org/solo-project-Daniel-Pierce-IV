import { useState } from 'react';
import Ingredient from '../../firebase/models/Ingredient';

export default function IngredientForm() {
  const [name, setName] = useState('');

  function createIngredient(e) {
    e.preventDefault();
    Ingredient.add({ name }).then(setName.bind(null, ''));
  }

  return (
    <form
      action=""
      className="flex flex-col w-96 border p-3"
      onSubmit={(e) => {
        createIngredient(e);
      }}
    >
      <h1 className="text-2xl">Add ingredient to Database</h1>

      <div>
        <label htmlFor="ingredient-name">Name</label>
        <input
          type="text"
          name="ingredientName"
          id="ingredient-name"
          className="border w-full"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <button type="submit" className="self-end bg-green-500 px-2 mt-4">
        Create Ingredient
      </button>
    </form>
  );
}
