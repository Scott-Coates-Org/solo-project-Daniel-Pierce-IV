import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase/client';

export default function IngredientForm({ onSubmit }) {
  const [name, setName] = useState('');

  async function createIngredient(e) {
    e.preventDefault();

    try {
      const ingredientData = {
        name: name,
      };

      setName('');

      const ingredientRef = await addDoc(
        collection(db, 'ingredients'),
        ingredientData
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      action=""
      className="flex flex-col w-96 border p-3"
      onSubmit={(e) => {
        createIngredient(e);
        onSubmit();
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
