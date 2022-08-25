import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/client';
import ButtonDialog from '../ButtonDialog';
import AuthFormController from '../forms/auth/AuthFormController';
import IngredientSearch from './ingredient-search/IngredientSearch';
import IngredientFilterContainer from './ingredient-search/IngredientFilterContainer';
import IngredientFilter from './ingredient-search/IngredientFilter';

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

        <div className={`h-full ${searchbarEmpty ? 'hidden' : 'block'}`}>
          <IngredientFilterContainer label="Search Results">
            {prunedSearchIngredients.map((ingredient) => (
              <li key={ingredient.id}>
                <IngredientFilter
                  name={ingredient.name}
                  onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                  onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                  onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                />
              </li>
            ))}
          </IngredientFilterContainer>
        </div>

        <IngredientFilterContainer label="Selected Ingredients">
          {mustHaveFilters.map((ingredient) => (
            <li key={ingredient.id}>
              <IngredientFilter
                name={ingredient.name}
                isMustHave={true}
                onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                onMustHaveRemove={onMustHaveRemove.bind(null, ingredient)}
                onCanHaveRemove={onCanHaveRemove.bind(null, ingredient)}
                onCantHaveRemove={onCantHaveRemove.bind(null, ingredient)}
              />
            </li>
          ))}

          {canHaveFilters.map((ingredient) => (
            <li key={ingredient.id}>
              <IngredientFilter
                name={ingredient.name}
                isCanHave={true}
                onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                onMustHaveRemove={onMustHaveRemove.bind(null, ingredient)}
                onCanHaveRemove={onCanHaveRemove.bind(null, ingredient)}
                onCantHaveRemove={onCantHaveRemove.bind(null, ingredient)}
              />
            </li>
          ))}

          {cantHaveFilters.map((ingredient) => (
            <li key={ingredient.id}>
              <IngredientFilter
                name={ingredient.name}
                isCantHave={true}
                onMustHaveSelect={onMustHaveSelect.bind(null, ingredient)}
                onCanHaveSelect={onCanHaveSelect.bind(null, ingredient)}
                onCantHaveSelect={onCantHaveSelect.bind(null, ingredient)}
                onMustHaveRemove={onMustHaveRemove.bind(null, ingredient)}
                onCanHaveRemove={onCanHaveRemove.bind(null, ingredient)}
                onCantHaveRemove={onCantHaveRemove.bind(null, ingredient)}
              />
            </li>
          ))}
        </IngredientFilterContainer>
      </div>

      {user ? (
        <div className="flex justify-between items-center py-1 text-white">
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
            className="px-4 text-xl py-1 rounded-full bg-recipe-green text-white hover:brightness-[82%]"
            content={'Sign in'}
          >
            <AuthFormController />
          </ButtonDialog>
        </div>
      )}
    </aside>
  );
}
