import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from '../firebase/client';
import Ingredient from '../firebase/models/Ingredient';
import RecipeIngredients from '../firebase/models/RecipeIngredients';
import filterRecipes from '../recipe-filter';
import ButtonDialog from './ButtonDialog';
import FilterForm from './forms/FilterForm';
import AdminPage from './pages/AdminPage';
import Homepage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthFormController from './forms/auth/AuthFormController';
import Favorite from '../firebase/models/Favorite';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [mustHaveFilters, setMustHaveFilters] = useState([]);
  const [canHaveFilters, setCanHaveFilters] = useState([]);
  const [cantHaveFilters, setCantHaveFilters] = useState([]);
  const [user] = useAuthState(auth);
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    Ingredient.getAll().then(setIngredients);
    RecipeIngredients.getAll().then(setRecipeIngredients);
  }, []);

  useEffect(() => {
    if (user) {
      Favorite.getByCurrentUser().then(setFavorite);
    } else {
      setFavorite(null);
    }
  }, [user]);

  // Filter the recipes (as ids) to be shown to the user
  useEffect(() => {
    setRecipesToShow(
      filterRecipes(recipeIngredients, {
        mustHave: mustHaveFilters,
        cantHave: cantHaveFilters,
        canHave: canHaveFilters,
      })
    );
  }, [mustHaveFilters, cantHaveFilters, canHaveFilters]);

  function addToMustHaveFilters(ingredient) {
    setMustHaveFilters([...mustHaveFilters, ingredient]);
  }

  function removeFromMustHaveFilters(ingredient) {
    setMustHaveFilters(
      mustHaveFilters.filter((filter) => ingredient !== filter)
    );
  }

  function addToCanHaveFilters(ingredient) {
    setCanHaveFilters([...canHaveFilters, ingredient]);
  }

  function removeFromCanHaveFilters(ingredient) {
    setCanHaveFilters(canHaveFilters.filter((filter) => ingredient !== filter));
  }

  function addToCantHaveFilters(ingredient) {
    setCantHaveFilters([...cantHaveFilters, ingredient]);
  }

  function removeFromCantHaveFilters(ingredient) {
    setCantHaveFilters(
      cantHaveFilters.filter((filter) => ingredient !== filter)
    );
  }

  function hasActiveFilters() {
    return (
      mustHaveFilters.length > 0 ||
      canHaveFilters.length > 0 ||
      cantHaveFilters.length > 0
    );
  }

  function addToFavoriteRecipes({ id, name, description, imageURL }) {
    updateFavorite({
      ...favorite,
      recipes: [...favorite.recipes, { id, name, description, imageURL }],
    });
  }

  function removeFromFavoriteRecipes({ id }) {
    updateFavorite({
      ...favorite,
      recipes: favorite.recipes.filter((recipe) => recipe.id !== id),
    });
  }

  function updateFavorite(newFavorite) {
    Favorite.set(newFavorite);
    setFavorite(newFavorite);
  }

  return (
    <div>
      <ButtonDialog className="px-2 text-xl bg-yellow-300" content="Filters">
        <FilterForm
          ingredients={ingredients}
          mustHaveFilters={mustHaveFilters}
          canHaveFilters={canHaveFilters}
          cantHaveFilters={cantHaveFilters}
          onMustHaveSelect={addToMustHaveFilters}
          onMustHaveRemove={removeFromMustHaveFilters}
          onCanHaveSelect={addToCanHaveFilters}
          onCanHaveRemove={removeFromCanHaveFilters}
          onCantHaveSelect={addToCantHaveFilters}
          onCantHaveRemove={removeFromCantHaveFilters}
        />
      </ButtonDialog>

      {user && (
        <span>Hello {user.displayName ? user.displayName : user.email}</span>
      )}

      {user ? (
        <button
          type="button"
          className="px-2 text-xl bg-blue-300"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      ) : (
        <ButtonDialog className="px-2 text-xl bg-blue-300" content={'Sign in'}>
          <AuthFormController />
        </ButtonDialog>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              recipesToShow={recipesToShow}
              isFiltered={hasActiveFilters()}
            />
          }
        />
        <Route path="recipes">
          <Route
            path=":id"
            element={
              <RecipePage
                favoriteRecipeIds={
                  favorite?.recipes.map((recipe) => recipe.id) ?? []
                }
                onFavorite={addToFavoriteRecipes}
                onUnfavorite={removeFromFavoriteRecipes}
              />
            }
          />
        </Route>
        <Route
          path="/admin"
          element={<AdminPage ingredients={ingredients} />}
        />
      </Routes>
    </div>
  );
}
