import { useState } from 'react';
import { Ingredients } from '../../firebase/models/ingredients';
import { useEffect } from 'react';
import RecipeForm from '../forms/Recipeform';
import IngredientForm from '../forms/IngredientForm';

export default function AdminPage({}) {
  const [ingredients, setIngredients] = useState([]);

  function fetchIngredients() {
    Ingredients.all().then((data) => setIngredients(data));
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div className="flex justify-center items-start gap-5">
      <RecipeForm />

      <IngredientForm onSubmit={fetchIngredients} />

      <div className="flex flex-col">
        {ingredients.map((ingredient, i) => (
          <div key={i}>{ingredient.name}</div>
        ))}
      </div>
    </div>
  );
}
