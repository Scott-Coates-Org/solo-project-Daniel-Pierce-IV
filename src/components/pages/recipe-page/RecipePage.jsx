import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recipe from '../../../firebase/models/Recipe';
import FavoriteButton from '../FavoriteButton';
import RecipeIngredientInfo from './RecipeIngredientInfo';
import RecipeInstructionInfo from './RecipeInstructionInfo';
import RecipeMetaData from './RecipeMetaData';
import RecipeMetaInfo from './RecipeMetaInfo';
import RecipeTimeData from './RecipeTimeData';

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
        <div className="flex justify-between gap-8">
          <h1 className="text-7xl text-white ">{recipe.name}</h1>

          <FavoriteButton
            isFavorited={getFavoritedStatus()}
            onClick={toggleFavoritedStatus}
          />
        </div>

        <div className="flex gap-8 h-[50vh]">
          <div
            style={{
              backgroundImage: `url(${recipe.imageURL})`,
            }}
            className="image w-full rounded-[5rem] bg-cover bg-center"
          />

          <RecipeIngredientInfo ingredients={recipe.ingredients} />
        </div>

        <div className="flex flex-wrap gap-8">
          <RecipeMetaInfo>
            <RecipeMetaData label="Servings" quantity={4} />
          </RecipeMetaInfo>

          <RecipeMetaInfo className="grow">
            <RecipeTimeData label="Prep time" time={30} />
            <RecipeTimeData label="Cook time" time={15} />
            <RecipeTimeData label="Total time" time={45} />
          </RecipeMetaInfo>

          <RecipeMetaInfo className="grow">
            <RecipeMetaData label="Calories" quantity={600} />
            <RecipeMetaData label="Fats (g)" quantity={13} />
            <RecipeMetaData label="Carbs (g)" quantity={83} />
            <RecipeMetaData label="Protein (g)" quantity={38} />
          </RecipeMetaInfo>
        </div>

        <div className="flex gap-8">
          <RecipeInstructionInfo instructions={recipe.instructions} />
        </div>
      </div>
    )
  );
}
