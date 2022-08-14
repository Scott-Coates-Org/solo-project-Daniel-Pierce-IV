import { useEffect, useState } from 'react';
import Recipe from '../../firebase/models/Recipe';
import RecipeCard from '../RecipeCard';

export default function Homepage({ recipesToShow, isFiltered }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (recipesToShow.length > 0) {
      Recipe.getByIds(recipesToShow.map((recipe) => recipe.recipeId)).then(
        setRecipes
      );
    } else if (!isFiltered) {
      Recipe.getAll().then(setRecipes);
    } else {
      setRecipes([]);
    }
  }, [recipesToShow]);

  return (
    <div>
      <div className="flex gap-3">
        {recipes?.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
    </div>
  );
}
