import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../firebase/models/Recipe';
import FavoriteButton from '../FavoriteButton';
import RecipeIngredientInfo from '../RecipeIngredientInfo';
import RecipeInstructionInfo from '../RecipeInstructionInfo';
import RecipeTimeInfo from '../RecipeTimeInfo';

export default function RecipePage({
  favoriteRecipeIds,
  onFavorite,
  onUnfavorite,
}) {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();

  useEffect(() => {
    Recipe.getById(id).then(setRecipe);
  }, []);

  function getFavoritedStatus() {
    return favoriteRecipeIds.includes(id);
  }

  function toggleFavoritedStatus() {
    if (getFavoritedStatus()) {
      onUnfavorite(recipe);
    } else {
      onFavorite(recipe);
    }
  }

  return (
    recipe && (
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="grow relative">
            <div
              style={{
                backgroundImage: `url(${recipe.imageURL})`,
              }}
              className="image brightness-50 w-full h-[50vh] rounded-[5rem] bg-cover bg-center"
            />

            <div className="flex justify-between absolute inset-x-10 top-10">
              <h1 className="text-6xl text-white ">{recipe.name}</h1>

              <FavoriteButton
                isFavorited={getFavoritedStatus()}
                onClick={toggleFavoritedStatus}
              />
            </div>

            <RecipeTimeInfo className="absolute right-0 bottom-[30%]" />
          </div>

          <RecipeIngredientInfo ingredients={recipe.ingredients} />
        </div>

        <RecipeInstructionInfo instructions={recipe.instructions} />
      </div>
    )
  );
}
