import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../firebase/models/Recipe';

export default function RecipePage() {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();

  useEffect(() => {
    Recipe.getById(id).then(setRecipe);
  }, []);

  return (
    recipe && (
      <div className="flex p-12">
        <div className="flex flex-col">
          <div className="flex relative">
            <img
              className="aspect-video"
              src={recipe.imageURL}
              alt={`Picture of ${recipe.name}`}
            />

            <h1 className="absolute left-0 right-0 bg-[rgba(0,0,0,0.7)] text-6xl text-white py-2">
              {recipe.name}
            </h1>
          </div>

          <div className="text-4xl border-b-2 border-black pb-1 mb-2">
            Ingredients
          </div>

          <ul className="grid grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="list-disc list-inside text-2xl">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col bg-gray-100 ml-6">
          <div className="text-4xl border-b-2 border-black pb-1 mb-2">
            Instructions
          </div>

          <ul>
            {recipe.instructions.map((instruction, i) => (
              <li key={i} className="list-decimal list-inside text-2xl">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}