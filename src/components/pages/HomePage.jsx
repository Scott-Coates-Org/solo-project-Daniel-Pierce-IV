import { useEffect, useState } from 'react';
import Recipe from '../../firebase/models/Recipe';
import RecipeCard from '../RecipeCard';

export default function Homepage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Recipe.getAll().then(setRecipes);
  }, []);

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
