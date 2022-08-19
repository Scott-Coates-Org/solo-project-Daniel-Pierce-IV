import { useState } from 'react';
import Dialog from '../Dialog';
import AuthFormController from '../forms/auth/AuthFormController';
import RecipeCard from '../RecipeCard';

export default function FavoritesPage({ recipes }) {
  // Show auth form automatically if there are no recipes
  const [isShowingAuthForm, setIsShowingAuthForm] = useState(true);

  return recipes ? (
    <div>
      {recipes.length > 0 ? (
        <div className="flex gap-3">
          {recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
      ) : (
        <p>{'You have no favorite recipes :('}</p>
      )}
    </div>
  ) : (
    isShowingAuthForm && (
      <Dialog onClose={setIsShowingAuthForm.bind(null, false)}>
        <AuthFormController />
      </Dialog>
    )
  );
}
