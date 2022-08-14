import RecipeForm from '../forms/Recipeform';
import IngredientForm from '../forms/IngredientForm';
import seedDatabase from '../../firebase/seeder';

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

      <button
        type="button"
        className="bg-orange-400 px-4 py-2"
        onClick={seedDatabase}
      >
        Seed Database
      </button>
    </div>
  );
}
