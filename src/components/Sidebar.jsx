import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';
import ButtonDialog from './ButtonDialog';
import AuthFormController from './forms/auth/AuthFormController';
import IngredientSearch from './ingredient-search/IngredientSearch';
import IngredientSearchResult from './ingredient-search/IngredientSearchResult';

export default function Sidebar({
  ingredients,
  mustHaveFilters,
  canHaveFilters,
  cantHaveFilters,
  onMustHaveSelect,
  onMustHaveRemove,
  onCanHaveSelect,
  onCanHaveRemove,
  onCantHaveSelect,
  onCantHaveRemove,
}) {
  const [user] = useAuthState(auth);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [searchbarEmpty, setSearchbarEmpty] = useState(true);

  const selectedIngredients = [
    ...mustHaveFilters,
    ...canHaveFilters,
    ...cantHaveFilters,
  ];

  const selectedIngredientIds = selectedIngredients.map(
    (ingredient) => ingredient.id
  );

  // Dont show ingredients weve already selected in the results
  const prunedSearchIngredients = searchIngredients.filter(
    (ingredient) => !selectedIngredientIds.includes(ingredient.id)
  );

  return (
    <aside className="flex flex-col p-5 gap-5">
      <div className="group grow flex flex-col gap-5">
        <IngredientSearch
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onMustHaveSelect={onMustHaveSelect}
          onCanHaveSelect={onCanHaveSelect}
          onCantHaveSelect={onCantHaveSelect}
          onUpdateSearchIngredients={setSearchIngredients}
          setSearchbarEmpty={setSearchbarEmpty}
        />

        <div
          className={`h-full flex flex-col bg-recipe-gray-light rounded-xl text-white p-4 ${
            searchbarEmpty ? 'hidden' : 'flex'
          }`}
        >
          <h3 className="text-2xl">Search Results</h3>

          {/* rtl with ltr reversal for left-side scrollbar */}
          <div
            className="grow relative overflow-y-scroll ingredient-scrollbar"
            dir="rtl"
          >
            <ul className="flex flex-col gap-2 p-3 absolute inset-0" dir="ltr">
              {prunedSearchIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <IngredientSearchResult
                    name={ingredient.name}
                    onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                    onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                    onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-full flex flex-col bg-recipe-gray-light rounded-xl text-white p-4">
          <h3 className="text-2xl">Selected Ingredients</h3>

          {/* rtl with ltr reversal for left-side scrollbar */}
          <div
            className="grow relative overflow-y-scroll ingredient-scrollbar direct"
            dir="rtl"
          >
            <ul
              className="flex flex-col gap-2 p-3 absolute inset-0 text"
              dir="ltr"
            >
              {selectedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <IngredientSearchResult
                    name={ingredient.name}
                    onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                    onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                    onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {user ? (
        <div className="flex justify-between items-center text-white">
          <span className="text-xl">
            {user.displayName ? user.displayName : user.email}
          </span>

          <button
            type="button"
            className="text-md hover:underline hover:text-recipe-red"
            onClick={() => auth.signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <ButtonDialog
            className="px-4 text-xl bg-recipe-green hover:brightness-[82%]"
            content={'Sign in'}
          >
            <AuthFormController />
          </ButtonDialog>
        </div>
      )}
    </aside>
  );
}
