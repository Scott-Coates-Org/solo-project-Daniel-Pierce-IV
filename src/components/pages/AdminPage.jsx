import RecipeForm from '../forms/Recipeform';
import IngredientForm from '../forms/IngredientForm';

export default function AdminPage({ ingredients }) {
  return (
    <div className="flex justify-center items-start gap-5">
      <RecipeForm />

      <IngredientForm />

      <div className="flex flex-col">
        {ingredients.map((ingredient, i) => (
          <div key={i}>{ingredient.name}</div>
        ))}
      </div>
    </div>
  );
}
