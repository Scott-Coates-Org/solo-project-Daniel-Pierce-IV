import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase/client';
import { Ingredients } from '../../firebase/models/ingredients';
import { useEffect } from 'react';
import RecipeForm from '../forms/Recipeform';

export default function AdminPage({}) {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function fetchIngredients() {
    Ingredients.all().then((data) => setIngredients(data));
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

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

      fetchIngredients();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-start gap-5">
      <RecipeForm />

      <form
        action=""
        className="flex flex-col w-96 border p-3"
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

      <div className="flex flex-col">
        {ingredients.map((ingredient, i) => (
          <div key={i}>{ingredient.name}</div>
        ))}
      </div>
    </div>
  );
}
